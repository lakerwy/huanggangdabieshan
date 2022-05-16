<template>
  <div class="add-remain">
    <div class="page-content">
      <steps ref="steps" class="step-content" @getCurrentStep="getCurrentStep">
        <template v-if="currentStep == 0">
          <div class="form">
            <div class="scrollbar">
              <el-form :model="form" label-width="140px" label-position="left">
                <div class="item-con">
                  <el-row>
                    <el-col :span="10">
                      <el-form-item label="遗迹编号" class="mandatory">
                        <el-input v-model="form.number"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="14" class="col_center">
                      <el-form-item
                        label="名称"
                        label-width="109px"
                        class="mandatoryCon"
                      >
                        <el-input v-model="form.name"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div class="item-con">
                  <el-row>
                    <el-col :span="7">
                      <el-form-item label="东经" class="mandatory">
                        <el-input v-model="form.longitude"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6" class="col_center">
                      <el-form-item
                        label="北纬"
                        label-width="110px"
                        class="mandatoryCon"
                      >
                        <el-input v-model="form.latitude"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item
                        label="海拔"
                        label-width="80px"
                        class="mandatoryCon"
                      >
                        <el-input v-model="form.elevation"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="面积"
                        label-width="80px"
                        class="mandatoryCon"
                      >
                        <el-input v-model="form.proportion"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-form-item label="行政区属" class="mandatory">
                  <el-input v-model="form.administrativeDistrict"></el-input>
                </el-form-item>
                <el-form-item label="地理位置" class="mandatory">
                  <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="交通状况" class="mandatory">
                  <el-input v-model="form.trafficCondition"></el-input>
                </el-form-item>
                <el-form-item label="遗迹景观类型" class="mandatory">
                  <el-select
                    v-model="form.landscapeTypes"
                    placeholder="请选择遗迹景观类型"
                  >
                    <el-option
                      v-for="item in landscapeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="地质遗迹景观描述与特征参数"
                  class="mandatory"
                >
                  <el-input
                    type="textarea"
                    rows="4"
                    v-model="form.description"
                  ></el-input>
                </el-form-item>
                <el-form-item label="成因分析" class="mandatory">
                  <el-input type="textarea" v-model="form.cause"></el-input>
                </el-form-item>
                <el-form-item label="其它景观" class="mandatory">
                  <el-input v-model="form.otherLandscape"></el-input>
                </el-form-item>
                <el-form-item label="环境与保护现状" class="mandatory">
                  <el-input
                    type="textarea"
                    v-model="form.currentSituation"
                  ></el-input>
                </el-form-item>
                <el-form-item label="开发现状" class="mandatory">
                  <el-input v-model="form.developmentSituation"></el-input>
                </el-form-item>
                <el-form-item label="保护措施" class="mandatory">
                  <el-input v-model="form.protection"></el-input>
                </el-form-item>
                <el-form-item label="级别" class="mandatory">
                  <el-select v-model="form.level" placeholder="请选择级别">
                    <el-option
                      v-for="item in levelOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="是否重要" class="mandatory">
                  <el-select
                    v-model="form.isImportant"
                    placeholder="请选择是否重要"
                  >
                    <el-option
                      v-for="item in isImportantOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <el-button
              class="next-btn"
              style="float: right"
              plain
              type=""
              @click="next"
              >下一步</el-button
            >
            <el-button
              class="next-btn"
              plain
              type=""
              @click="backHome"
              >返回</el-button
            >
          </div>
        </template>
        <template v-if="currentStep == 1">
          <div class="form-normal">
            <el-form :model="form" label-width="143px" label-position="left">
              <el-form-item label="添加附件：">
                <el-upload
                  class="upload-demo"
                  drag
                  ref="upload"
                  :action="uploadUrl"
                  multiple
                  name="files"
                  :show-file-list="false"
                  :data="uploadData"
                  :on-change="handleChange"
                  :http-request="handleUpload"
                  accept=".jpg,.jpeg,.png"
                >
                  <img
                    style="margin-top: 18%"
                    src="imgs/icon-file.png"
                    alt=""
                  />
                  <div class="el-upload__text">
                    将图片拖到此处或<em>点击上传</em>
                  </div>
                  <div class="el-upload__text">
                    图片大小不超过5M,格式为JPG、PNG、JPEG
                  </div>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
          <div class="uploaded">
            <span>已成功上传文件{{ total }}个</span>
            <div class="img-list">
              <div class="con">
                <div class="list" v-for="item in imgs" :key="item.id">
                  <img :src="item.img" alt="" />
                  <div class="img_del">
                    <img
                      src="imgs/del_white.png"
                      @click="delImgUpload(item.id, item.type)"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <img
                class="prev"
                :class="{ disabled: currentPage <= 1 }"
                src="imgs/prev.png"
                alt=""
                @click="prevPage"
              />
              <img
                class="next"
                :class="{ disabled: total < pageSize * currentPage }"
                src="imgs/next.png"
                alt=""
                @click="nextPage"
              />
            </div>
          </div>
          <div class="btn-con">
            <el-button class="next-btn" plain type="" @click="backHome"
              >返回</el-button
            >
            <el-button style="" class="next-btn" plain @click="back"
              >上一步</el-button
            >
            <el-button
              class="next-btn submit-btn"
              plain
              @click="submitInfo"
              :loading="submitFlag"
              >提交</el-button
            >
          </div>
        </template>
      </steps>

      <Footer />
    </div>
  </div>
