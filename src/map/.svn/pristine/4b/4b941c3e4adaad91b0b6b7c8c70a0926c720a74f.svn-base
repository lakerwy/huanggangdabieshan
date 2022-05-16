import "../../lib/gifler.min";
import { Icon, Style } from "ol/style";

export function gifStyle({ map, layer, feature, gifUrl, styleFunction }) {
  if (!map || !gifUrl) {
    return;
  }

  let obj = feature || layer;

  if (!obj) {
    return;
  }

  const gif = gifler(gifUrl);
  gif.frames(
    document.createElement("canvas"),
    function(ctx, frame) {
      let style = new Style({
        image: new Icon({
          img: ctx.canvas,
          imgSize: [frame.width, frame.height]
        })
      });

      if (styleFunction) {
        obj.setStyle(styleFunction(style));
      } else {
        obj.setStyle(style);
      }

      ctx.clearRect(0, 0, frame.width, frame.height);
      ctx.drawImage(frame.buffer, frame.x, frame.y);
      map.render();
    },
    true
  );
}
