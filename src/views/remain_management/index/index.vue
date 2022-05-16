<template>
  <div class="remain-management" v-if="reloadValue">
    <div class="page-content">
      <div class="between-flex top">
        <el-button class="add" @click="add"><img src="imgs/icon-plus.png" alt="">新增遗迹3</el-button>
        <div class="between-flex query">
          <el-input v-model="queryValue" placeholder="搜索全部数据">
            <template #suffix>
              <img style="margin-top:10px;cursor: pointer" src="imgs/query.png" alt="" @click="searchAllData">
            </template>
          </el-input>
          <img v-if="false" class="down" src="imgs/down.png" alt="">
        </div>
      </div>
      <div class="bottom">
        <div class="between-flex con">
          <div class="between-flex tab">
            <div 
              class="between-flex type" 
              :class="{active: currentIndex == index}" 
              v-for="(item, index) in type" 
              :key="item.id"
              @click="chooseType(item, index)">
              <span>{{item.name}}</span>
            </div>
            <div class="between-flex level-type">
              <el-button 
                :class="{active2: currentIndex2 == index}" 
                v-for="(item, index) in labelType" 
                round
                :key="item.id"
                @click="chooseSubType(item, index)">
                {{item.name}}</el-button>
            </div>
          </div>
          <div v-if="showBanch" class="between-flex opt" style="justify-content:flex-end;">
            <el-button type="default" @click="handleTopBtnClick('banch')"><img src="imgs/icon-banch.png" alt="">批量操作</el-button>
          </div>
          <div v-else class="between-flex opt">
            <el-checkbox v-model="checked">全选</el-checkbox>
            <el-button type="default" @click="handleTopBtnClick('del')">批量删除</el-button>
            <el-button type="default" @click="handleTopBtnClick('cancle')">取消操作</el-button>
          </div>
        </div>
        <div class="list-con">
          <div class="list-item" v-for="(item, index) in lists" :key="item.id">
            <div class="info">
              <img style="cursor: pointer" class="pic" :src="item.img || detailImg" alt="" @click="handleDetails(item)">
              <p class="r-title">{{item.title}}</p>
              <p class="label">
                <el-button round v-for="t in item.type" :key="t">{{t}}</el-button>
              </p>
            </div>
            <div class="operations">
              <el-button plain type="primary" v-if="false">查看详情</el-button>
              <div class="between-flex btns">
                <el-tooltip class="item" effect="dark" :content="b.title" placement="top" v-for="(b, i) in btns" :key="b.type">
                  <img 
                    :src="[(cardIndex == index) && (btnIndex == i) ? b.activeIcon : b.icon]" 
                    :alt="b.title" 
                    @click="handleClick(item, index, b, i)">
                </el-tooltip>
              </div>
            </div>
            <div v-show="isshowMark" class="mark" :class="{markActive: item.checked}">
              <img v-show="!item.checked" src="imgs/checkBox.png" alt="" @click="item.checked = true">
              <img v-show="item.checked" src="imgs/checkIn.png" alt="" @click="item.checked = false">
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
            background
            :pager-count="3"
            @current-change="handleCurrentChange"
            v-model:current-page="currentPage"
            layout="prev, pager, next, jumper"
            :page-size="pagSize"
            :total="pagTotal">
          </el-pagination>
        </div>
      </div>
      <Footer />
      <el-dialog
        title="定位"
        v-model="dialogVisible"
        :before-close="handleClose">
        <MapCon ref="mapDialog" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, reactive, unref, watch, nextTick, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import Footer from '_com/footer/index.vue'
import {batchDelRelics, delRelics, getDictType, getdRelicsPage, getEditRelics} from "../../../api/remain";
import { ElMessage, ElMessageBox } from 'element-plus'
import MapCon from './mapCon'
import * as map from "./map";

