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
					fieldContent = "O";
				} else {
					fieldContent = "X";
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