</template>

<script>
import { defineComponent, onBeforeMount, onMounted, reactive, ref, unref } from 'vue'
import steps from '_com/my-steps/index.vue'
import Footer from '_com/footer/index.vue'
import { addeRelicsImg, getDictType, getEditRelics, updateRelics } from "@/api/remain";
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { cacuLonLat, deleteById } from "@/utils/util";


export default defineComponent({
  components: {
    steps,
    Footer
  },
  setup() {
    const router = useRouter(), route = useRoute();
    // 步骤条相关
    const currentStep = ref(0)
    const steps = ref(null)
    const back = () => {
      steps.value.back();
    }
    const reg = /^-?(\d|[1-9]\d|1[0-7]\d)\°(\d|[1-5]\d)\′((\d|[1-5]\d)(.\d{1,2})?\″)?$/
    const regNum = /^-?[0-9]+\.[0-9]+$/;
    const next = () => {
      if (!form.value.number) {
        ElMessage.error('遗迹编号不能为空');
        return
      }
      if (!form.value.name) {
        ElMessage.error('名称不能为空');
        return
      }
      if (!form.value.longitude) {
        ElMessage.error('东经不能为空');
        return
      } else if (form.value.longitude && !reg.test(form.value.longitude) && !regNum.test(form.value.longitude)) {
        ElMessage.error('东经请输入度分秒形式或十进制形式如114°38′32″或114.5634');
        return
      }
      if (!form.value.latitude) {
        ElMessage.error('北纬不能为空');
        return
      } else if (form.value.latitude && !reg.test(form.value.latitude) && !regNum.test(form.value.latitude)) {
        ElMessage.error('北纬请输入度分秒形式或十进制形式如114°38′32″或114.5634');
        return
      }
      if (!form.value.elevation) {
        ElMessage.error('海拔不能为空');
        return
      }
      if (!form.value.proportion) {
        ElMessage.error('面积不能为空');
        return
      }
      if (!form.value.landscapeTypes) {
        ElMessage.error('请选择遗迹景观类型');
        return
      }
      if (!form.value.level) {
        ElMessage.error('请选择级别');
        return
      }
      steps.value.next();
    }
    const getCurrentStep = (val) => {
      currentStep.value = val;
    }

    // 表单相关
    const formDemo = reactive({
      number: '',
      name: '',
      longitude: '',
      latitude: '',
      elevation: '',
      proportion: '',
      administrativeDistrict: '',
      position: '',
      trafficCondition: '',
      landscapeTypes: '',
      description: '',
      cause: '',
      otherLandscape: '',
      currentSituation: '',
      developmentSituation: '',
      protection: '',
      level: '',
      isImportant: 0
    });
    const form = ref(Object.assign({}, formDemo));
    //新增提交表单
    const uploaddedImgs = ref([])
    const imgs = ref([])
    const total = ref(0)
    total.value = uploaddedImgs.value.length
    const currentPage = ref(1)
    const pageSize = ref(4)
    const currentChange = (currentPage = 1) => {
      imgs.value = uploaddedImgs.value.slice((currentPage - 1) * pageSize.value, pageSize.value * currentPage)
    }
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        currentChange(currentPage.value);
      } else {
        return;
      }
    }
    const nextPage = () => {
      if (total.value > currentPage.value * pageSize.value) {
        currentPage.value++;
        currentChange(currentPage.value);
      } else {
        return;
      }
    }

    const isImportantOptions = reactive([
      {
        label: "不重要",
        value: 0
      },
      {
        label: "重要",
        value: 1
      },
    ])

    //获取字典
    const landscapeOptions = ref([]);
    const levelOptions = ref([])
    const getDict = async () => {
      let res = await getDictType("landscape_type");
      if (res.code == 0) {
        landscapeOptions.value = res.data
      }
      let result = await getDictType("relic_level");
      if (result.code == 0) {
        levelOptions.value = result.data
      }
    }
    onBeforeMount(
      getDict
    )

    //图片上传
    const uploadUrl = `${window.globalUrl.HOME_API}/parkRelicFile/uploadFiles`
    const filelist = ref([]);
    const uploadLis = ref([]);
    const handleChange = (file, fileList) => {
      // filelist = [...list]
      let URL = window.URL || window.webkitURL;
      let modelURL = URL.createObjectURL(file.raw)
      uploaddedImgs.value.push({
        img: modelURL,
        id: file.raw.uid,
        type: 'local'
      })
      total.value = uploaddedImgs.value.length
      currentChange(1)
    }
    const handleUpload = (file) => {
      unref(uploadLis).push(file);
    }
    const delImgUpload = (id, type) => {
      if (type == 'local') {
        deleteByUid(id, uploadLis.value)
      } else {
        deleteById(id, filelist.value)
      }
      deleteById(id, uploaddedImgs.value);
      total.value = uploaddedImgs.value.length
      currentChange(1)

    }
    const backHome = ()=>{
      router.push({path: '/remain_management'})
    }
    const deleteByUid = function (id, list) {
      for (let index = list.length - 1; index >= 0; index--) {
        if (list[index] && list[index].file.uid === id) {
          list.splice(index, 1)
        }
      }
      return list
    }
    //编辑提交
    const hasSubmit = ref(false)
    const submitFlag = ref(false)
    const submitInfo = async () => {

      if (hasSubmit.value) return;
      hasSubmit.value = true
      submitFlag.value = true;
      form.value.longitude = regNum.test(form.value.longitude) ? cacuLonLat(form.value.longitude) : form.value.longitude;
      form.value.latitude = regNum.test(form.value.latitude) ? cacuLonLat(form.value.latitude) : form.value.latitude;
      if (!uploadLis.value.length) {
        form.value.fileList = filelist.value
        let res = await updateRelics(form.value)
        if (res.code == 0) {
          ElMessage.success('编辑成功');
          hasSubmit.value = false;
          submitFlag.value = false;
          router.push({ path: '/remain_management' })
        } else {
          ElMessage.error('提交失败');
          hasSubmit.value = false;
          submitFlag.value = false;
        }
      } else {
        let formData = new FormData();
        unref(uploadLis).map(item => {
          formData.append('files', item.file)
        })
        let result = await addeRelicsImg(formData)
        if (result.code == 0) {
          result.data.forEach(item => {
            filelist.value.push(item)
          })
          form.value.fileList = filelist.value
          let res = await updateRelics(form.value)
          if (res.code == 0) {
            ElMessage.success('编辑成功');
            hasSubmit.value = false;
            submitFlag.value = false;
            router.push({ path: '/remain_management' })
          } else {
            ElMessage.error('提交失败');
            hasSubmit.value = false;
            submitFlag.value = false;
          }
        }
      }
    }

    /**
     * 编辑相关
     */
    const imgUrl = window.globalUrl.FTP_URL;
    const getEditInfo = async (id = 0) => {
      let res = await getEditRelics(id);
      if (res.code == 0) {
        form.value = Object.assign({}, res.data)
        res.data.fileList.forEach(item => {
          filelist.value.push(item)
          uploaddedImgs.value.push({
            img: imgUrl + item.filePath,
            id: item.id,
            type: 'service'
          })
        })
        total.value = uploaddedImgs.value.length
        currentChange(1)
      }
    }
    if (route.query && (route.query.type == 'edit' || route.query.type == 'details')) {
      getEditInfo(route.query.id)
    }
    onMounted(() => {
      currentChange(1)
    })

    return {
      steps,
      back,
      next,
      currentStep,
      getCurrentStep,
      form,
      imgs,
      total,
      currentPage,
      pageSize,
      prevPage,
      nextPage,
      uploadUrl,
      handleChange,
      handleUpload,
      submitInfo,
      submitFlag,
      getEditInfo,
      uploadLis,
      delImgUpload,
      landscapeOptions,
      isImportantOptions,
      levelOptions,
      backHome
    }
  },
})
</script>


