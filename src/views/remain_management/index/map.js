export function addOnePoint(
    {
      component,
      data,
      lonKey = "lon",
      latKey = "lat",
      icon,
      hoverIcon,
      dialogType,
    }) {
  if (!component || !Array.isArray(data)) {
    return;
  }

  let id = dialogType;
  let dataSource = {
    type: "1", // List
    data: data.map((x) => {
      return {
        ...x,
        geometryType: "Point",
        coordinates: [parseFloat(x[lonKey]), parseFloat(x[latKey])],
        dialogType: dialogType,
      };
    }),
    geometryKey: "geometryType",
  };

  if (!component.vectorDataSource[id]) {
    let item = {
      id: id,
      dataSource: dataSource,
      zindex: 99999,
      isFit: true,
      fitOption: {
        maxZoom: 10,
        padding: [300,300,300,150]
      },
      styles: icon
          ? {
            icon: {
              src: icon,
            },
          }
          : null,
      hoverStyles: hoverIcon
          ? {
            icon: {
              src: hoverIcon,
            },
          }
          : null,
    };
    component.vectorDataSource[id] = item;
  } else {
    let child = component.$refs[id];
    child.clear();
    child.addData(dataSource);
  }
}