/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/6/25 10:20:15 
 */

export  default class ViewshedMap {
    constructor(viewer) {
        this.viewer = viewer;
        this.arrViewField = [];
        this.viewModel = { verticalAngle: 90, horizontalAngle: 120, distance: 10 };
    }
    // 开关
    setvisible(value) {
        switch (value) {
            case 'add':
                this.addViewField();
                break;
            case 'remove':
                this.clearAllViewField();
                break;
        }
    }
    // 添加可视域
    addViewField() {
        var e = new Cesium.ViewShed3D(this.viewer, {
            horizontalAngle: Number(this.viewModel.horizontalAngle),
            verticalAngle: Number(this.viewModel.verticalAngle),
            distance: Number(this.viewModel.distance),
            calback: function () {
                this.viewModel.distance = e.distance
            }
        });
        this.arrViewField.push(e)
    }
    // 清除可视域
     clearAllViewField() {
        for (var e = 0, i = this.arrViewField.length; e < i; e++) {
            this.arrViewField[e].destroy()
        }
         this.arrViewField = []
    }
}