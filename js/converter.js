/*jslint node: true, browser: true */
"use strict";

/*Initialisation function on load */
function retrieve() {
	var logHome,logDest;
	if ((localStorage.getItem('com.craig-morrison.converter.savHomeCurr') !==undefined) && (localStorage.getItem('com.craig-morrison.converter.savHomeCurr') !==null)){
	document.getElementById('homeCurr').value = localStorage.getItem('com.craig-morrison.converter.savHomeCurr');
	logHome = localStorage.getItem('com.craig-morrison.converter.savHomeCurr');
	}
	if ((localStorage.getItem('com.craig-morrison.converter.savDestCurr') !==undefined) && (localStorage.getItem('com.craig-morrison.converter.savDestCurr') !==null)){
	document.getElementById('destCurr').value = localStorage.getItem('com.craig-morrison.converter.savDestCurr');
	logDest = localStorage.getItem('savDestCurr');
	}
	if ((localStorage.getItem('com.craig-morrison.converter.savBankCut') !==undefined) && (localStorage.getItem('com.craig-morrison.converter.savBankCut') !==null)){
	document.getElementById('bankCut').value = localStorage.getItem('com.craig-morrison.converter.savBankCut');
	logDest = localStorage.getItem('com.craig-morrison.converter.savBankCut');
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
    if (document.getElementById("conVal").textContent === '0') {
        outbar.textContent = no;
    } else {
        outbar.textContent = outbar.textContent + no;
    }
}

function equals() {
    var total, rate, conversionTotal, rateClass = new rates();

    var homeCurr = document.getElementById('homeCurr').value;
    var awayCurr = document.getElementById('destCurr').value;
    var cut = document.getElementById('bankCut').value;
    total = parseFloat(document.getElementById("conVal").textContent);

    if (homeCurr === "EUR") {
        rate = rateClass.getRate(awayCurr);
    } else if (awayCurr === "EUR") {
        rate = 1 / rateClass.getRate(homeCurr);
    } else {
        rate = (1 / rateClass.getRate(homeCurr)) * rateClass.getRate(awayCurr);
    }

	total = total * rate;

    conversionTotal = conversionFee(total); //cut
    document.getElementById("conVal").textContent = parseInt(conversionTotal);
    document.getElementById('conCurr').textContent = document.getElementById('destCurr').value;
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

/* Update local storage (and display for homecurr)*/

function updateHomeCurr(curr) {
     document.getElementById('conCurr').textContent = curr;
     localStorage.setItem('com.craig-morrison.converter.savHomeCurr', curr);

}

function updateDestCurr(curr) {
     localStorage.setItem('com.craig-morrison.converter.savDestCurr', curr);
}

function updateBankCut() {
	var cut = document.getElementById('bankCut').value;
	 localStorage.setItem('com.craig-morrison.converter.savBankCut', cut);
}