export default defineComponent({
  components: {
    Footer,
    MapCon
  },
  setup() {
    const router = useRouter();
    const imgUrl = window.globalUrl.FTP_URL;
    // 新增 查询
    const add = () => {
      router.push({path: '/new_remain'})
    }

    // 筛选条件，查询操作
    const type = [
      { name: '地质遗迹',id: null },
      { name: '重要地质遗迹',id: 1 },
    ]
    const labelType = [
      {id: null, name: '全部'},
      {id: 1, name: '世界级'},
      {id: 2, name: '国家级'},
      {id: 3, name: '省级'},
      {id: 4, name: '地方级'},
    ]
    // let list = [
    //   { img: 'imgs/pic.png', title: '文脉', type: ['地貌经管类', '国家级'], id: '', checked: false },
    //   { img: 'imgs/pic4.png', title: '告天炉', type: ['地貌经管类', '国家级'], id: '', checked: false },
    // ]
    const detailImg = ref('imgs/detail_img2.png')
    const currentIndex = ref(0)
    const currentIndex2 = ref(0)
    const lists = ref([])
    const SubTypeId = ref(null)
    const labelLeve = ref(null)
    const chooseType = (item, index) => {
      currentIndex.value = index;
      SubTypeId.value = item.id
      getdRelicsPageInfo(null,1,item.id)
      currentIndex2.value = 0;
      currentPage.value = 1;
      reload()
    }
    const chooseSubType = (item, index) => {
      currentIndex2.value = index;
      labelLeve.value = item.id;
      getdRelicsPageInfo(item.id,1,SubTypeId.value)
      currentPage.value = 1;
      reload()
    }

    //局部刷新
    const reloadValue = ref(true);
    //刷新
    const reload = ()=>{
      reloadValue.value = false;
      nextTick(()=>{
        reloadValue.value = true;
      })
    }

    // 批量操作
    const showBanch = ref(true)
    const isshowMark = ref(false); // 是否显示遮罩层
    const checked = ref(false); // 是否全选
    watch(checked, (newValue, oldValue) => {
      if(checked.value){
        lists.value.forEach(item=>{
          item.checked = true
        })
      } else {
        lists.value.forEach(item=>{
          item.checked = false
        })
      }
    })
    const handleTopBtnClick = (type) => {
      switch(type) {
        case 'banch':
          showBanch.value = false;
          isshowMark.value = true;
          break;
        case 'cancle':
          showBanch.value = true;
          isshowMark.value = false;
          break;
        case 'del':
          ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            let arr = [];
            lists.value.forEach(item=>{
              if(item.checked){
                arr.push(item.id)
              }
            })
            batchDelRelicsCard(arr);
            showBanch.value = true;
            isshowMark.value = false;
          }).catch(()=>{
            ElMessage({
              message: '已取消',
              type: 'info'
            });
          })
          break
        default:
          break;
      }
    }
    //批量删除
    const batchDelRelicsCard = async (arr)=>{
      let res = await batchDelRelics(arr)
      if(res.code == 0) {
        getdRelicsPageInfo(labelLeve.value,currentPage.value,SubTypeId.value)
      }
    }

    // 关于每一个遗迹的操作
    const cardIndex = ref(-1)
    const btns = [
      { type: 'location', icon: 'imgs/icon-location.png', activeIcon: 'imgs/icon-location-active.png', title: '定位' },
      { type: 'edit', icon: 'imgs/icon-edit.png', activeIcon: 'imgs/icon-edit-active.png', title: '编辑' },
      { type: 'del', icon: 'imgs/icon-del.png', activeIcon: 'imgs/icon-del-active.png', title: '删除' },
    ]
    const btnIndex = ref(-1)
    const handleClick = (item, index, btn, i) => {
      if (btn.type == 'del') {
        ElMessageBox.confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          delRelicsCard(item.id);
        }).catch(()=>{
          ElMessage({
            message: '已取消',
            type: 'info'
          });
        })
      } else if( btn.type == 'edit') {
        // let params = Object.assign({}, item)
        // params.type = 'edit'
        router.push({name: 'edit_remain',query: {
            type: 'edit',
            id: item.id
          }})
      } else if (btn.type == 'location') {
        dialogVisible.value = true;
        getMapPoint(item.id)
      }
      cardIndex.value = index;
      btnIndex.value = i;
    }
    //查看详情页
    const handleDetails = (item) => {
      router.push({name: 'detail_remain',query: {
          type: 'details',
          id: item.id
        }})
    }
    //删除card功能
    const delRelicsCard = async (id)=>{
      let res = await delRelics(id)
      if(res.code == 0) {
        getdRelicsPageInfo(labelLeve.value,currentPage.value,SubTypeId.value)
      }
    }
    //定位功能
    const dialogVisible = ref(false)
    const mapDialog = ref(null)
    //获取地图上的标记
    const getMapPoint = async(id)=>{
      let res = await getEditRelics(id);
      if(res.code == 0) {
        let data = [];
        data.push(res.data)
        map.addOnePoint({
          component: mapDialog.value,
          data: data,
          lonKey: "longitudeNumber",
          latKey: "latitudeNumber",
          dialogType: "onePoint",
          icon: "imgs/img/icon_mark.png",
          hoverIcon: "imgs/img/icon_mark_hover.png",
        });
      }
    }

    /**
     * 查询信息
     */
    //获取字典
    const landscapeOptions = ref([]);
    const levelOptions = ref([])
    const getDict = async ()=>{
      let res = await getDictType("landscape_type");
      if(res.code == 0){
        landscapeOptions.value = res.data
      }
      let result = await getDictType("relic_level");
      if(result.code == 0){
        levelOptions.value = result.data
      }
      getdRelicsPageInfo()
    }
    getDict();

    const getBtnType = (type)=>{
      let value = []
      landscapeOptions.value.forEach(item => {
        if(item.value == type){
          value.push(item.label);
        }
      })
      return value
    }
    //搜索功能
    const queryValue = ref("")
    const searchAllData = ()=>{
      getdRelicsPageInfo(null,1,null,queryValue.value)
    }

    //分页
    const currentPage = ref(1);
    const pagSize = ref(12);
    const pagTotal = ref(1);
    const getdRelicsPageInfo = async (level = null, current = 1, isImport = null, name='') => {
      checked.value = false
      showBanch.value = true;
      isshowMark.value = false;
      let res = await getdRelicsPage({
        current: current,
        level: level,
        isImportant: isImport,
        name: name,
        size: 12
      })
      if(res.code == 0) {
        pagSize.value = res.data.size;
        pagTotal.value = res.data.total;
        lists.value = []
        res.data.records.forEach(item=>{
          let type = getBtnType(item.landscapeTypes);
          let img = Object.assign({}, item.image).filePath ? imgUrl + Object.assign({}, item.image).filePath : detailImg.value;
          lists.value.push({
            img: img,
            title: item.name,
            type: type,
            id: item.id,
            checked: false,
          })
        })

      }
    }
    const handleCurrentChange = (val) => {
      getdRelicsPageInfo('',val)
    }
    // getdRelicsPageInfo()


    return {
      detailImg,
      reloadValue,
      add,
      type,
      labelType,
      currentIndex,
      currentIndex2,
      chooseType,
      chooseSubType,
      lists,
      btns,
      cardIndex,
      btnIndex,
      handleClick,
      handleDetails,
      showBanch,
      isshowMark,
      checked,
      handleTopBtnClick,
      currentPage,
      handleCurrentChange,
      pagSize,
      pagTotal,
      queryValue,
      searchAllData,
      dialogVisible,
      mapDialog
    }
  },
})
</script>


