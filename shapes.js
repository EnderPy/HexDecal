// imp`ort cyrb64Hash from "./simple-hash.js";

class shapeClass {
  constructor() {
    this.row = 0; // for generation
    this.col = 0;
    this.radius = undefined; // multiplies height, width, offsets, and points
    this.margin = undefined;
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
      flip: false,
    };
    this.points = [];
    this.stroke = {
      enabled: false,
      fill: undefined,
      width: undefined,
    };
    this.fill = {
      enabled: false,
      fill: undefined,
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
        height: Math.sqrt(3),
        width: 1.5,
        xOffset: 1.5, // how much to move each turn
        yOffset: Math.sqrt(3), // how much to move up down each
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: true, //alternate between 0 and yOffset
        alternateYOffset: [0, Math.sqrt(3) / 2],
        flip: false,
      });
    this.points = [
      { x: 1, y: 0 },
      { x: 0.5, y: Math.sqrt(3) / 2 },
      { x: -0.5, y: Math.sqrt(3) / 2 },
      { x: -1, y: 0 },
      { x: -0.5, y: -Math.sqrt(3) / 2 },
      { x: 0.5, y: -Math.sqrt(3) / 2 },
      { x: 1, y: 0 },
    ];
  }
}
class squareClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Square"),
      (this.dimension = {
        width: 2,
        height: 2,
        xOffset: 2, // offset per column
        yOffset: 2, // offset per row
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: false,
        alternateYOffset: undefined,
        flip: false,
      });
    this.points = [
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: -1, y: -1 },
    ];
  }
}
class circleClass extends shapeClass {
  constructor() {
    super();
    (this.name = "Circle"),
      (this.dimension = {
        height: 2,
        width: 2,
        xOffset: Math.sqrt(3), // offset per column
        yOffset: 2, // offset per row
        alternateX: false,
        alternateXOffset: undefined,
        alternateY: true,
        alternateYOffset: [0, 1],
        flip: false,
      });
    this.points = [];
    const sides = 32;
    const angleStep = (2 * Math.PI) / sides;
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep;
      this.points[i] = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
    }
  }
}

