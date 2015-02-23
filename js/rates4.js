/*jslint node: true, browser: true */
"use strict";

function rates() {
    // Initialise the Ajax request variables.
    var date,ratesMap = {},updateTime;


    /*Check for stored currency list from previously*/
    if (localStorage.getItem("com.craig-morrison.converter.currList")) {
        var ratesAsMap = localStorage.getItem("com.craig-morrison.converter.currList");
        ratesMap = JSON.parse(ratesAsMap);
    }

    /* Retrieve update time from storage */
    if (localStorage.getItem("com.craig-morrison.converter.updateTime")) {
        var lastUpdateString = localStorage.getItem("com.craig-morrison.converter.updateTime");
        updateTime = parseFloat(lastUpdateString);
    } else {
        updateTime = 0;  //to prevent crashing due to later checks
    }

   //  this.getAvailableCurrencies = function() {
// 
//         var returnVals = new Array();
// 
//         for (var key in ratesMap) {
//             returnVals.push(key);
//         }
// 
//         return returnVals;
//     }

    this.getRate = function(no){
        return ratesMap[no];
    }

/*Browser Check */
    function getXmlHttpRequestObject() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            alert("You need to update your browser!");
            //hopefully will never happen
        }
    }


    if(updateTime + (24*60*60*1000) < Date.now()){
	//if last updated time value is less than current date value

//         console.log("update");

        //Our XmlHttpRequest object to get the auto suggest
        var ajax = getXmlHttpRequestObject();

        ajax.onreadystatechange=function(){
            if(ajax.readyState==4 && ajax.status==200){

                updateTime = Date.now();
                if(localStorage){
                    localStorage.setItem("com.craig-morrison.converter.updateTime", updateTime);
                }

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
                localStorage.setItem("com.craig-morrison.converter.currList", ratesMapJSON);

                // controller.displayFromCurrencies();
//                 controller.displayToCurrencies();
            }
        }

        ajax.open("GET", "https://devweb2014.cis.strath.ac.uk/~aes02112/ecbxml.php", 
                    true);
        ajax.send();

    }
}