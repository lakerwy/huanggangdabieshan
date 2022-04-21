/**
 * @Description: 
 * @author 杜晓辉
 * @date 2021/8/17 15:16:04 
 */
import {AddtargetLab} from "./AddLableLayer";
let XHTdata = [
    {
        lon:110.40848151229152,
        lat:31.425351278276256,
        height:1833.2169100555623,
        name:"信号塔4",
        id:"xh1",
    },
    {
        lon:110.42222203971978,
        lat:31.43537473085698,
        height:1552.1828262555568,
        name:"信号塔3",
        id:'xh2',
    },
    {
        lon:110.43206960476849,
        lat:31.434056465472473,
        height:1649.8874400512277,
        name:"信号塔2",
        id:'xh3',
    },
    {
        lon:110.44762695467472,
        lat:31.424598671212884,
        height:1503.8861285833916,
        name:"信号塔1",
        id:"xh4",
    },
]

export  function addxht() {
    for(let i = 0;i< XHTdata.length; i++){
        let  Curobj = XHTdata[i]
        AddtargetLab(window.Scene.viewer, Curobj.id , Curobj, Curobj.name, Curobj.name, parseFloat(Curobj.lon), parseFloat(Curobj.lat), parseFloat(Curobj.height), require("../../assets/信号塔.png"), true);
    }
}