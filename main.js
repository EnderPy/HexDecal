var widthSlider = document.getElementById("widthSlider");
var widthSliderOutput = document.getElementById("widthSliderOutput");

var marginSlider = document.getElementById("marginSlider");
var marginSliderOutput = document.getElementById("marginSliderOutput");

var strokeSlider = document.getElementById("strokeSlider");
var strokeSliderOutput = document.getElementById("strokeSliderOutput");

var docWidth = document.getElementById("docWidth");
var docWidthOutput = document.getElementById("docWidthOutput");

var docHeight = document.getElementById("docHeight");
var docHeightOutput = document.getElementById("docHeightOutput");

var mainCanvas = document.getElementById("mainCanvas");
var keepUpdatedBox = document.getElementById("keepUpdated");
var generateButton = document.getElementById("generateButton");

var lineColorBox = document.getElementById("lineColor");
var lineColorCheckBox = document.getElementById("lineColorCheck");
var lineColorOpacitySlider = document.getElementById("lineColorOpacity");

var fillColorBox = document.getElementById("fillColor");
var fillColorOpacitySlider = document.getElementById("fillColorOpacity");
var fillColorCheckBox = document.getElementById("fillColorCheck");

var backgroundColorBox = document.getElementById("backgroundColor");
var backgroundColorOpacitySlider = document.getElementById(
  "backgroundColorOpacity",
);
var backgroundColorCheckBox = document.getElementById("backgroundColorCheck");
// var backgroundColorClearBox = document.getElementById("backgroundColorClear");

var keepUpdated = keepUpdatedBox.checked;

var documentWidth;
var documentHeight;
var decalWidth;
var margin;
var lineWidth;

var lineColor;
var lineColorOpacity;
var lineColorCheck;

var fillColor;
var fillColorOpacity;
var fillColorCheck;

var backgroundColor;
var backgroundColorOpacity;
var backgroundColorCheck;
// var backgroundColorClear;

var decalType;

//TODO : add ".scrollable" class, attach scroll event, scroll by step amount

keepUpdatedBox.oninput = function () {
  keepUpdated = this.checked;
  generateHexagonGrid();
};

generateButton.addEventListener("click", () => generateHexagonGrid());

