// imp`ort cyrb64Hash from "./simple-hash.js";

var keepUpdated = false;
class shapeClass {
  constructor() {
    this.row = 0; // for generation
    this.col = 0;
    this.radius = 50; // multiplies height, width, offsets, and points
    this.margin = 0;
    this.weight = 1;
    this.name = undefined;
    this.dimension = {
      height: undefined,
      width: undefined,
      xOffset: undefined, // offset per column
      yOffset: undefined, // offset per row
      alternateX: false,
      alternateXOffset: undefined,
      alternateY: false,
      alternateYOffset: undefined,
      flipY: false,
      flipX: false,
    };
    this.points = [];
    this.stroke = {
      enabled: false,
      fill: "#000000ff",
      width: 10,
      cap: "butt",
      join: "miter",
    };
    this.fill = {
      enabled: false,
      fill: "#000000ff",
    };
    this.image = {
      enabled: false,
      image: {},
      width: undefined,
      height: undefined,
    };
  }
}
// basic shapes
class hexagonClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Hexagon"),
      (this.dimension = {
        height: Math.sqrt(3) * (Math.sqrt(3) / 3),
        width: 1.5 * (Math.sqrt(3) / 3),
        xOffset: 1.5 * (Math.sqrt(3) / 3), // how much to move each turn
        yOffset: Math.sqrt(3) * (Math.sqrt(3) / 3), // how much to move up down each
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: true, //alternate between 0 and yOffset
        alternateYOffset: [0, (Math.sqrt(3) / 2) * (Math.sqrt(3) / 3)],
        flipY: false,
        flipX: false,
      });
    this.points = [
      { x: 1 * (Math.sqrt(3) / 3), y: 0 },
      {
        x: 0.5 * (Math.sqrt(3) / 3),
        y: (Math.sqrt(3) / 2) * (Math.sqrt(3) / 3),
      },
      {
        x: -0.5 * (Math.sqrt(3) / 3),
        y: (Math.sqrt(3) / 2) * (Math.sqrt(3) / 3),
      },
      { x: -1 * (Math.sqrt(3) / 3), y: 0 },
      {
        x: -0.5 * (Math.sqrt(3) / 3),
        y: (-Math.sqrt(3) / 2) * (Math.sqrt(3) / 3),
      },
      {
        x: 0.5 * (Math.sqrt(3) / 3),
        y: (-Math.sqrt(3) / 2) * (Math.sqrt(3) / 3),
      },
      { x: 1 * (Math.sqrt(3) / 3), y: 0 },
    ];
  }
}
class squareClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Square"),
      (this.dimension = {
        width: 1,
        height: 1,
        xOffset: 1, // offset per column
        yOffset: 1, // offset per row
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: false,
        alternateYOffset: undefined,
        flipY: false,
        flipX: false,
      });
    this.points = [
      { x: -0.5, y: -0.5 },
      { x: 0.5, y: -0.5 },
      { x: 0.5, y: 0.5 },
      { x: -0.5, y: 0.5 },
      { x: -0.5, y: -0.5 },
    ];
  }
}
class circleClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Circle"),
      (this.dimension = {
        height: 2 / 2,
        width: 2 / 2,
        xOffset: Math.sqrt(3) / 2, // offset per column
        yOffset: 2 / 2, // offset per row
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: true,
        alternateYOffset: [0, 1 / 2],
        flipY: false,
        flipX: false,
      });
    this.points = [];
    const sides = 32;
    const angleStep = (2 * Math.PI) / sides;
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep;
      this.points[i] = {
        x: Math.cos(angle) / 2,
        y: Math.sin(angle) / 2,
      };
    }
  }
}
class triangleClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Triangle"),
      (this.dimension = {
        height: 1,
        width: Math.sqrt(3) / 3,
        xOffset: Math.sqrt(3) / 3, // offset per column
        yOffset: 1, // offset per row
        alternateX: true,
        alternateXOffset: [0, -Math.sqrt(3) / 3],
        alternateY: true,
        alternateYOffset: [0.33, 0],
        flipY: true,
        flipX: false,
      });
    this.points = [
      { x: 0, y: -2 / 3 },
      { x: Math.sqrt(3) / 3, y: 1 / 3 },
      { x: -Math.sqrt(3) / 3, y: 1 / 3 },
      { x: 0, y: -2 / 3 },
    ];
  }
}
// refer back to shape from JS (updateGrid())
class shapeUI {
  constructor(shape) {
    this.shape = shape;
    this.name = shape.name;
  }
  createSlider = function (
    // name = "",
    title = "",
    range = { min: 0, max: 200, step: 1 },
    value = { object: undefined, value: undefined },
    box = { object: undefined, value: undefined },
    sync = true,
    type = "number",
    updateFunction = undefined,
  ) {
    // console.log("values:", property, this.property);
    // value = 25;
    // console.log("values:", property, this.property);
    //define objects
    let baseDiv = document.createElement("div");
    let valueBox = document.createElement("input");
    let slider = document.createElement("input");
    let label = document.createElement("label");
    let leftDiv = document.createElement("div");
    // set info
    valueBox.type = type;
    valueBox.step = range.step;
    slider.type = "range";
    (slider.min = range.min), (slider.max = range.max);
    slider.step = range.step;
    label.innerText = title;
    label.for = valueBox;
    // update and link values
    valueBox.value = box.object[value.value];
    // valueBox.oninput = (ev) => {
    //   box.object[box.value] = valueBox.value;
    //   if (type == "number") valueBox.value = Number(box.object[box.value]);
    //   if (sync) slider.value = box.object[value.value];
    //   if (updateFunction) updateFunction();
    // };

    valueBox.onblur =
      valueBox.oninput =
      valueBox.onkeydown =
        (event) => {
          if (
            (event.type === "keydown" && event.key === "Enter") ||
            event.type === "blur" ||
            (event.type === "input" &&
              event.inputType === "insertReplacementText")
          ) {
            box.object[box.value] = valueBox.value;
            if (type == "number")
              valueBox.value = Number(box.object[box.value]);
            if (sync) slider.value = box.object[value.value];
            if (updateFunction) updateFunction();
          }
        };
    // valueBox.onblur = valueBox.oninput = (event) => {
    //   console.log(event);
    //   if (event.type === "blur" || event.key === "Enter") {
    //     box.object[box.value] = valueBox.value;
    //     if (type == "number") valueBox.value = Number(box.object[box.value]);
    //     if (sync) slider.value = box.object[value.value];
    //     if (updateFunction) updateFunction();
    //   }
    // };
    slider.value = value.object[value.value];
    slider.oninput = () => {
      value.object[value.value] = Number(slider.value);
      if (sync) valueBox.value = value.object[value.value];

      if (updateFunction) updateFunction();
    };
    // styling and layout
    baseDiv.classList.add("flex", "flexDiv", "inputDiv");
    valueBox.classList.add(
      "flexItem",
      "flexRight",
      "flexStaticWidth",
      "flexValueBox",
    );

    slider.classList.add("rangeSlider");
    leftDiv.classList.add("flex", "flexDiv", "flexItem");
    leftDiv.style.flexDirection = "column";
    label.style.width = "100%";
    slider.style.width = "100%";

    leftDiv.append(label);
    leftDiv.append(slider);
    baseDiv.append(leftDiv);
    baseDiv.append(valueBox);
    return baseDiv;
  };
  generateHTML = function () {
    const generateFieldset = function (
      title = "",
      check = true,
      updateFunction = updateGrid,
    ) {
      let fieldset = document.createElement("fieldset");
      let legend = document.createElement("legend");
      fieldset.classList.add("shapeSet");
      if (check) {
        var checkbox = document.createElement("input");
        fieldset.classList.add("hideContent");
        checkbox.oninput = (ev) => {
          if (ev.target.checked) {
            fieldset.classList.remove("hideContent");
            if (keepUpdated) updateGrid;
          } else {
            fieldset.classList.add("hideContent");
            if (keepUpdated) updateGrid;
          }
        };
        checkbox.type = "checkbox";
        checkbox.classList.add("legendCheckbox");
        legend.appendChild(checkbox);
        fieldset.checkbox = checkbox; // Add checkbox to fieldset for later access
      }

      legend.appendChild(document.createTextNode(title));
      fieldset.append(legend);
      return fieldset;
    };
    var fieldset = (() => {
      let fieldset = document.createElement("fieldset");
      fieldset.className += "shapeFieldset";
      // legend
      let legend = document.createElement("legend");
      let legendInput = document.createElement("input");
      legendInput.type = "text";
      legendInput.name = this.name;
      legendInput.value = this.name;
      legendInput.oninput = (ev) => (this.name = ev.target.value);
      legend.append(legendInput);
      fieldset.append(legend);
      return fieldset;
    })();
    var shape = this.shape;
    fieldset.shape = shape;
    // fieldset.shape.radius = 15;
    // console.log(shape.radius, fieldset.shape.radius, this.shape.radius);

    // radus, margin, weight
    let radius = this.createSlider(
      "shape radius:",
      undefined,
      { object: shape, value: "radius" },
      { object: shape, value: "radius" },
      true,
      undefined,
      updateGrid,
      undefined,
    );
    let margin = this.createSlider(
      "shape margin:",
      undefined,
      { object: shape, value: "margin" },
      { object: shape, value: "margin" },
      true,
      undefined,
      updateGrid,
    );
    let weight = this.createSlider(
      "random Weight:",
      { min: 0, max: 5, step: 0.01 },
      { object: shape, value: "weight" },
      { object: shape, value: "weight" },
      true,
      undefined,
      updateGrid,
    );
    fieldset.append(radius, margin, weight);
    let strokeFieldset = generateFieldset("strokeFieldset");
    strokeFieldset.checkbox.addEventListener("click", (ev) => {
      shape.stroke.enabled = ev.target.checked;
      if (keepUpdated) {
        updateGrid();
      }
    });
    strokeFieldset.append(
      (() => {
        let colors = {
          color: this.shape.stroke.fill.slice(0, 7),
          transparency: parseInt(this.shape.stroke.fill.slice(7), 16),
        };
        // var transparency;
        // var color;
        let updateColor = () => {
          shape.stroke.fill = RGBToRGBA(colors.color, colors.transparency);
          if (keepUpdated) {
            updateGrid();
          }
        };

        let colorSlider = this.createSlider(
          "stroke color",
          { min: 0, max: 255, step: 1 },
          { object: colors, value: "transparency" },
          { object: colors, value: "color" },
          false,
          "color",
          updateColor,
        );
        shape.stroke.fill = RGBToRGBA(colors.color, colors.transparency);

        return colorSlider;
      })(),
    );
    strokeFieldset.append(
      (() => {
        var widthSlider = this.createSlider(
          "stroke width",
          { min: 0, max: 255, step: 1 },
          { object: shape.stroke, value: "width" },
          { object: shape.stroke, value: "width" },
          true,
          undefined,
          updateGrid,
        );
        return widthSlider;
      })(),
    );
    const multiSelect = (
      options,
      name,
      value = { object: shape.stroke, value: "cap" },
    ) => {
      let baseDiv = document.createElement("div");
      let select = document.createElement("select");
      let label = document.createElement("label");
      let leftDiv = document.createElement("div");

      leftDiv.classList.add("flex", "flexDiv", "flexItem");
      baseDiv.classList.add("flex", "flexDiv", "inputDiv");
      select.classList.add(
        "flexItem",
        "flexRight",
        "flexStaticWidth",
        "flexValueBox",
      );
      label.innerText = name;
      label.for = select;

      options.forEach((option) => {
        let opt = document.createElement("option");
        opt.value = option;
        opt.text = option;
        select.appendChild(opt);
      });

      select.value = value.object[value.value];
      select.onchange = (ev) => {
        value.object[value.value] = ev.target.value;
        if (keepUpdated) {
          updateGrid();
        }
      };

      leftDiv.appendChild(label);
      baseDiv.appendChild(leftDiv);
      baseDiv.appendChild(select);

      return baseDiv;
    };
    strokeFieldset.append(
      multiSelect(["round", "butt", "square"], "stroke cap", {
        object: shape.stroke,
        value: "cap",
      }),
    );
    strokeFieldset.append(
      multiSelect(["round", "bevel", "miter"], "stroke join", {
        object: shape.stroke,
        value: "join",
      }),
    );
    let fillFieldset = generateFieldset("fillFieldset");
    fillFieldset.checkbox.addEventListener("click", (ev) => {
      shape.fill.enabled = ev.target.checked;
      if (keepUpdated) {
        updateGrid();
      }
    });
    fillFieldset.append(
      (() => {
        let colors = {
          color: this.shape.fill.fill.slice(0, 7),
          transparency: parseInt(this.shape.fill.fill.slice(7), 16),
        };
        const updateColor = () => {
          shape.fill.fill = RGBToRGBA(colors.color, colors.transparency);
          if (keepUpdated) {
            updateGrid();
          }
        };
        let colorSlider = this.createSlider(
          "stroke color",
          { min: 0, max: 255, step: 1 },
          { object: colors, value: "transparency" },
          { object: colors, value: "color" },
          false,
          "color",
          updateColor,
        );

        return colorSlider;
      })(),
    );
    let imageFieldset = generateFieldset("imageFieldset");
    let advancedFieldset = generateFieldset("advancedFieldset");
    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove shape";
    removeButton.classList.add("centerElement");
    removeButton.addEventListener("click", () => {
      fieldset.remove();
      if (keepUpdated) updateGrid();
    });
    fieldset.append(strokeFieldset, fillFieldset, removeButton);
    return fieldset;
  };
}
shapeFieldset = document.getElementById("shapeFieldset");
function updateGrid() {
  // console.log(shapeFieldset);
  if (!keepUpdated) return;
  var shapes = [];
  for (element of shapeFieldset.getElementsByClassName("shapeFieldset")) {
    // console.log("element:", element);
    shapes.push(element.shape);
  }
  // console.log("shapes:", shapes);
  if (shapes != []) {
    generateShapeGrid(shapes);
  }
}
getShapes = function () {
  var shapes = [];
  for (element of shapeFieldset.getElementsByClassName("shapeFieldset")) {
    // console.log("element:", element);
    shapes.push(element.shape);
  }
  return shapes;
};

