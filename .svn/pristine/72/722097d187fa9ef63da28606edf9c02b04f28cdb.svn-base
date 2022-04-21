/*
 * @Author: 任继民
 * @Date: 2021-03-02 17:05:26
 * @LastEditors: 任继民
 * @LastEditTime: 2021-03-03 11:04:04
 * @Description:
 */
import * as echarts from "echarts";
/**
 *
 * @param {*} id
 * @param {*} options
 */
export function initEcharts(id, options) {
  let echart = echarts.init(document.getElementById(id));
  setOptionsByDynamicFontSize(echart, options);
  window.addEventListener("resize", () => {
    setOptionsByDynamicFontSize(echart, options);
    echart.resize();
  });
  return echart;
}

/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
export function debounce(fn, delay = 20, isImmediate = false, context = this) {
  // 使用闭包，保存执行状态，控制函数调用顺序
  let timer;

  return function () {
    const _args = [].slice.call(arguments);

    clearTimeout(timer);

    const _fn = function () {
      timer = null;
      if (!isImmediate) fn.apply(context, _args);
    };

    // 是否滚动时立刻执行
    const callNow = !timer && isImmediate;

    timer = setTimeout(_fn, delay);

    if (callNow) fn.apply(context, _args);
  };
}

export function setOptionsByDynamicFontSize(echart, options) {
  const ratio_w = window.innerWidth / 1920;
  const ratio_h = window.innerHeight / 1080;
  if (options.xAxis) {
    options.xAxis.axisLabel = {
      ...options.xAxis.axisLabel,
      fontSize: Math.round(12 * ratio_w)
    };
    options.xAxis.axisLine = {
      lineStyle: {
        color: "#425b78"
      }
    }
  }
  if (options.yAxis) {
    options.yAxis.axisLine = { 
      lineStyle: {
        color: "#425b78"
      }
    }
    options.yAxis.splitLine=false;
    options.yAxis.axisLabel = {
      ...options.yAxis.axisLabel,
      fontSize: Math.round(12 * ratio_w)
    };

    options.yAxis.nameTextStyle = {
      ...options.yAxis.nameTextStyle,
      fontSize: Math.round(14 * ratio_w)
    };
    options.yAxis.minInterval = 1;
  }
  if (options.legend) {
    options.legend.textStyle = {
      ...options.legend.textStyle,
      fontSize: Math.round(12 * ratio_w)
    };

    options.legend.itemWidth = Math.round(30 * ratio_w);
    options.legend.itemHeight = Math.round(15 * ratio_h);
  }

  if (options.title) {
    options.title.textStyle = {
      ...options.title.textStyle,
      fontSize: Math.round(14 * ratio_w)
    };
  }

  if (options.graphic && options.graphic.elements) {
    options.graphic.elements.forEach(x => {
      if (x.type === "image") {
        x.scaleX = ratio_w;
        x.scaleY = ratio_w;
      }
    });
  }

  if (options.series && options.series) {
    options.series.forEach(x => {
      if (x.type === "pie") {
        x.label = {
          ...x.label,
          fontSize: Math.round(12 * ratio_w)
        };
        if (x.labelLine) {
          let length = 30;
          let length2 = 60;
          if (x.name == "大气监测") {
            length = 10;
            length2 = 20;
          }
          x.labelLine = {
            ...x.labelLine,
            length: Math.round(length * ratio_w),
            length2: Math.round(length2 * ratio_w),
            lineStyle: {
              ...(x.labelLine.lineStyle ? x.labelLine.lineStyle : null),
              width: Math.round(1 * ratio_w)
            }
          };
        }
      }
    });
  }

  echart.setOption(options, true);
}
