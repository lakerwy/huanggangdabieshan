// 从赤道起算，每维差4°为一行，至南、北纬88°各分为22行，依次用大写拉丁字母A、B、C、...V表示其相应行号
// 纬度0°～60°：经差6°,纬差4°,单幅
// 纬度60°～76°：经差12°,纬差4°,双幅
// 纬度76°～88°：经差24°,纬差4°,四幅
// 纬度88°以上：合为一幅。
// 纵列：从180°经线起算，自西向东每经差6°为一列，全球分为60列，依次用阿拉伯数字1、2、3、...60表示其相应列号。
// 我国地处东半球赤道以北，图幅范围在经度72°～138°、纬度0°～56°内，包括行号为A、B、C...N的14行、列号为43、44、...53的11列

// 1:5千～1:50万比例尺地图的编号
export const SCALE_CODE = [
  {
    value: "B",
    label: "1:50 0000"
  },
  {
    value: "C",
    label: "1:25 0000"
  },
  {
    value: "D",
    label: "1:10 0000"
  },
  {
    value: "E",
    label: "1:50000"
  },
  {
    value: "F",
    label: "1:50000"
  },
  {
    value: "G",
    label: "1:10000"
  },
  {
    value: "H",
    label: "1:5000"
  }
];

export const SCALE_DIFF = {
  B: {
    dx: 3,
    dy: 2,
    lenX: 2,
    lenY: 2
  },
  C: {
    dx: 1.5,
    dy: 1,
    lenX: 4,
    lenY: 4
  },
  D: {
    dx: 1 / 2,
    dy: 1 / 3,
    lenX: 12,
    lenY: 12
  },
  E: {
    dx: 1 / 4,
    dy: 1 / 6,
    lenX: 24,
    lenY: 24
  },
  F: {
    dx: 1 / 8,
    dy: 1 / 12,
    lenX: 48,
    lenY: 48
  },
  G: {
    dx: 1 / 16,
    dy: 1 / 24,
    lenX: 96,
    lenY: 96
  },
  H: {
    dx: 1 / 32,
    dy: 1 / 48,
    lenX: 192,
    lenY: 192
  }
};

export const MILLION_ROW_CODE = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V"
];