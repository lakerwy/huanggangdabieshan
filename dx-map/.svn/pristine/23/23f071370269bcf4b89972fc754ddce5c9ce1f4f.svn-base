import Cartesian3 from "cesium/Source/Core/Cartesian3";
import CesiumMath from "cesium/Source/Core/Math";

/**
 * 调整相加的俯视角和高度，以相机所在的矩形范围的正南为原点
 * @param  {import("cesium/Source/Scene/Camera")} camera
 * @param  {Number} [height] = 7000 单位米
 * @param  {Number} [pitch] = -10 俯视角 -90 ~ 90
 * @param  {import("cesium/Source/Core/Rectangle")} [rectangle]
 */
export function setCameraHeightAndPitch(
  camera,
  height = 7000,
  pitch = -10,
  rectangle
) {
  rectangle = rectangle || camera.computeViewRectangle();
  let west = CesiumMath.toDegrees(rectangle.west);
  let east = CesiumMath.toDegrees(rectangle.east);
  let south = CesiumMath.toDegrees(rectangle.south);
  let north = CesiumMath.toDegrees(rectangle.north);
  let x = west + (east - west) / 2;
  let y = south;
  camera.setView({
    destination: new Cartesian3.fromDegrees(x, y, height),
    orientation: {
      heading: CesiumMath.toRadians(0), // east, default value is 0.0 (north)
      pitch: CesiumMath.toRadians(pitch), // default value (looking down)
      roll: 0.0 // default value
    }
  });
}
