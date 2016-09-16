
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

function leftPush(num){
    var divElement = document.createElement("div");
    var text = document.createTextNode(num.toString());
    divElement.appendChild(text);
    var container = document.getElementById("container");
    var target = container.getElementsByTagName("div")[0];
    container.insertBefore(divElement,target);
}


window.onload = function() {
    var buttonList = document.getElementsByTagName("input");
  
    addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            leftPush(input);
        }
    });
    
}