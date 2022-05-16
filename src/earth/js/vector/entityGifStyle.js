import "../../lib/gifler.min.js";
import "../../lib/libgif";
import RubbableGif from "../../lib/rubbable.js";
import * as Cesium from "cesium";

export function gifStyle({ entity, gifUrl }) {
  const img = document.createElement("img");
  img.src = gifUrl;
  img.setAttribute("rel:animated_src", gifUrl);
  img.setAttribute("rel:auto_play", "1");
  img.setAttribute("rel:rubbable", "1");

  var superGif = new RubbableGif({ gif: img });
  superGif.load(() => {
    entity.billboard = new Cesium.BillboardGraphics({
      image: new Cesium.CallbackProperty(() => {
        return superGif.get_canvas().toDataURL("image/png");
      }, false)
    });
  });
}
