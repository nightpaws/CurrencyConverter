/*jslint node: true, browser: true */
"use strict";

/*Initialisation function on load */
function retrieve() {
	var logHome,logDest;
	if ((localStorage.getItem('savHomeCurr') !==undefined) && (localStorage.getItem('savHomeCurr') !==null)){
	document.getElementById('homeCurr').value = localStorage.getItem('savHomeCurr');
	logHome = localStorage.getItem('savHomeCurr');
	}
	if ((localStorage.getItem('savDestCurr') !==undefined) && (localStorage.getItem('savDestCurr') !==null)){
	document.getElementById('destCurr').value = localStorage.getItem('savDestCurr');
	logDest = localStorage.getItem('savDestCurr');
	}
	if ((localStorage.getItem('savBankCut') !==undefined) && (localStorage.getItem('savBankCut') !==null)){
	document.getElementById('bankCut').value = localStorage.getItem('savBankCut');
	logDest = localStorage.getItem('savBankCut');
	}
	
	clearOutputScreen();
	
	console.log('typeof logHome: ' + typeof logHome);
	console.log('Value of logHome: ' + logHome);
	console.log('typeof logDest: ' + typeof logDest);
	console.log('Value of logDest: ' + logDest);
	console.log('typeof bankCut: ' + typeof bankCut);
	console.log('Value of bankCut: ' + bankCut);
}

/*Converter 'memory' for holding user Input+ output*/
var outbar;
outbar = document.getElementById("conVal");



/* button functions from On Screen Keypad */
function clearOutputScreen() {
    document.getElementById("conVal").textContent = '0';
    updateHomeCurr(document.getElementById('homeCurr').value);
    updateDestCurr(document.getElementById('destCurr').value);
//     updateBankCut(document.getElementById('bankCut').value);
}

function addToScreen(no){
 if (document.getElementById("homeCurr").value !== document.getElementById("conCurr").textContent){
clearOutputScreen();
}
    if (document.getElementById("conVal").textContent == '0') {
        outbar.textContent = no;
    } else {
        outbar.textContent = outbar.textContent + no;
    }
}


function equals() {
    var total, rate, conversionTotal;
    rate = rateLookup();
    total = parseFloat(document.getElementById("conVal").textContent);
    total = total * rate;
    conversionTotal = conversionFee(total);
    document.getElementById("conVal").textContent = parseInt(conversionTotal);
    document.getElementById('conCurr').textContent = document.getElementById('destCurr').value;
}

/*Helper Functions for equals */

/*Obtain rates from server or hard coded if not ready*/

function rateLookup() {
    var rate;

    /*Nested Case to handle both selection boxes */
    switch (document.getElementById('homeCurr').value) {
        case "EUR":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.5;
                    break;
                case "USD":
                    rate = 1.64;
                    break;
                case "EUR":
                    rate = 1.0;
                    break;
                case "JPY":
                    rate = 193.99;
                    break;
                default:
                    rate = 1;
                    break;
            }
            break;
        case "GBP":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 1.0;
                    break;
                case "USD":
                    rate = 1.10;
                    break;
                case "EUR":
                    rate = 1.50;
                    break;
                case "JPY":
                    rate = 134.20;
                    break;
                default:
                    rate = 1;
                    break;
            }
            break;
        case "USD":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.6;
                    break;
                case "USD":
                    rate = 1;
                    break;
                case "EUR":
                    rate = 0.65;
                    break;
                case "JPY":
                    rate = 110.22;
                    break;
                default:
                    rate = 1;
                    break;
            }
            break;
        case "JPY":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.0045;
                    break;
                case "USD":
                    rate = 0.02;
                    break;
                case "EUR":
                    rate = 0.0070;
                    break;
                case "JPY":
                    rate = 1;
                    break;
                default:
                    rate = 1;
                    break;
            }
            break;
        default:
            rate = 1;
    }
    return parseFloat(rate);
}


/*Apply a conversion fee to the transaction */
function conversionFee(total) {
    var cut;
    var finaltot;
    cut = document.getElementById('bankCut').value;
    if (cut!=='0'){
    finaltot = (parseFloat(total)/100) * (100-parseFloat(cut));
    }
    else{
    finaltot = total;
    }
//     document.getElementById("conVal").textContent = finaltot;
    return finaltot;
}

function updateHomeCurr(curr) {
     document.getElementById('conCurr').textContent = curr;
     localStorage.setItem('savHomeCurr', curr);

}

function updateDestCurr(curr) {
     localStorage.setItem('savDestCurr', curr);
}

function updateBankCut() {
	var cut = document.getElementById('bankCut').value;
	 localStorage.setItem('savBankCut', cut);
}