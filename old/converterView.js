/*jslint node: true, browser: true */

"use strict";

/* 
 * The My317View handles the side menu and the about box within the view
 * It also handles callback registration for other menu items which the 
 * controller then decides how to action.
 */

function My317View() {
    var openNav = true,
            addMouseAndTouchUp = function(elementID, handler) {
                //utility function to add both mouseup and touchend events and prevent double events
                var element = document.getElementById(elementID),
                        f = function(e) {
                            e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                            handler(e);
                            return false;
                        };
                if (element !== null) {
                    element.addEventListener("mouseup", f, false);
                    element.addEventListener("touchend", f, false);
                }
            },
            openCloseNav = function() {
                //doggle the side menu reveal
                if (openNav) {
                    openNav = false;
                    document.getElementById("nav").className = "closedmenu";
                    document.getElementById("mainsection").className = "closedmenu";
                    document.getElementById("navelem").style.display = "none";
                } else {
                    openNav = true;
                    document.getElementById("nav").className = "";
                    document.getElementById("mainsection").className = "";
                    document.getElementById("navelem").style.display = "block";
                }
            },
            showAbout = function() {
                //handle showing about box purely within the view as their's no model involved
                document.getElementById("popupAbout").style.display = "block";
                history.pushState(null, null, "#about");
            },
            hideAbout = function() {
                //handle hiding about box purely within the view
                document.getElementById("popupAbout").style.display = "none";
                if (openNav) {
                    openCloseNav();
                }
            },
            showConvFrom = function() {
                //handle showing about box purely within the view as their's no model involved
                document.getElementById("popupConvFrom").style.display = "block";
                history.pushState(null, null, "#ConvFrom");
            },
            hideConvFrom = function() {
                //handle hiding about box purely within the view
                document.getElementById("popupConvFrom").style.display = "none";
                if (openNav) {
                    openCloseNav();
                }
            },
            showConvTo = function() {
                //handle showing about box purely within the view as their's no model involved
                document.getElementById("popupConvTo").style.display = "block";
                history.pushState(null, null, "#ConvTo");
            },
            hideConvTo = function() {
                //handle hiding about box purely within the view
                document.getElementById("popupConvTo").style.display = "none";
                if (openNav) {
                    openCloseNav();
                }
            };

    this.init = function() {
        openCloseNav();
        addMouseAndTouchUp("navmenu", openCloseNav);
        addMouseAndTouchUp("navMenuAbout", showAbout);
        addMouseAndTouchUp("navMenuConvFrom", showConvFrom);
        addMouseAndTouchUp("navMenuConvTo", showConvTo);

        //handle closing of about window using history 
        //so that back buttons work (esp important on Android for hard back key
        addMouseAndTouchUp("popupAbout", function() {
            window.history.back();
        });
        addMouseAndTouchUp("popupConvFrom", function() {
            window.history.back();
        });
        addMouseAndTouchUp("popupConvTo", function() {
            window.history.back();
        });

        window.addEventListener("popstate", function() {
            hideAbout();
            hideConvFrom();
            hideConvTo();
        });
    };
}