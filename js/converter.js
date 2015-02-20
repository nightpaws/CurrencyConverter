/*jslint node: true, browser: true */
"use strict";

/*Converter 'memory' for holding user Input+ output*/
var outbar = document.getElementById("conVal");


/* button functions from On Screen Keypad */
function clearOutputScreen() {
    document.getElementById("conVal").textContent = '0';
}

function addToScreen(no) {
    if (document.getElementById("conVal").textContent == '0') {
        outbar.textContent = no;
    } else {
        outbar.textContent = outbar.textContent + no;
    }
}

function equals() {
    var rate = rateLookup();
    var total = parseFloat(document.getElementById("conVal").textContent);
    total = total * rate;
    document.getElementById("conVal").textContent = total;
}

/*Helper Functions for equals */

/*Obtain rates from server or hard coded if not ready*/

function rateLookup() {
    var rate;
    switch (document.getElementById('homeCurr').value) {
        case "EUR":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.8;
                    break;
                case "EUR":
                    rate = 1.34;
                    break;
                case "USD":
                    rate = 1.53;
                    break;
                case "JPY":
                    rate = 182.96;
                    break;
                default:
                    rate = 1;
                    break;
            }
            break;
        case "EUR":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.74;
                    break;
                case "EUR":
                    rate = 1;
                    break;
                case "USD":
                    rate = 1.14;
                    break;
                case "JPY":
                    rate = 136.04;
                    break;
            }
            break;
        case "USD":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.65;
                    break;
                case "EUR":
                    rate = 0.88;
                    break;
                case "USD":
                    rate = 1;
                    break;
                case "JPY":
                    rate = 119.22;
                    break;
            }
            break;
        case "JPY":
            switch (document.getElementById('destCurr').value) {
                case "GBP":
                    rate = 0.0055;
                    break;
                case "EUR":
                    rate = 0.0074;
                    break;
                case "USD":
                    rate = 0.01;
                    break;
                case "JPY":
                    rate = 1;
                    break;
            }
            break;
        default:
            rate = 2;
    }
    return parseFloat(rate);
}


/*Apply a conversion fee to the transaction */
function conversionFee() {
    var total = document.getElementById("conVal").textContent;
    total = total * 0.94;
    document.getElementById("conVal").textContent = total;
}