decalWidth = widthSliderOutput.value = widthSlider.value;
widthSlider.oninput = function () {
  decalWidth = widthSliderOutput.value = this.value;
  if (keepUpdated == true) {
    generateHexagonGrid();
  }
};
widthSliderOutput.oninput = function () {
  decalWidth = widthSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

margin = marginSliderOutput.value = marginSlider.value;
marginSlider.oninput = function () {
  margin = marginSliderOutput.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};
marginSliderOutput.oninput = function () {
  margin = marginSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

lineWidth = strokeSliderOutput.value = strokeSlider.value;
strokeSlider.oninput = function () {
  lineWidth = strokeSliderOutput.value = this.value;
  if (keepUpdated == true) {
    generateHexagonGrid();
  }
};
strokeSliderOutput.oninput = function () {
  lineWidth = strokeSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

documentWidth = docWidthOutput.value = docWidth.value;
docWidth.oninput = function () {
  documentWidth = docWidthOutput.value = this.value;
  mainCanvas.width = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};
docWidthOutput.oninput = function () {
  documentWidth = docWidth.value = this.value;
  mainCanvas.width = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

documentHeight = docHeightOutput.value = docHeight.value;
docHeight.oninput = function () {
  documentHeight = docHeightOutput.value = this.value;
  mainCanvas.height = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};
docHeightOutput.oninput = function () {
  documentHeight = docHeight.value = this.value;
  mainCanvas.height = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

lineColorCheck = lineColorCheckBox.checked;
lineColorCheckBox.oninput = function () {
  lineColorCheck = this.checked;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

function updateLineColor() {
  lineColor = RGBToRGBA(lineColorBox.value, lineColorOpacitySlider.value);
  if (keepUpdated) {
    generateHexagonGrid();
  }
}

lineColor = RGBToRGBA(lineColorBox.value, lineColorOpacitySlider.value);
lineColorBox.oninput = updateLineColor;
lineColorOpacitySlider.oninput = updateLineColor;

function updateFillColor() {
  fillColor = RGBToRGBA(fillColorBox.value, fillColorOpacitySlider.value);
  if (keepUpdated) {
    generateHexagonGrid();
  }
}

fillColorCheck = fillColorCheckBox.checked;
fillColorCheckBox.oninput = function () {
  fillColorCheck = this.checked;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

fillColor = RGBToRGBA(fillColorBox.value, fillColorOpacitySlider.value);
fillColorBox.oninput = updateFillColor;
fillColorOpacitySlider.oninput = updateFillColor;

function updateBackgroundColor() {
  backgroundColor = RGBToRGBA(
    backgroundColorBox.value,
    backgroundColorOpacitySlider.value,
  );
  if (keepUpdated) {
    generateHexagonGrid();
  }
}

backgroundColorCheck = backgroundColorCheckBox.checked;
backgroundColorCheckBox.oninput = function () {
  backgroundColorCheck = this.checked;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

backgroundColor = RGBToRGBA(
  backgroundColorBox.value,
  backgroundColorOpacitySlider.value,
);
backgroundColorBox.oninput = updateBackgroundColor;
backgroundColorOpacitySlider.oninput = updateBackgroundColor;

mainCanvas.height = documentHeight;
mainCanvas.width = documentWidth;

var ctx = mainCanvas.getContext("2d");
function generateHexagonGrid(
  radius = decalWidth,
  marginVar = margin,
  useStroke = lineColorCheck,
  stroke = lineWidth,
  strokeColor = lineColor,
  useFill = fillColorCheck,
  innerFillColor = fillColor,
  useBackColor = backgroundColorCheck,
  backColor = backgroundColor,
) {
  ctx.clearRect(0, 0, documentWidth, documentHeight);
  // constant values
  const hexHeight = radius * Math.sqrt(3);
  const hexWidth = 2 * radius;
  const verticalOffset = hexHeight / 2;
  // const horizontalOffset = hexWidth / 2;
  const horizontalOffset = radius * 1.5;
  console.log(horizontalOffset, verticalOffset);
  //rows and column
  const rows = Math.ceil(documentWidth / horizontalOffset);
  const cols = Math.ceil(documentHeight / hexHeight);
  // fill and background
  if (useBackColor) {
    ctx.beginPath();
    ctx.fillStyle = backColor;
    ctx.rect(0, 0, documentWidth, documentHeight);
    ctx.fill();
  }
  // console.log(rows, cols);
  if (!useStroke) {
    stroke = null;
  }
  if (!useFill) {
    innerFillColor = null;
  }
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      generateHexagon(
        radius - marginVar,
        j * horizontalOffset,
        i * hexHeight + (j % 2 == 0 ? verticalOffset : 0),
        stroke,
        (strokeFill = strokeColor),
        (fill = innerFillColor),
      );
    }
  }
}

function generateHexagon(
  radius,
  centerX,
  centerY,
  lineWidth = null,
  strokeFill = null,
  fill = null,
  clear = false,
) {
  ctx.beginPath();
  for (let i = 0; i <= 6; i++) {
    let angle = (Math.PI / 3) * i;
    let x = centerX + radius * Math.cos(angle);
    let y = centerY + radius * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.lineWidth = lineWidth;
  if (clear) {
    ctx.clear();
  }
  if (fill !== null) {
    ctx.fillStyle = fill;
    ctx.fill();
  }

  if (lineWidth !== null) {
    if (strokeFill !== null) {
      ctx.strokeStyle = strokeFill;
    }
    ctx.stroke();
  }

  ctx.moveTo(centerX, centerY);
}

// Icon Stuff

function generateIconHTML() {
  var parentNode = this.parentNode;
  var fieldNode = document.createElement("fieldset");
  fieldNode.className = "iconContainer";
  fieldNode.innerHTML = `<label for="toggleIcon">Toggle Icon</label>
            <input type="checkbox" name="toggleIcon" checked />
            <div class="iconDiv">
              <label for="iconName">Icon Name</label>
              <input type="text" class="iconName right" />
            </div>
            <div class="iconDiv">
              <label for="iconURL">icon URL</label>
              <input type="url" name="iconURL" class="iconURL" />
            </div>
            <div class="iconDiv">
              <label for="iconSize">Icon Size</label>
              <input type="range" name="iconSize" class="iconRange" />
            </div>
            <div class="iconDiv">
              <label for="iconWeight">Random Weight</label>
              <input
                type="range"
                name="iconWeight"
                class="iconWeight"
                min="0"
                max="1"
                value="0.5"
                step="0.01"
              />
            </div>
            <input
              type="button"
              value="Remove Icon"
              class="removeIcon"
              onclick="removeIcon.call(this)"
            />`;
  parentNode.appendChild(fieldNode);
}

function removeIcon() {
  console.log(this);
  var fieldNode = this.parentNode;
  fieldNode.parentNode.removeChild(fieldNode);
}

function RGBToRGBA(color, value) {
  var alphaHex = parseInt(value).toString(16).padStart(2, "0");
  return color + alphaHex;
}

window.onload = function () {
  generateHexagonGrid();
};
