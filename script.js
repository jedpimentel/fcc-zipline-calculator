// RUNS SLOW ON MY LUMIA 640 - there is room for improvement, but at least it works

//NEED TO FIX: 5*5= [25] then 1+1= should be [2]

// I think some of the code might be redundant, 
// I used the Windows calculator as inspiration, as It's what I usaually use
// it behaves similar, but only "displays" ten characters at a time
// one major diference:
// Windows Calc: [1][+][2][+][3][=][1][=] gives '4'
// My calc:      [1][+][2][+][3][=][1][=] gives '7'
// I assume the windows calc replaced the three with that last one and re-did the calc
// mine assumes it's another sum, so it just sums '1' on top of the rest
// I assume there is some math reason why mine is wrong, else I'd be working at MS

/*
  C A L C U L A T O R   A L G O R I T H M

  The calculator is meant to work one key press at a time.
  Similar to physical calculator

  
  [NOTICE: the text below is not 100% acccurate, just a rough idea]
  memVal is initializesd to zero, lastOp to plus, so that the
initial values don't affect anything else.
  screenVal is initialized as an empty string, and s kept as a string
  while screenVal is empty, the memVal will take it's place on screen
  mostRecentInputNumber is used as a second "saved" for chaining operations
  Number presses append a char the "screenVal" string.
  When an operator is pressed the memVal, lastOp, screenVal buffer is collapsed
into a new memVal, the most currrent operater is saved into lastOp, screenVal = ''
  The "equal" operator will do a similar collapse, but replaces screenVal with
memVal if screenVal is empty
 if screenval is empty, and equal is pressed, mem val is duplicated into screenval
 if screenval is empty, and an operator is presses, it replaces lastOp
*/

var savedVal;
var memVal = 0;
var lastOp = 'PLUS';
var screenVal = '';
//mostRecentInputNumber could maybe be used so [1][+][=][=] will output 3
var mostRecentInputNumber = 0;
// last key that was pressed/processed (other via screen or numpad)
var lastInput = undefined;




function appendToScreen(char) {
	//console.log(" - - - appending - - - ")
	if (lastInput == "EQUAL" /*&& char !== '+-'*/) {
		//console.log("lolwut procedute activated");
		input('C');
	}
	if (screenVal.toString().length >= 10) {
		return;
	}
	if (('0' <= char && char <= '9') || (char == '.' && screenVal.indexOf('.') < 0)) {
		if (screenVal == '0') { screenVal = char; }
		else screenVal += char;
		//console.log("screenVal is", screenVal);
		refreshScreen();
		return;
	}
	if (char === "+-") {
		if (screenVal.charAt(0) == '-') { screenVal = screenVal.substring(1); }
		else screenVal = '-' + screenVal;
		return;
	}
	//console.log("screenVal is", screenVal);
	refreshScreen();
	//console.log(char, "is not a valid input for 'appendToScreen'");
}

function clear() {
	//console.log("pressed clear");
	memVal = 0;
	lastOp = 'PLUS';
	screenVal = '';
	refreshScreen();
}
function clearEntry() {
	//console.log("pressed clear entry");
	screenVal = '0';
	if (isNaN(memVal)) {
		clear();
	}
	refreshScreen();
}




function add(a, b) {
	return a + b;
}
function sub(a, b) {
	return a - b;
}
function mul(a, b) {
	return a * b;
}
function div(a, b) {
	if (b === 0) {
		// refresh() will display 'error' on screen if isNaN(memVal)
		// only way to reset the "NaN" value is with 'CLEAR' button 
		// "Infinity" didn't feel right being displayed on-screen
		//console.log("YOU CANNOT DIVIDE BY ZERO!!!");
		return NaN;
		//return ;
		//throw "error, cannot divide by zero";
	}
	return a / b;
}
var operators = {
	'PLUS'     : add,
	'SUBTRACT' : sub,
	'MULTIPLY' : mul, 
	'DIVIDE'   : div,
};
function newOperator(type) {
	if (screenVal == '') {
		//screenVal = mostRecentInputNumber;
		mostRecentInputNumber = memVal;
	} else {
		mostRecentInputNumber = screenVal;
		eql();
	}
	
	lastOp = type;
}


function eql() {
	//console.log("nunningeq");
	if (screenVal === '') {
		screenVal = mostRecentInputNumber;
	} else {
		mostRecentInputNumber = screenVal;
	}
	//console.log("lastop was ", lastOp);
	var newVal = operators[lastOp](memVal, Number(screenVal));
	//console.log("memval", memVal, "op", lastOp, "screenval", screenVal);
	//console.log("new =", newVal);
	memVal = Number(newVal);
	screenVal = '';
	refreshScreen();
	return;
}




function del() {
	//console.log("deleting last character");
	var charCount = screenVal.length;
	screenVal = screenVal.substring(0, charCount - 1);
	refreshScreen();
}

// input feeds calc from the outside, contains one item for each button
// please reference this as the list of possible inputs/buttons
// this is part of both the numpad and on-screen handlers
// the button "onclick" HTML includes the relevent input() function
var screenButtons = {
	'0' : appendToScreen,
	'1' : appendToScreen,
	'2' : appendToScreen,
	'3' : appendToScreen,
	'4' : appendToScreen,
	'5' : appendToScreen,
	'6' : appendToScreen,
	'7' : appendToScreen,
	'8' : appendToScreen,
	'9' : appendToScreen,
	'.' : appendToScreen,
	'+-': appendToScreen,
	'CE'       : clearEntry,
	'C'        : clear,
	'PLUS'     : newOperator,
	'SUBTRACT' : newOperator,
	'MULTIPLY' : newOperator, 
	'DIVIDE'   : newOperator,
	'EQUAL'    : eql,
	'DELETE'   : del,
	}
	