class shapeUI {
  constructor(shape) {
    this.shape = shape;
    this.name = shape.name;
  }
  generateHTML = function () {
    const generateFieldset = function (title = "", check = true) {
      let fieldset = document.createElement("fieldset");
      let legend = document.createElement("legend");
      if (check) {
        let checkbox = document.createElement("input");
        checkbox.oninput = (ev) => {
          if (ev.target.checked) {
            fieldset.classList.remove("hideContent");
          } else {
            fieldset.classList.add("hideContent");
          }
        };
        checkbox.type = "checkbox";
        checkbox.classList.add("legendCheckbox");
      }
      if (check) {
        legend.appendChild(checkbox);
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
      legendInput.oninput = (ev) => (this.name = ev.target.value);
      legend.append(legendInput);
      fieldset.append(legend);
      return fieldset;
    })();

    // radus, margin, weight
    const createSlider = function (
      // name = "",
      title = "",
      range = { min: 0, max: 200 },
      value = { slider: undefined, value: undefined, sync: true },
      type = "number",
      updateFunction = undefined,
    ) {
      //define objects
      let baseDiv = document.createElement("div");
      let valueBox = document.createElement("input");
      let slider = document.createElement("input");
      let label = document.createElement("label");
      let leftDiv = document.createElement("div");
      // set info
      valueBox.type = type;
      slider.type = "range";
      (slider.min = range.min), (slider.max = range.max);
      label.value = title;
      label.for = valueBox;
      // update and link values
      valueBox.oninput = () => {
        value.value = valueBox.value;
        if (sync) slider.value = valueBox.value;
        if (updateFunction) updateFunction();
      };
      slider.oninput = () => {
        value.value = slider.value;
        if (sync) valueBox.value = slider.value;
        if (updateFunction) updateFunction();
      };
      // styling and layout
      baseDiv.classList.add("flex", "flexDiv", "inputDiv");
      valueBox.classList.add("flexItem", "flexRight", "flexStaticWidth");
      // slider.classList.add()
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
    let radius = createSlider(
      "shape radius:",
      undefined,
      { slider: this.shape.radius, value: this.shape.radius, sync: true },
      undefined,
      this.updateGrid,
    );
    let margin = createSlider(
      "shape margin:",
      undefined,
      { slider: this.shape.margin, value: this.shape.margin, sync: true },
      undefined,
      this.updateGrid,
    );
    let weight = createSlider(
      "random Weight:",
      { min: 0, max: 5 },
      { slider: this.shape.weight, value: this.shape.weight, sync: true },
      undefined,
      this.updateGrid,
    );
    fieldset.append(radius, margin, weight);
    let strokeFieldset = generateFieldset("strokeFieldset");
    strokeFieldset.append(
      (() => {
        let transparency;
        let color;
        const updateColor = () => {
          this.shape.stroke.fill = RGBToRGBA(color, transparency);
        };
        let colorSlider = createSlider(
          "stroke color",
          { min: 0, max: 255 },
          { slider: transparency, value: color, sync: false },
          "color",
          updateColor,
        );
        let widthSlider = createSlider(
          "stroke width",
          { min: 0, max: 100 },
          {
            slider: this.shape.stroke.width,
            value: this.shape.stroke.width,
            sync: true,
          },
          undefined,
          this.updateGrid,
        );
        return colorSlider, widthSlider;
      })(),
    );
    let fillFieldset = generateFieldset("fillFieldset");
    fillFieldset.append(
      (() => {
        let transparency;
        let color;
        const updateColor = () => {
          this.shape.fill.fill = RGBToRGBA(color, transparency);
          updateGrid()
        };
        let colorSlider = createSlider(
          "fill color",
          { min: 0, max: 255 },
          { slider: transparency, value: color, sync: false },
          "color",
          updateColor,
        );

        return colorSlider, widthSlider;
      })(),
    );
    let imageFieldset = generateFieldset("imageFieldset");
    let advancedFieldset = generateFieldset("advancedFieldset");
    fieldset.append(strokeFieldset, fillFieldset);
  };
  updateGrid = function () {
    // need to update this to get all shapeUI elements
    generateShapeGrid([this]);
  };
}

var mainCanvas = document.getElementById("mainCanvas");
var ctx = mainCanvas.getContext("2d");

var customHexagon = new hexagonClass();
customHexagon.stroke.enabled = true;
customHexagon.stroke.width = 10;
customHexagon.stroke.fill = "black";

customHexagon.radius = 75;
customHexagon.margin = 10;

let img = new Image();
// img.src = "./smile.jpg";
img.onload = function () {
  console.log("Image loaded:", this.width, this.height);
};
// ctx.drawImage(img, 50, 50);
customHexagon.image.image = img;
// customHexagon.image.enabled = true;
customHexagon.image.width = 50;
customHexagon.image.height = 50;

var customCircle = new circleClass();
customCircle.stroke.enabled = true;
customCircle.stroke.width = 3;
customCircle.stroke.fill = "red";

customCircle.radius = (75 * Math.sqrt(3)) / 2;
customCircle.margin = 10;
customCircle.weight = 1;

var customSquare = new squareClass();
customSquare.stroke.enabled = true;
customSquare.stroke.width = 5;
customSquare.stroke.fill = "blue";

customSquare.radius = customCircle.radius;
customSquare.margin = 10;
customSquare.dimension.alternateY = customCircle.dimension.alternateY;
customSquare.dimension.alternateYOffset =
  customCircle.dimension.alternateYOffset;
customSquare.dimension.yOffset = customCircle.dimension.yOffset;
customSquare.dimension.xOffset = customCircle.dimension.xOffset;

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
var randomGridArray = randomGrid();
function generateShapeGrid(shapes = [], grid = randomGridArray) {
  ctx.clearRect(0, 0, documentWidth, documentHeight);
  //assume same type (hex, circle, etc)
  // console.log(shapes);
  let firstShape = shapes[0];
  const rows = Math.ceil(
    documentWidth / (firstShape.dimension.width * firstShape.radius) + 1,
  );
  const cols = Math.ceil(
    documentHeight / (firstShape.dimension.width * firstShape.radius) + 1,
  );
  if (grid.length < rows || grid[1].length < cols) {
    grid = randomGrid(rows, cols);
  }
  console.log(rows, cols);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // console.log(i, j);
      let shape = sampleShape(shapes, { row: i, col: j }, grid);
      shape.row = i;
      shape.col = j;
      generateShape(shape);
    }
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
  shapes.sort((a, b) => a.weight - b.weight);
  let totalWeight = shapes.reduce((sum, shape) => {
    return sum + shape.weight;
  }, 0);

  let thisWeight = grid[position.row][position.col] * totalWeight;
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
  ctx.beginPath();
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
  // for (let i = 0; i <= Object.keys(shape.points).length; i++) {
  //   if (i === 0) {
  //     ctx.moveTo(
  //       centerX + shape.points[i].x * shape.radius,
  //       centerY + shape.points[i].y * shape.radius,
  //     );
  //   } else {
  //     ctx.lineTo(
  //       centerX + shape.points[i].x * shape.radius,
  //       centerY + shape.points[i].y * shape.radius,
  //     );
  //   }
  // }

  ctx.moveTo(
    centerX + shape.points[0].x * (shape.radius - shape.margin),
    centerY + shape.points[0].y * (shape.radius - shape.margin),
  );
  for (point of shape.points) {
    ctx.lineTo(
      centerX + point.x * (shape.radius - shape.margin),
      centerY + point.y * (shape.radius - shape.margin),
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
    // console.log("filling line", ctx.lineWidth, ctx.strokeStyle, shape.points);
    ctx.stroke();
  }
  ctx.moveTo(centerX, centerY);
}
function RGBToRGBA(color, value) {
  var alphaHex = parseInt(value).toString(16).padStart(2, "0");
  return color + alphaHex;
}
