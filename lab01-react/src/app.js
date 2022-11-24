import React from 'react';
import ReactDOM from 'react-dom';
const LETTERS = "ABCDEFG";
const IMAGES_FIELDS={
	black: "img/chyornoe-pole.svg",
	white: "img/beloe-pole.svg"
};
const IMAGES_CHECKERS={
	black: "img/chyornaya-shashka.svg",
	white: "img/belaya-shashka.svg"
};
const ALT_FIELDS={
	white: "белое поле",
	black: "черное поле"
};
const ALT_CHECKERS={
	black: "чёрная шашка",
	white: "белая шашка"
};

class Board extends React.Component {
	constructor(props) {
		super(props);

		let field = this.createField();
		this.state = {
			field: field
		};
	}
handleClick(i, j){
	alert("clicked" + i + " " + j);
}

	render() {
		return <div>{
			<Field field={this.state.field}></Field>
		}</div>;
	}
	createField() {
		let field = [];
		for (let i = 0; i < 8; i++) {
			let row = [];
			for (let j = 0; j < 8; j++) {
				row[j] = createChecker(i, j, () => this.handleClick(i, j));
			}
			field[i] = row;
		}
		return field;
	}
}
function createChecker(row, col, callback) {
	let color = ((row + col) % 2 == 0) ? "white" : "black";
	let type="none";
	if (color == "black") {
		if (row > 4)
			type = "white";
		if (row < 3)
			type = "black";
	} 
	return {
		color: color,
		type: type,
		damka: false,
		callback: callback
	};
}

class Field extends React.Component {
	render() {
		const header=<tr key="0" >
		<td key="0"></td>{
			Array.prototype.map.call(LETTERS, (l) => <th key={l}>{l}</th> )
		}</tr>;
		const rows = this.props.field.map((row, index) => {

			return <tr key={index + 1}>
				<th key="0">{index + 1}</th>{
					row.map((checker, i) => {
						return <td key={i}> <Checker value={checker}></Checker></td>;
					})
				}
			</tr>;
		});
		return <table>
			<tbody>
				{header}
				{rows}
			</tbody></table >
			;
	}
}
class Checker extends React.Component {
	render() {
		let v=this.props.value;
		let url= v.type == "none" ? IMAGES_FIELDS[v.color] : IMAGES_CHECKERS[v.type];
		let text = v.type == "none" ? ALT_FIELDS[v.color] : ALT_CHECKERS[v.type];
		return <div onClick={this.props.value.callback}>
			<img src={url} alt={text} ></img>
		</div>;
	}
}
export default Board;