var pascalsTriangle = [
    [null],
    [null, null],
    [null, null, null],
    [null, null, null, null],
    [null, null, null, null, null]
];

function displayTriangle() {
    var triangleDiv = document.getElementById('triangle');
    triangleDiv.innerHTML = '';

    for (var i = 0; i < pascalsTriangle.length; i++) {
        var rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (var j = 0; j < pascalsTriangle[i].length; j++) {
            var numberDiv = document.createElement('div');
            numberDiv.className = 'number';
            if (pascalsTriangle[i][j] !== null) {
                numberDiv.textContent = pascalsTriangle[i][j];
            }
            numberDiv.dataset.row = i;
            numberDiv.dataset.column = j;
            numberDiv.addEventListener('dragstart', dragStart);
            numberDiv.addEventListener('dragover', allowDrop);
            numberDiv.addEventListener('drop', drop);
            rowDiv.appendChild(numberDiv);
        }

        triangleDiv.appendChild(rowDiv);
    }
}



function createOptions(options) {
    var optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    for (var i = 0; i < options.length; i++) {
        var optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = options[i];
        optionDiv.draggable = true;
        optionDiv.addEventListener('dragstart', dragStart);
        optionsDiv.appendChild(optionDiv);
    }
}


function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.effectAllowed = 'move';
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var number = event.dataTransfer.getData('text/plain');
    var row = parseInt(event.target.dataset.row);
    var column = parseInt(event.target.dataset.column);

    var expectedValue = calculateExpectedValue(row, column);

    if (parseInt(number) !== expectedValue) {
        // Blink red if the entered value is incorrect
        event.target.style.animation = 'blink-red 1s';
        setTimeout(function() {
            event.target.style.animation = '';
        }, 1000);
    } else {
        event.target.textContent = number;
        pascalsTriangle[row][column] = parseInt(number);
        checkTriangleComplete();

        // Blink green if the entered value is correct
        event.target.style.animation = 'blink-green 1s';
        setTimeout(function() {
            event.target.style.animation = '';
        }, 1000);
    }
}



function calculateExpectedValue(row, column) {
    if (column === 0 || column === row) {
        return 1;
    } else {
        var left = pascalsTriangle[row - 1][column - 1];
        var right = pascalsTriangle[row - 1][column];
        return left + right;
    }
}


function checkTriangleComplete() {
    var complete = true;

    for (var i = 0; i < pascalsTriangle.length; i++) {
        for (var j = 0; j < pascalsTriangle[i].length; j++) {
            if (pascalsTriangle[i][j] === null) {
                complete = false;
                break;
            }
        }
        if (!complete) {
            break;
        }
    }

    if (complete && validatePascalsTriangle(pascalsTriangle)) {
        alert('Pascal\'s Triangle Complete!');
    } else if (complete && !validatePascalsTriangle(pascalsTriangle)) {
        alert('Entered values do not form a valid Pascal\'s Triangle.');
    }
}





function validatePascalsTriangle(triangle) {
    for (var i = 2; i < triangle.length; i++) {
        for (var j = 1; j < triangle[i].length - 1; j++) {
            var left = triangle[i - 1][j - 1];
            var right = triangle[i - 1][j];
            var expectedValue = left + right;

            if (triangle[i][j] !== expectedValue) {
                return false;
            }
        }
    }

    return true;
}

displayTriangle();
createOptions([1, 2, 3, 4, 5, 6]);
