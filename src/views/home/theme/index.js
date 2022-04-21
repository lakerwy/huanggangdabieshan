const data = [
  {
    name: "巡护管理",
    id: "XHGL",
    img: "img/img-xhgl.png"
  },
  {
    name: "周界视频",
    id: "ZJSP",
    img: "img/img-zjjk.png"
  },
  {
    name: "森林防火",
    id: "SLFH",
    img: "img/img-slfh.png",
    legend: true
  },
  {
    name: "景区热力图",
    id: "JQRLT",
    img: "img/img-jqrlt.png",
    legend: true
  },
  {
    name: "水文监测",
    id: "SWJC",
    img: "img/img-zjjk.png"
  },
  {
    name: "空气监测",
    id: "KQJC",
    img: "img/img-zjjk.png"
  },
  {
    name: "专题信息",
    id: "theme",
    img: "img/img-ztxx.png",
    layersManager: true
  }
];

export function getThemes(ids) {
  if (!Array.isArray(ids)) {
    return [];
  }
  let themes = [];
  ids.forEach(i => {
    data.forEach(d => {
      if (d.id === i) {
        themes.push(d);
      }
    });
  });
  return themes;
}