var mainCanvas = document.getElementById("mainCanvas");
var ctx = mainCanvas.getContext("2d");

var docWidth = document.getElementById("docWidth");
var docWidthOutput = document.getElementById("docWidthOutput");

var docHeight = document.getElementById("docHeight");
var docHeightOutput = document.getElementById("docHeightOutput");

var documentWidth;
var documentHeight;

const updateWidth = function () {
  mainCanvas.width =
    documentWidth =
    docWidth.value =
    docWidthOutput.value =
      this.value;
  if (keepUpdated) {
    updateGrid();
  }
};

const updateHeight = function () {
  mainCanvas.height =
    documentHeight =
    docHeight.value =
    docHeightOutput.value =
      this.value;
  if (keepUpdated) {
    updateGrid();
  }
};

docWidth.oninput = updateWidth;
docWidthOutput.oninput = updateWidth;

docHeight.oninput = updateHeight;
docHeightOutput.oninput = updateHeight;

var randomGridArray = randomGrid();

let keepUpdatedBox = document.getElementById("keepUpdatedBox");

keepUpdatedBox.oninput = function (ev) {
  keepUpdated = ev.target.checked;
};

updateWidth.call(docWidth);
updateHeight.call(docHeight);
let generateButton = document.getElementById("generateButton");
generateButton.onclick = updateGrid;

