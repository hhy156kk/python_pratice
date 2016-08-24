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

function FleftIn(input){
	
		var divElement = document.createElement("div");
		var text = document.createTextNode(input.toString());
		divElement.appendChild(text);
		var container = document.getElementById("container");
		var target = container.getElementsByTagName("div")[0];
		container.insertBefore(divElement,target);
}
window.onload = function(){
	var leftIn = document.getElementById("left-in");
	addEvent(leftIn,"click",function(){
		var input = document.getElementById("input-queue").value;
		if(/^[0-9]+$/.test(input)){
			FleftIn(input)
		}
	});

}