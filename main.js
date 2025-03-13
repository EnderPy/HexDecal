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

var keepUpdated = keepUpdatedBox.checked;

//TODO : add ".scrollable" class, attach scroll event, scroll by step amount

keepUpdatedBox.oninput = function () {
  keepUpdated = this.checked;
  console.log(keepUpdated);
  generateHexagonGrid();
};

generateButton.addEventListener("click", () => generateHexagonGrid());

widthSliderOutput.value = widthSlider.value;
widthSlider.oninput = function () {
  widthSliderOutput.value = this.value;
  if (keepUpdated == true) {
    generateHexagonGrid();
  }
};
widthSliderOutput.onchange = function () {
  widthSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

marginSliderOutput.value = marginSlider.value;
marginSlider.oninput = function () {
  marginSliderOutput.value = this.value;
  if (keepUpdated == true) {
    generateHexagonGrid();
  }
};
marginSliderOutput.onchange = function () {
  marginSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

strokeSliderOutput.value = strokeSlider.value;
strokeSlider.oninput = function () {
  strokeSliderOutput.value = this.value;
  if (keepUpdated == true) {
    generateHexagonGrid();
  }
};
strokeSliderOutput.onchange = function () {
  strokeSlider.value = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

docWidthOutput.value = docWidth.value;
docWidth.oninput = function () {
  docWidthOutput.value = this.value;
  mainCanvas.width = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};
docWidthOutput.onchange = function () {
  docWidth.value = this.value;
  mainCanvas.width = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

docHeightOutput.value = docHeight.value;
docHeight.oninput = function () {
  docHeightOutput.value = this.value;
  mainCanvas.height = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};
docHeightOutput.onchange = function () {
  docHeight.value = this.value;
  mainCanvas.height = this.value;
  if (keepUpdated) {
    generateHexagonGrid();
  }
};

mainCanvas.height = docHeight.value;
mainCanvas.width = docWidth.value;

var ctx = mainCanvas.getContext("2d");
function generateHexagonGrid(
  radius = widthSlider.value,
  margin = marginSlider.value,
  strokeWidth = strokeSlider.value,
) {
  ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
  // constant values
  const hexHeight = radius * Math.sqrt(3);
  const hexWidth = 2 * radius;
  const verticalOffset = hexHeight / 2;
  // const horizontalOffset = hexWidth / 2;
  const horizontalOffset = radius * 1.5;
  console.log(horizontalOffset, verticalOffset);
  //rows and column
  const rows = Math.ceil(mainCanvas.width / horizontalOffset);
  const cols = Math.ceil(mainCanvas.height / hexHeight);
  // console.log(rows, cols);
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      generateHexagon(
        radius - margin,
        j * horizontalOffset,
        i * hexHeight + (j % 2 == 0 ? verticalOffset : 0),
        strokeWidth,
      );
    }
  }
}

function generateHexagon(radius, centerX, centerY, lineWidth, fill = null) {
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
  if (fill !== null) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.stroke();
  ctx.moveTo(centerX, centerY);
}
window.onload = function () {
  generateHexagonGrid(widthSliderOutput.value);
};
