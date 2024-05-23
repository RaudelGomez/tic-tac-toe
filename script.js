/* let fields = [null, null, null, null, null, null, null, null, null]; */

let fields = [
	null,
	"circle",
	"circle",
	"circle",
	null,
	null,
	"cross",
	"cross",
	"cross",
];

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
			let fieldContent;
			/* const fieldContent = fields[index]
				? fields[index] === "circle"
					? "O"
					: "X"
				: ""; */
			if (fields[index]) {
				if (fields[index] === "circle") {
					fieldContent = renderCircle();
				} else {
					fieldContent = renderCross();
				}
			} else {
				fieldContent = "";
			}
			htmlContent += `<td class="${
				fields[index] || ""
			}" onclick="makeMove(${index})">${fieldContent}</td>`;
		}
		htmlContent += "</tr>";
	}
	htmlContent += "</table>";
	container.innerHTML = htmlContent;
}

function makeMove(index) {
	if (!fields[index]) {
		fields[index] = "cross"; // For example, always cross. You can change this to alternate turns.
		render();
	}
}

function renderCircle() {
	const width = 70;
	const height = 70;
	const circle = `
      <svg id="circle" style="width:${width}px; height:${height}px" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="25"></circle>
      </svg>
  `;
	return circle;
}

function renderCross() {
	const width = 70;
	const height = 70;
	const cross = `
      <svg id="cross" style="width:${width}px; height:${height}px" viewBox="0 0 70 70">
          <line x1="15" y1="15" x2="55" y2="55"></line>
          <line x1="15" y1="55" x2="55" y2="15"></line>
      </svg>
  `;
	return cross;
}