<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.remain-management {
  height: calc(100vh - 72px);
  .page-content {
    box-shadow: 2px 0px 10px 0px 
		rgba(0, 0, 0, 0.2);
    position: relative;
  }
  .between-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .top {
    height: 66 / @vh;
    // width: 100%;
    padding: 0 16px;
    border-bottom: 1px solid #eeeeee;
    .el-input {
      line-height: 36px;
    }
    /deep/ .el-input__inner {
      width: 365 / @vh;
      height: 36 / @vh;
      line-height: 36px;
      background-color: #f1f2f4;
      border-radius: 18px;
    }
    /deep/ .el-input__suffix {
      right: 18px;
    }
    .add {
      width: 96px;
      min-height: 34px !important;
      background-color: #118270;
      border-radius: 3px;
      color: #fff;
      padding: 0 10px;
      img {
        margin-right: 7px;
      }
    }
    .down {
      margin-left: 24px;
    }
  }
  .bottom {
    height: calc(100vh - 192px);
    padding: 16px;
    .type {
      min-width: 83  / @vw;
      margin-right: 40 / @vw;
      height: 34 / @vh;
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #888888;
      text-align: center;
      cursor: pointer;
      span {
        margin: 0 auto;
      }
    }
    .active {
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      font-weight: 600;
      color: #424e67;
      border-bottom: 3px solid #0b7a8f;
    }
    .level-type {
      margin-left: 30px;
      .el-button {
        width: 70 / @vw;
        height: 30 / @vh;
        min-height: 30 / @vh;
        padding: 7 / @vh 0;
        border-radius: 15px;
        border: solid 1px #0b7a8f;
        color: #0b7a8f;
      }
    }
    .active2 {
      background-color: #0b7a8f;
      color: #ffffff !important;
    }
    .opt {
      width: 269  / @vw;
      .el-button {
        width: 96 / @vw;
        height: 34 / @vh;
        padding: 10 / @vh 0;
        min-height: 34 / @vh;
        border-radius: 3px;
        border: solid 1px #bfbfbf;
        margin-left: 0;
        img {
          margin-right: 7px;
        }
      }
    }

    .list-con {
      display: grid;
      grid-template-columns: repeat(6, 280 / @vw);
      //grid-template-rows: repeat(2, 290 / @vh);
      column-gap: 28 / @vw;
      row-gap: 28 / @vh;
      // display: flex;
      // flex-wrap: wrap;
      margin: 0 auto;
      margin-top: 27 / @vh;
      .list-item {
        // width: 280px;
        //height: 285 / @vh;
        // flex-basis: 280px;
        // margin-right: 24px;
        // margin-top: 21px;
        border: solid 1px #d9d9d9;
        position: relative;
        .info {
          padding: 13 / @vh 13px 10 / @vh 13px;
        }
        p {
          margin: 0;
        }
        .pic {
          width: 100%;
          height: 146 / @vh;
        }
        .r-title {
          margin-top: 12 / @vh;
          font-size: 16px;
          line-height: 16px;
        }
        .label {
          margin-top: 7 / @vh;
          .el-button {
            min-height: 22 / @vh;
            //height: 22 / @vh;
            padding: 5 / @vh 14 / @vh !important;
            font-family: MicrosoftYaHei;
            font-size: 12 / @vw;
            background-color: #2DA7C2;
            color: #ffffff;
          }
          .el-button:nth-child(2){
            background-color: #11D4A9;
          }
        }
        .operations {
          // margin-top: 10px;
          padding: 12 / @vh 13 / @vw;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-top: 1px dashed #e9e9e9;
          .el-button {
            width: 74 / @vw;
            height: 30 / @vh;
            font-size: 14 / @vw;
            min-height: 30 / @vh;
            background-color: #f2f6ff;
            border-radius: 3px;
            border: solid 1px #bed3fb;
            padding: 8 / @vh 8 / @vw;
            color: #4a74c2;
          }
          .btns {
            width: 72 / @vw;
            img {
              cursor: pointer;
            }
          }
        }
        .mark {
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, .4);
          position: absolute;
          top: 0;
          left: 0;
          img {
            margin: 7 / @vh 0 0 7 / @vh;
            cursor: pointer;
          }
        }
        .markActive {
          width: calc(100% - 2px);
          height: calc(100% - 2px);
          background: transparent;
          border: solid 2px #1cb9ca;
        }
      }
    }

    .pagination {
      margin-top: 52 / @vh;
      text-align: right;
      /deep/ li:not(.disabled).active {
        background-color: #0b7a8f;
        color: #FFF;
      }
      /deep/ li:hover {
        color: #0b7a8f;
      }
    }
  }
  /deep/ .el-dialog__body {
    height: 500px;
  }

}
/deep/ .el-popper.is-dark {
  background: rgba(0, 0, 0, 0.6);
}
</style>