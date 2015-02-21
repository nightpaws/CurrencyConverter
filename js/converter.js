/*jslint node: true, browser: true */
"use strict";

/*Converter 'memory' for holding user Input+ output*/
var outbar;
outbar = document.getElementById("conVal");

/* button functions from On Screen Keypad */
function clearOutputScreen() {
    document.getElementById("conVal").textContent = '0';
    updateHomeCurr(document.getElementById('homeCurr').value);
}

function addToScreen(no){
    if (isNaN(document.getElementById("conVal").textContent)) {
        clearOutputScreen();
    }
    if (document.getElementById("conVal").textContent == '0') {
        outbar.textContent = no;
    } else {
        outbar.textContent = outbar.textContent + no;
    }
}


function equals() {
    var total, rate;
    rate = rateLookup();
    total = parseFloat(document.getElementById("conVal").textContent);
    total = total * rate;
    document.getElementById("conVal").textContent = parseInt(total);
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
function conversionFee() {
    var total;
    total = document.getElementById("conVal").textContent;
    total = total * 0.94;
    document.getElementById("conVal").textContent = total;
}

function updateHomeCurr(curr){
     document.getElementById('conCurr').textContent = curr;

}