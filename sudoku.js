var cells = []; // array with all cells 0-80

function import_puzzle () {
	var sudoku1 =  [[0,0,0,2,6,0,7,0,1],
					[6,8,0,0,7,0,0,9,0],
					[1,9,0,0,0,4,5,0,0],
					[8,2,0,1,0,0,0,4,0],
					[0,0,4,6,0,2,9,0,0],
					[0,5,0,0,0,3,0,2,8],
					[0,0,9,3,0,0,0,7,4],
					[0,4,0,0,5,0,0,3,6],
					[7,0,3,0,1,8,0,0,0]];

	return sudoku2;
}

function sudoku_GUI() {
    var table = document.getElementById("gui"); // tabell

    // lager alle cellene, gir rad, kolonne og firkant attributter
    for (var c = 0; c < 9; c++) {
        var row = document.createElement("tr"); // en rad

        for (var r = 0; r < 9; r++) {
            var input = document.createElement("input"); // input til celle
            input.type = "text";
            input.maxLength = 1;
            input.row = r;
            input.column = c;
            input.square = square_number(r, c);
          
            // lager og plasserer input inn i celle-element 
            var cell = document.createElement("td");
            cell.appendChild(input); // plasserer input-felt inn i cellen 
            
            row.appendChild(cell); // putter cellen inn i rader
            cells.push(input); // putter cellen inn i celler-arrayet
        }
        document.getElementsByTagName('body')[0].appendChild(row); // plaserer raden inn i tabell
    }
}

// funksjon som returnerer square nummer
function square_number(row, column) {
    if (row < 3 && column < 3) { return 0; }
    if (row > 2 && row < 6 && column < 3) { return 1; }
    if (row > 5 && column < 3) { return 2; }
    if (row < 3 && column > 2 && column < 6) { return 3; }
    if (row > 2 && row < 6 && column > 2 && column < 6) { return 4; }
    if (row > 5 && column > 2 && column < 6) { return 5; }
    if (row < 3 && column > 5) { return 6; }
    if (row > 2 && row < 6 && column > 5) { return 7; }
    if (row > 5 && column > 5) { return 8; }
}

// funksjon som sjekker om verdi til celle er gyldig
function valid_check(cell, value) { 
    // går gjennom alle cellene i arrayet og bruker sudoku-regler for sjekk
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].row == cell.row && cells[i].value == value) {
            return false;
        } else if (cells[i].column == cell.column && cells[i].value == value){
            return false;
        } else if (cells[i].square == cell.square && cells[i].value == value) {
            return false;
        } 
    }
    return true;
}

function solve_sudoku(random_row) {
	var numbers = [1,2,3,4,5,6,7,8,9];
	var i = 0; // cell index
	var n = 0; // nummer-array index
	var m = 1; // brukes for å vite om man skal fram eller bak

	var nums = [1,2,3,4,5,6,7,8,9]; // g=1

	while (true) {
		if (i < 9 && random_row) { // gjør første rad tilfeldig dersom g == 1
			var random_value = nums[Math.floor(Math.random()*nums.length)];
			nums.splice(nums.indexOf(random_value),1); // fjerner verdi fra mulige
			cells[i].value = random_value; // angir verdi
			i++; // går videre til neste cell
		} else if (cells[i].a == 1) {
			if (valid_check(cells[i], numbers[n])) {
				cells[i].value = numbers[n];
				i++;    // neste celle
				n = 0;  // nullstiller number-array index
				m = 1;  // retning: fremover
			} else {
				if (n == 8) {
					//cells[i].value = 0; // vet ikke
					i--;    // forrige celle
					m = 0;  // retning: bakover
					if (cells[i].value == 9) { i--; }
					n = cells[i].value;
				} else {
					n++; // test neste verdi av tall
				}
			}
		} else { // beveger fram/bak med hensyn på m
			if (m) { i++; }
            else { i--; }
		}
		if (i == 16) { break; } // stopper loop når alle celler er gått gjennom
        console.log(i);
	}
}

// generer sudoku, setter alle celler.a = 1 slik at alle blir laget
function generate_sudoku() {
	for (cell of cells) { cell.a = 1; }

	solve_sudoku(true); // sudokuen blir laget med tilfeldig første rad

	for (cell of cells) { // gjør tilfeldige celler blank
		if (Math.floor((Math.random() * 5)) == 0) { cell.value = ""; } 
	}
	
	for (cell of cells) { // låser celler med verdi
		if (cell.value > 0) { cell.a = 0; }
	}
}

function load_sudoku() {
	var i = 0;
	var sudoku = import_puzzle();
	for (var c = 0; c < 9; c++) {
		for (var r = 0; r < 9; r++) {
			if (sudoku[c][r] != 0) {
				cells[i].value = sudoku[c][r];
			} else {
				cells[i].a = 1; // låser opp celler uten verdi
			}
			i++;
		}
	}
}

function clear_gui() {
	for (cell of cells) {
		cell.value = "";    // fjerner verdi
		cell.a = 0;         // låser alle celler (default) 
	}
}

sudoku_GUI();
