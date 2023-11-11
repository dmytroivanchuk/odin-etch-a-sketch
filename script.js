let gridNumber = 16;
let mode = "Darkening";
let container = document.createElement("div");

addButtons();
addContainer();
addRowsAndSquares(gridNumber, gridNumber);

function addButtons() {
  let setButton = document.createElement("button");
  setButton.textContent = "Set number of squares per side";
  setButton.addEventListener("click", setGridNumber);
  document.body.appendChild(setButton);

  let toggleButton = document.createElement("button");
  toggleButton.textContent = "Toggle Coloring";
  toggleButton.addEventListener("click", () => {
    switch (mode) {
      case "Darkening":
        toggleButton.textContent = "Toggle Darkening";
        mode = "Coloring";
        break;
      case "Coloring":
        toggleButton.textContent = "Toggle Coloring";
        mode = "Darkening";
    }
  });

  document.body.appendChild(toggleButton);
}

function addContainer() {
  container.classList.add("container");
  document.body.appendChild(container);
}

function addRowsAndSquares(rows, squares) {
  for (let i = 0; i < rows; i++) {
    let row = document.createElement("div");
    row.classList.add("row");

    addSquares(squares, row);

    container.appendChild(row);
  }
}

function addSquares(squares, row) {
  for (let i = 0; i < squares; i++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("mouseenter", addBackground);
    row.appendChild(square);
  }
}

function addBackground() {
  switch (mode) {
    case "Darkening":
      let brightness = this.getAttribute("style");
      switch (brightness) {
        case "filter: brightness(90%);":
          this.setAttribute("style", "filter: brightness(80%);");
          break;
        case "filter: brightness(80%);":
          this.setAttribute("style", "filter: brightness(70%);");
          break;
        case "filter: brightness(70%);":
          this.setAttribute("style", "filter: brightness(60%);");
          break;
        case "filter: brightness(60%);":
          this.setAttribute("style", "filter: brightness(50%);");
          break;
        case "filter: brightness(50%);":
          this.setAttribute("style", "filter: brightness(40%);");
          break;
        case "filter: brightness(40%);":
          this.setAttribute("style", "filter: brightness(30%);");
          break;
        case "filter: brightness(30%);":
          this.setAttribute("style", "filter: brightness(20%);");
          break;
        case "filter: brightness(20%);":
          this.setAttribute("style", "filter: brightness(10%);");
          break;
        case "filter: brightness(10%);":
          this.setAttribute("style", "filter: brightness(0%);");
          break;
        case "filter: brightness(0%);":
          break;
          break;
        default:
          this.setAttribute("style", "filter: brightness(90%);");
      }
      break;
    case "Coloring":
      let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      this.setAttribute("style", `background-color: ${randomColor};`);
  }
}

function removeRows(rows) {
  for (let i = 0; i < rows; i++) {
    let row = container.lastChild;
    container.removeChild(row);
  }
}

function removeSquares(squares, row) {
  for (let i = 0; i < squares; i++) {
    let square = row.lastChild;
    row.removeChild(square);
  }
}

function setGridNumber() {
  let userGridNumber = getUserGridNumber();
  rearrangeRowsAndSquares(userGridNumber);
  gridNumber = userGridNumber;
}

function getUserGridNumber() {
  let userGridNumber = Number(
    prompt("How many squares do you want per side for the new grid?")
  );

  while (!userGridNumber || userGridNumber < 0 || userGridNumber > 100) {
    let generalWarning =
      "Please try again. How many squares do you want per side for the new grid?";

    if (!userGridNumber) {
      userGridNumber = Number(
        prompt("Invalid number entered." + " " + generalWarning)
      );
    } else if (userGridNumber < 0) {
      userGridNumber = Number(
        prompt("The minimum number of squares is 1." + " " + generalWarning)
      );
    } else if (userGridNumber > 100) {
      userGridNumber = Number(
        prompt("The maximum number of squares is 100." + " " + generalWarning)
      );
    }
  }

  return userGridNumber;
}

function rearrangeRowsAndSquares(userGridNumber) {
  document.querySelectorAll(".square").forEach((square) => {
    if (square.style != null) {
      square.style = null;
    }
  });

  if (userGridNumber > gridNumber) {
    let difference = userGridNumber - gridNumber;

    container.childNodes.forEach((row) => {
      addSquares(difference, row);
    });

    addRowsAndSquares(difference, userGridNumber);
  } else if (userGridNumber < gridNumber) {
    let difference = gridNumber - userGridNumber;

    removeRows(difference);

    container.childNodes.forEach((row) => {
      removeSquares(difference, row);
    });
  }
}
