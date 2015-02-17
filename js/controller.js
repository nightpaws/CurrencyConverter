/*jslint node: true, browser: true */
/*global My317Model */
/*global My317View */

"use strict";

function My317Controller() {
    var my317Model = new My317Model(),
        my317View = new My317View();

    this.init = function () {
        my317Model.init();
        my317View.init();
    };
}

var my317Controller = new My317Controller();

window.addEventListener("load", my317Controller.init, false);