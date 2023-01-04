// This global variable tracks the active number of players in the form
var numberOfPlayers = 3;
// This function removes the input for a player
function removePlayer() {
    // There is required to always be at least one player
    if (numberOfPlayers > 1) {
        // Select all elements 
        const fieldset = document.getElementById(('player' + (numberOfPlayers) + 'Fieldset'));
        // Remove the element
        fieldset.remove();
        // Changes the global variable to reflect one less player
        numberOfPlayers--;
        getValues()
    };
};
// This function adds input for a player
function addPlayer() {
    // This finds the form the fieldset will be inserted into, and the fieldset it will be inserted before
    const pageForm = document.getElementById('playersForm');
    const endFieldset = document.getElementById('playersFieldset');
    // The number of players is incremented to reflect an added player
    numberOfPlayers++;
    // A new fieldset is added and the properties added
    const newFieldset = document.createElement('fieldset');
    newFieldset.setAttribute('id', 'player' + (numberOfPlayers) + 'Fieldset');
    // A legend and text are created, and attributes added
    const newLegend = document.createElement('legend');
    const newLegendText = document.createTextNode("Player " + numberOfPlayers + " cost (£)");
    newLegend.setAttribute('id', 'player' + (numberOfPlayers) + 'Legend');
    // The text is appended to the Legend
    newLegend.appendChild(newLegendText);
    newFieldset.appendChild(newLegend);
    // A new input is created and attributes set
    const newInput = document.createElement('input');
    newInput.setAttribute('id', 'player' + (numberOfPlayers));
    newInput.setAttribute('class', 'cost');
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('oninput', 'getValues()');
    // The input is appended to the fieldset
    newFieldset.appendChild(newInput);
    // The fieldset is added to the form before the endFieldset
    pageForm.insertBefore(newFieldset, endFieldset);
    getValues()
};

function getValues() {
    // Array is filled with player salaries
    var players = [];
    // Number of players to expect from the site, can be any positive numeric value

    // loops through all the elements and fills reads it into the array
    for (let i = 0; i < numberOfPlayers; i++) {
        players[i] = parseInt(document.getElementById(("player" + (i + 1))).value);
    }
    // Puts the array into a cost function
    var playerTotal = calcTotalCost(players);
    document.getElementById("playerTotal").value = playerTotal;
    var taxFloor = parseInt(document.getElementById("taxFloor").value);
    var taxRate = parseInt(document.getElementById("taxRate").value) / 100;
    var taxCost = calcTaxCost(playerTotal, taxFloor, taxRate);
    document.getElementById("taxCost").value = taxCost;
};
// Calculates the cost of all the players
function calcTotalCost(players) {
    // Starts with a 0 valued variable
    var playerTotal = 0;
    // For loop over all the players
    for (let i = 0; i < players.length; i++) {
        // Check the array element is a number above 0, else does not count it 
        if (typeof players[i] == "number" && players[i] > 0) {
            // If it is valid, add it to the running total
            playerTotal += players[i];
            document.getElementById("player" + (i + 1) + 'Fieldset').setAttribute('class', 'valid')
        } else {
            document.getElementById("player" + (i + 1) + 'Fieldset').setAttribute('class', 'invalid')
        };
    };
    // return the running total
    return playerTotal;
};

function calcTaxCost(playerTotal, taxFloor, taxRate) {
    // Check the values are all numbers
    if (typeof playerTotal !== "number" && typeof taxFloor !== "number" && typeof taxRate !== "number") {
        // Return 0 if they are not all numbers
        return 0;
    };
    // Check the tax is above the floor
    if (taxFloor > playerTotal) {
        // Return 0 if the value is below the tax
        return 0;
    };
    // Return the value - the floor multiplied by the tax rate
    return (playerTotal - taxFloor) * taxRate;
};