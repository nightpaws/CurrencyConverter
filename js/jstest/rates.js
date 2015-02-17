/*jslint node: true, browser: true */ //liberated
"use strict";

function rates(controller) {

    var date,
        ratesMap = {}; // a map, isn't JS wonderful.

    if(localStorage.getItem("com.nightpaws.rates.curs")){
        var ratesMapString = localStorage.getItem("com.nightpaws.rates.curs");
        ratesMap = JSON.parse(ratesMapString);
    }

    this.getAvailableCurrencies = function() {

        var returnVals = new Array();

        var key;
        for (key in ratesMap) {
            returnVals.push(key);
        }
        
        return returnVals;
    }

    this.getRate = function(currency){
        return ratesMap[currency];
    }

    function getXmlHttpRequestObject() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            alert("Your Browser Sucks!\nIt's about time to upgrade don't you think?");
        }
    }

    //Our XmlHttpRequest object to get the auto suggest
    var ajax = getXmlHttpRequestObject();

    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status==200){
            var XMLDoc = ajax.responseXML;
            var rootCube = XMLDoc.getElementsByTagName("Cube")[0];
            var time = rootCube.getElementsByTagName("Cube")[0];
            date = time.getAttribute("time");
            var cubes = time.getElementsByTagName("Cube");

            ratesMap = {};

            for(var i = 0; i < cubes.length; i++){
                var exchange = cubes[i];
                var cur = exchange.getAttribute("currency");
                var rate = exchange.getAttribute("rate");


                ratesMap[cur] = parseFloat(rate);
            }

            var ratesMapJSON = JSON.stringify(ratesMap);
            localStorage.setItem("com.nightpaws.rates.curs", ratesMapJSON);

            controller.displayFromCurrencies();
            controller.displayToCurrencies();
        }
    }

    ajax.open("GET", "https://devweb2014.cis.strath.ac.uk/~aes02112/ecbxml.php", 
                true);
    ajax.send();
}