let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = "circle"; // Empieza el jugador "circle"

function init() {
	render();
}

function render() {
	const container = document.getElementById("container");
	let htmlContent = "<table>";
	for (let i = 0; i < 3; i++) {
		htmlContent += "<tr>";
		for (let j = 0; j < 3; j++) {
			const index = i * 3 + j;
			let fieldContent = "";
			if (fields[index]) {
				if (fields[index] === "circle") {
					fieldContent = renderCircle();
				} else {
					fieldContent = renderCross();
				}
			}
			htmlContent += `<td class="${
				fields[index] || ""
			}" onclick="handleClick(${index}, this)">${fieldContent}</td>`;
		}
		htmlContent += "</tr>";
	}
	htmlContent += "</table>";
	container.innerHTML = htmlContent;
}

function handleClick(index, element) {
	if (!fields[index]) {
		fields[index] = currentPlayer;
		element.innerHTML =
			currentPlayer === "circle" ? renderCircle() : renderCross();
		element.removeAttribute("onclick");
		if (!checkGameOver()) {
			currentPlayer = currentPlayer === "circle" ? "cross" : "circle"; // Cambiar el turno
		}
	}
}

function checkGameOver() {
	const winningCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const combination of winningCombinations) {
		const [a, b, c] = combination;
		if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
			markWinningLine(combination);
			/* alert(`Player ${currentPlayer} wins!`); */
			return true; // Juego terminado
		}
	}

	if (fields.every((field) => field !== null)) {
		alert("It's a draw!");
		return true; // Empate
	}

	return false; // Juego aún en curso
}

function markWinningLine(combination) {
	const [a, b, c] = combination;
	const tdElements = document.querySelectorAll("td");
	const line = document.createElement("div");
	line.classList.add("winning-line");

	const start = tdElements[a].getBoundingClientRect();
	const end = tdElements[c].getBoundingClientRect();
	const table = tdElements[a].closest("table").getBoundingClientRect();

	const x1 = start.left + start.width / 2 - table.left;
	const y1 = start.top + start.height / 2 - table.top;
	const x2 = end.left + end.width / 2 - table.left;
	const y2 = end.top + end.height / 2 - table.top;

	line.style.width = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) + "px";
	line.style.transform = `translate(${x1}px, ${y1}px) rotate(${Math.atan2(
		y2 - y1,
		x2 - x1
	)}rad)`;
	document.querySelector("#container").appendChild(line);

	//Painting background red
	combination.forEach((index) => {
		const td = document.querySelectorAll("td")[index];
		td.classList.add("winner");
	});
}

function renderCircle() {
	const width = 65;
	const height = 65;
	const circle = `
      <svg id="circle" style="width:${width}px; height:${height}px" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="25"></circle>
      </svg>
  `;
	return circle;
}

function renderCross() {
	const width = 65;
	const height = 65;
	const cross = `
      <svg id="cross" style="width:${width}px; height:${height}px" viewBox="0 0 70 70">
          <line x1="15" y1="15" x2="55" y2="55"></line>
          <line x1="15" y1="55" x2="55" y2="15"></line>
      </svg>
  `;
	return cross;
}

function restartGame() {
	fields = [null, null, null, null, null, null, null, null, null];
	render();
}
