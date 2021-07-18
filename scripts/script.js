const grey_overlay = document.getElementById('grey-overlay');
const hamburger = document.getElementById('hamburger');
const mobile_exit = document.getElementById('mobile-exit');
const mobile_menu = document.getElementById('mobile-menu');
const estimate_window = document.getElementById('estimate-window');
const estimate_value = document.getElementById('estimation-value');
const contact_us = document.getElementById('contact-us');

const c_type_button = document.getElementsByClassName('type-button');
const c_level_button = document.getElementsByClassName('level-button');
const c_quote_cta = document.getElementsByClassName('get-quote-cta');
const c_timeline_items = document.getElementsByClassName('item');

var priceA = 150;
var priceB = 30;
var priceTotal = 0;

var isTimelineFixed = false;

//estimate window listeners for classes
for (var i = 0; i < c_type_button.length; i++) {
    c_type_button[i].addEventListener('click', selectType, false);
}

for (var i = 0; i < c_level_button.length; i++) {
    c_level_button[i].addEventListener('click', selectLevel, false);
}

//get quote CTA listeners
for (var i = 0; i < c_quote_cta.length; i++) {
    c_quote_cta[i].addEventListener('click', ()=>{
        hideMenu();
        showEstimate();
        
    }, false);
}
//----------------------------------
//button listeners
hamburger.addEventListener('click', showMenu);
mobile_exit.addEventListener('click', hideMenu);

grey_overlay.addEventListener('click', ()=>{
    hideMenu();
    hideEstimate();
});

contact_us.addEventListener('click', hideEstimate);


//play on load
updateEstimatedPrice();
whenResized();


//timeline stylize
window.onresize = whenResized;

function whenResized() {
    if ((window.innerWidth >= 768) && (!isTimelineFixed)) {
        for(var i=0; i<c_timeline_items.length; i++) {
            if (i%2==0) {
                c_timeline_items[i].classList.remove('right');
                c_timeline_items[i].classList.add('left');
            }
        }
        isTimelineFixed = true;
    }
    else if (window.innerWidth < 768 && isTimelineFixed) {
        for(var i=0; i<c_timeline_items.length; i++) {
            if (i%2==0) {
                c_timeline_items[i].classList.remove('left');
                c_timeline_items[i].classList.add('right');
            }
        }
        
        isTimelineFixed = false;
    }


}

//functions

function updateEstimatedPrice() {
    priceTotal = priceA + priceB;
    estimate_value.innerHTML = "$" + priceTotal;
}

function selectLevel() {
    //clear all other buttons
    for(var i=0; i < c_level_button.length; i++) {
        c_level_button[i].classList.remove("selected");
    }
    //apply selected class to clicked item
    this.classList.add("selected");
    //update price A
    priceB = parseInt(this.getAttribute('data-cost'), 10);
    updateEstimatedPrice();
}

function selectType() {
    //clear all other buttons
    for(var i=0; i < c_type_button.length; i++) {
        c_type_button[i].classList.remove("selected");
    }
    //apply selected class to clicked item
    this.classList.add("selected");
    //update price A
    priceA = parseInt(this.getAttribute('data-cost'), 10);
    updateEstimatedPrice();
}

function hideMenu() {
    mobile_menu.style.width = '0em';
    hideOverlay();
}

function showMenu() {
    mobile_menu.style.width = '12em';
    showOverlay();
}

function showOverlay() {
    grey_overlay.style.visibility = "visible";
    grey_overlay.style.opacity = "1";
}

function hideOverlay() {
    grey_overlay.style.visibility = "hidden";
    grey_overlay.style.opacity = "0";
}

function showEstimate() {
    estimate_window.style.height = "30em";
    showOverlay();
}

function hideEstimate() {
    estimate_window.style.height = "0";
    hideOverlay();
}

