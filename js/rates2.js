/*jslint node: true, browser: true */
"use strict";

function rates() {
    // Initialise the Ajax request variables.
    var date,updateTime,rateMap = {};

 function getXmlHttpRequestCheck() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if(window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            alert("You need to update your browser! D:");
        }
    }

    /*Check for stored currency list from previously*/
    if (localStorage.getItem("com.craig-morrison.converter.curs")) {
        var ratesAsMap = localStorage.getItem("com.craig-morrison.converter.curs");
        rateMap = JSON.parse(ratesAsMap); //for storage as string
    }

    /* Retrieve update time from storage */
    if (localStorage.getItem("com.craig-morrison.converter.updateTime")) {
        var lastUpdateString = localStorage.getItem("com.craig-morrison.converter.updateTime");
        updateTime = parseFloat(lastUpdateString);
    }else{ updateTime = 0; //to prevent crashing due to later checks
    }

    this.getRate = function(no){
        return rateMap[no];
    }


    if(updateTime + (24*60*60*1000) < Date.now()){
	//if last updated time value is less than current date value
        
        /*Browser check*/
    	var ajax = getXmlHttpRequestCheck();

        
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
                rateMap = {};
                
                /*Loop through the XMLDoc */
                for(var i = 0; i < cubes.length; i++){
                    var exchange = cubes[i];
                    var cur = exchange.getAttribute("currency");
                    var rate = exchange.getAttribute("rate");
                    rateMap[cur] = parseFloat(rate);
                }

				/*Store result in JSON */
                var CurrMap = JSON.stringify(rateMap);
                localStorage.setItem("com.craig-morrison.converter.curs", CurrMap);
 			}
        }

        ajax.open("GET", "https://devweb2014.cis.strath.ac.uk/~aes02112/ecbxml.php", 
                    true);
        ajax.send();

    }
}