<style lang="less" scoped>
@vw: 19.2vw;
@vh: 10.8vh;
.add-remain {
  box-sizing: border-box;
  width: 1188 / @vw !important;
  padding-top: 8px;
  height: calc(100vh - 64px);
  margin: 0 auto;
  box-shadow: 2px 0px 10px 0px rgba(0, 0, 0, 0.2);
  .page-content {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
  }
  .step-content {
    padding-top: 31 / @vh;
    width: 1001 / @vw;
  }
  .form {
    width: 886 / @vw;
    margin: 0 auto;
    margin-top: 25 / @vh;
    //border-top: 1px solid #bfbfbf;
    > div {
      max-height: 762 / @vh;
      overflow-y: auto;
    }
    .el-form {
      border-left: 1px solid #bfbfbf;
      width: 875 / @vw;
    }
    .item-con {
      width: 100%;
      // height: 49 / @vh;
      .col_center {
        /deep/ .el-form-item__label {
          //text-align: center;
        }
      }
    }
    .item-con:nth-child(1) {
      border-top: 1px solid #bfbfbf;
    }
    .mandatory {
      position: relative;
      /deep/ .el-form-item__label::before {
        content: "*";
        color: #f56c6c;
        position: absolute;
        left: 10 / @vw;
      }
    }
    .mandatoryCon {
      /deep/ .el-form-item__label::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
    /deep/ .el-form-item__label {
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      border-right: 1px solid #bfbfbf;
      min-height: 49 / @vh;
      padding-left: 20px;
      padding-top: 4px;
    }
    .el-form-item {
      margin-bottom: 0;
      border-right: 1px solid #bfbfbf;
      border-bottom: 1px solid #bfbfbf;
    }
    /deep/ .el-input__inner {
      font-family: MicrosoftYaHei-Bold;
      height: 49 / @vh;
      border-radius: 0;
      border: 0;
    }
    .el-select {
      width: 99%;
    }
    /deep/ .el-textarea__inner {
      font-family: MicrosoftYaHei-Bold;
      border-radius: 0;
      border: 0;
    }
  }
  .next-btn {
    width: 80 / @vw;
    height: 34 / @vh;
    min-height: 34 / @vh;
    padding: 0 5px;
    border: solid 1px #11955b;
    color: #11955c;
    margin-top: 29 / @vh;
    margin-right: 9 / @vw;
  }
  .submit-btn {
    background-color: #11955b;
    color: #fff;
  }
  .form-normal {
    // width: 884 / @vw;
    max-height: 825 / @vh;
    overflow-y: auto;
    margin: 0 auto;
    margin-top: 25 / @vh;
    .upload-demo {
      width: 512 / @vw;
      height: 312 / @vh;
      margin-top: 35 / @vh;
      // border: solid 1px #d9d9d9;
      /deep/ .el-upload {
        width: 100%;
        height: 100%;
      }
      /deep/ .el-upload-dragger {
        width: 100%;
        height: 100%;
        border-radius: 0;
        background-color: #f5f5f5;
      }
      .el-upload__text {
        color: #71809a;
        line-height: 20px;
      }
      .el-upload__text:last-child {
        color: #bfbfbf;
        font-size: 14px;
      }
    }
  }
  .uploaded {
    margin-top: 23 / @vh;
    .next-btn {
      margin-top: 44 / @vh;
    }
    .img-list {
      width: 956 / @vw;
      height: 166 / @vh;
      margin: 0 auto;
      margin-top: 56 / @vh;
      position: relative;
      .con {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
      }
      .list {
        width: 228 / @vw;
        margin-right: 15 / @vw;
        height: 100%;
        position: relative;
        img {
          height: 100%;
          width: 100%;
        }
        .img_del {
          position: absolute;
          width: 100%;
          bottom: 0;
          height: 24px;
          background: rgba(0, 0, 0, 0.4);
          img {
            position: absolute;
            right: 10px;
            width: 20px;
            cursor: pointer;
          }
        }
      }
      .list:last-child {
        margin-right: 0;
      }
      .prev {
        position: absolute;
        top: 45%;
        left: -35px;
        cursor: pointer;
      }
      .next {
        position: absolute;
        top: 45%;
        right: -35px;
        cursor: pointer;
      }
      .disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
  .btn-con {
    width: 100%;
    text-align: center;
    .next-btn {
      margin-top: 44 / @vh;
    }
  }
}
</style>