function input(which) {
	
	//if (memVal === 'error' && which !== 'CE') {
	//	return;
	//}
	if (screenButtons.hasOwnProperty(which)) {
		// only appendToScreen & newOperator really need an argument
		screenButtons[which](which);
		lastInput = which;
	}
	return;	
}



var test = {
	"name": "jose",
}

// K E Y   P R E S S   H A N D L E R
// add function to 'key.keyboardChar' to have it handled
// this ties physcal key presses into the `input()` function above
var key = {}
key['0'.charCodeAt()] = '0';
key['1'.charCodeAt()] = '1';
key['2'.charCodeAt()] = '2';
key['3'.charCodeAt()] = '3';
key['4'.charCodeAt()] = '4';
key['5'.charCodeAt()] = '5';
key['6'.charCodeAt()] = '6';
key['7'.charCodeAt()] = '7';
key['8'.charCodeAt()] = '8';
key['9'.charCodeAt()] = '9';
key['.'.charCodeAt()] = '.';
key['/'.charCodeAt()] = 'DIVIDE';
key['*'.charCodeAt()] = 'MULTIPLY';
key['-'.charCodeAt()] = 'SUBTRACT';
key['+'.charCodeAt()] = 'PLUS';
key['\r'.charCodeAt()] = 'EQUAL';
key['\n'.charCodeAt()] = 'EQUAL';
key['\b'.charCodeAt()] = 'DELETE';

document.addEventListener("keypress", function(event) {
	var keyChar = String.fromCharCode(event.which);
	var keyCode = keyChar.charCodeAt();
	//console.log("char:", keyChar, "char code", keyCode);
	if (key.hasOwnProperty(keyCode)) {
		//console.log("HIT!");
		input(key[keyCode]);
	}
});

// DELETE needs its own handler since it's not a "keypress"
document.addEventListener("keydown", function(event) {
	if (event.which == '\b'.charCodeAt()) {
		//console.log("HIT!");
		// apparently I was the only person who didn't know backspace was
		// used to go back in browsing histrory. preventDefault() added
		// so pressing backpace won't 
		event.preventDefault();
		input(key['\b'.charCodeAt()]);
		
	}
});



var refreshScreeen = function() { ; }
document.addEventListener("DOMContentLoaded", function(event) {
	var screen = document.getElementById("screen");
	screenVal = Number(screenVal).toString();
	refreshScreen = function() {
		if (isNaN(memVal)) {
			screen.innerHTML = 'error';
		} else {
			screen.innerHTML = tenCharsNum(screenVal || memVal);
		}
	}
	refreshScreen();
		
});



// D I S P L A Y   N U M B E R   A S   T E N   C H A R A C T E R S
//  -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
// display number as ten chars, including scientific notation, no trailing zeros
// helpful for stuff like displaying 0.1 + 0.2 with JavaScript math
// normal calculators show 10 digits and have an option for the decimal sign between digits
// I'm going to just make a 10 digit string including the decimal sign since emulating
// a real calculator screen would be too much hassle (and should be a project itself);
// numbers like 123456789.123 will only show 9 digits as "123456789." would be weird
// internally, the calculator will keep the precision, this is for just for display purposes
function tenCharsNum(val) {
	if (val === '.') {
		return '0.';
	}
	// '.' is counted as a numberChar
	var numberChars = 10;
	// Number() AND toString() called on same line so string/number inputs process equally
	var valString = Number(val).toString();
	//console.log("original string", valString);
	var sign;
	if (valString.charAt(0) == '-') {
		sign = '-';
		numberChars--;
		valString = valString.substring(1);
	} else {
		sign = '';
	}
	//force scientific notation if number won't fit
	if(valString.length > numberChars && valString.indexOf('e') == -1) {
		valString = Number(valString).toExponential().toString();
	}
	
	
	
	var exponentIndex = valString.indexOf('e');
	var exponent = '';
	if (-1 < exponentIndex) {
		exponent  = valString.substring(exponentIndex);
		valString = valString.substring(0, exponentIndex);
		numberChars -= exponent.length;
	}
	if (numberChars < valString.length) {
		var trailingChar = valString.substring(numberChars - 1);
		//console.log("trailing char is", trailingChar);
		if (trailingChar.charAt(0) == '.') {
			trailingChar = '';
		} else {
			//trailingChar = trailingChar.split('').filter(x => x != '.').join('')
			trailingChar = trailingChar.split('').filter(function(x) {return x != '.'; }).join('')
			//console.log("trailing char is", trailingChar);
			trailingChar = Math.round(Number(trailingChar) / Math.pow(10, trailingChar.length - 1).toString());
			//console.log("trailing char is now", trailingChar);
		}
		// Number(val).toString() used to remove trailing zeros else 0.1+0.2 gives 0.30000000
		valString = Number(valString.substring(0, numberChars - 1) + trailingChar).toString();
	}
	//console.log("number chars", numberChars);
	//console.log("sign", sign);
	//console.log("val string", valString);
	//console.log("exponent", exponent);
	return sign + valString + exponent;
}
