let prev = NaN;
let input = "0";
let prevOperation = undefined;
let resultOut = false;

const Operator = {
	PLUS:  0,
	MINUS: 1,
	MUL:   2,
	DIV:   3,
	EQL:   4,
	MOD:   5,
	DOT:   6,
	CLR:   7,
	POW:   8,
	PLM:   9
};

let Scr = document.getElementById('screen-data');

function getInput(data, isOperator) {
	if(isOperator) {
		if(data == Operator.EQL) {
			resultOut = true;
			prev = prevOperation === undefined ? input : performOperation();
			input = "0";
			prevOperation = undefined;
			//Scr.innerHTML = prev;
			showOutput(prev);
		}
		else if(data==Operator.CLR){
			clear();
		}
		else if(data == Operator.MOD) {
			if(prevOperation == Operator.MUL || prevOperation == Operator.DIV) {
				input = (Number(input) / 100).toString();
				showOutput(prev + getSign(prevOperation) + input);
			}
			else {
				resultOut = true;
				prev = prevOperation === undefined ? input : performOperation();
				input = "0";
				prevOperation = undefined;
				showOutput(prev);
			}
		}
		else if(data == Operator.DOT) {
			input = input.indexOf(".") == -1 ? input + "." : input;
			cursor++;
			if(prev==NaN || prevOperation==undefined) {
				showOutput(input);
			}
			else {
				showOutput(prev + getSign(prevOperation) + input);
			}
		}
		else if(data == Operator.PLM) {
			if(resultOut) {
				prev *= -1;
				showOutput(prev);
			}
			else {
				input *= -1;
				if(prev==NaN || prevOperation == undefined)
					showOutput(input);
				else
					showOutput(prev + getSign(prevOperation) + input);
			}
		}

		else {
			if(prevOperation === undefined)  {
				prev = resultOut ? prev : input;
				input = "0";
				prevOperation = data;
				resultOut = false;
				//Scr.innerHTML = prev + getSign(data);
				showOutput(prev + getSign(data));
			}
			else {
				if((prevOperation == Operator.MUL || prevOperation == Operator.DIV) && data == Operator.MINUS) {
					input = "-";
					showOutput(prev + getSign(prevOperation) + input);
				}
				else {
					prev = performOperation();
					input = "0";
					prevOperation = data;
					//Scr.innerHTML = prev + getSign(data);
					showOutput(prev + getSign(data));
				}
			}
		}
	}
	else {
		if(resultOut) {
			clear();
			resultOut = false;
		}

		input = input.toString()==="0" ? data.toString() : input.toString() + data.toString();

		if(prevOperation === undefined) {
			//Scr.innerHTML = input;
			showOutput(input);
		}
		else {
			//Scr.innerHTML = prev + getSign(prevOperation) + input;
			showOutput(prev + getSign(prevOperation) + input);
		}
	}
}

function showOutput(output) {
	Scr.innerHTML = output.toString().substr(0, 10);
} 

function clear() {
	input = "0";
	prev = NaN;
	cursor = 0;
	prevOperation = undefined;
	Scr.innerHTML = input;
}

function getSign(operator) {
	switch (operator) {
		case Operator.PLUS: return "+";
		case Operator.MINUS: return "-";
		case Operator.MUL: return "x";
		case Operator.DIV: return "÷";
		case Operator.POW: return "^";
	}
}

function performOperation() {
	switch (prevOperation) {
		case Operator.PLUS: return (Number(prev) + Number(input)).toString();
		case Operator.MINUS: return (Number(prev) - Number(input)).toString();
		case Operator.MUL: return (Number(prev) * Number(input)).toString();
		case Operator.DIV: return (Number(prev) / Number(input)).toString();
		case Operator.POW: return (Math.pow(Number(prev),Number(input))).toString();
	}
}