writeShape = (shapeClass) => {
  let shapeui = new shapeUI(shapeClass);
  shapeFieldset.append(shapeui.generateHTML());
  console.log(shapeui);
  if (keepUpdated) updateGrid();
};
document.getElementById("circle").addEventListener("click", () => {
  writeShape(new circleClass());
});
document.getElementById("hexagon").addEventListener("click", () => {
  writeShape(new hexagonClass());
});
document.getElementById("square").addEventListener("click", () => {
  writeShape(new squareClass());
});
document.getElementById("triangle").addEventListener("click", () => {
  writeShape(new triangleClass());
});
// document.getElementById("triangle").oninput = writeShape(new triangleClass);

function randomGrid(rows = 50, cols = 50) {
  let getFloat = () => {
    return Math.random().toFixed(4);
  };
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(getFloat());
    }
    grid.push(row);
  }
  return grid;
}
function generateShapeGrid(shapes = getShapes(), grid = randomGridArray) {
  ctx.clearRect(0, 0, documentWidth, documentHeight);
  //assume same type (hex, circle, etc)
  var firstShape = shapes[0];
  // console.log(shapes);
  const rows = Math.ceil(
    documentWidth / (firstShape.dimension.width * firstShape.radius) + 2,
  );
  // console.log(documentWidth, firstShape.dimension.width, firstShape.radius);
  const cols = Math.ceil(
    documentHeight / (firstShape.dimension.width * firstShape.radius) + 2,
  );
  if (grid.length < rows || grid[1].length < cols) {
    grid = randomGrid(rows, cols);
  }

  // console.log(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // console.log(i, j);
      let shape = sampleShape(shapes, { row: i, col: j }, grid);
      shape.row = i;
      shape.col = j;
      generateShape(shape);
    }
    // console.log(shapes);
  }
}
function sampleShape(
  shapes = [],
  position = { row: 0, col: 0 },
  grid = randomGridArray,
) {
  if (shapes.length == 1) {
    return shapes[0];
  }
  // shapes.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
  let totalWeight = shapes.reduce((sum, shape) => {
    return sum + shape.weight;
  }, 0);

  let thisWeight = grid[position.row][position.col] * totalWeight;
  console.log(
    "sort",
    (() => {
      let a = [];
      for (element of shapes) {
        a.push(element.weight);
      }
      return a;
    })(),
    totalWeight,
    thisWeight,
  );

  // console.log(grid[position.row][position.col], thisWeight, totalWeight);
  let total = 0;
  for (element of shapes) {
    if (thisWeight <= element.weight + total) return element;
    total += element.weight;
  }
  return shapes[shapes.length - 1];

  //fallback
  // return shapes[0];
}
function generateShape(shape) {
  // console.log(shape);
  ctx.beginPath();
  // console.log("drawing", shape);
  centerX = shape.col * shape.radius * shape.dimension.xOffset;
  centerY = shape.row * shape.radius * shape.dimension.yOffset;
  if (shape.dimension.alternateX) {
    centerX +=
      shape.dimension.alternateXOffset[
        shape.row % shape.dimension.alternateXOffset.length
      ] * shape.radius;
  }
  if (shape.dimension.alternateY) {
    centerY +=
      shape.dimension.alternateYOffset[
        shape.col % shape.dimension.alternateYOffset.length
      ] * shape.radius;
  }
  let xMultiplier = 1;
  let yMultiplier = 1;
  if (shape.dimension.flipX == true) xMultiplier = shape.rows % 2 == 0 ? 1 : -1;
  if (shape.dimension.flipY == true) yMultiplier = shape.col % 2 == 0 ? 1 : -1;

  ctx.moveTo(
    centerX + shape.points[0].x * (shape.radius - shape.margin) * xMultiplier,
    centerY + shape.points[0].y * (shape.radius - shape.margin) * yMultiplier,
  );
  for (point of shape.points) {
    ctx.lineTo(
      centerX + point.x * (shape.radius - shape.margin) * xMultiplier,
      centerY + point.y * (shape.radius - shape.margin) * yMultiplier,
    );
  }
  //
  ctx.closePath();
  if (shape.fill.enabled) {
    ctx.fillStyle = shape.fill.fill;
    ctx.fill();
  }
  if (shape.image.enabled) {
    console.log(shape);
    ctx.drawImage(
      shape.image.image,
      centerY - shape.image.width / 2,
      centerY - shape.image.height / 2,
      shape.image.width,
      shape.image.height,
    );
  }
  if (shape.stroke.enabled) {
    ctx.lineWidth = shape.stroke.width;
    ctx.strokeStyle = shape.stroke.fill;
    ctx.lineCap = shape.stroke.cap;
    ctx.lineJoin = shape.stroke.join;

    console.log("filling line", ctx.strokeStyle, shape);
    ctx.stroke();
  }
  ctx.moveTo(centerX, centerY);
}
function RGBToRGBA(color, value) {
  // console.log(color, value);
  var alphaHex = parseInt(value).toString(16).padStart(2, "0");
  return color + alphaHex;
}
keepUpdated = keepUpdatedBox.checked;
