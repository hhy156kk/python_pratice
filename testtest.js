var form = document.getElementById("myForm");


var EventUtil = {
	addHandler : function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false)
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler
		}
	}

	getEvent : function(event){
		return event ? event:window.event;
	}

	getTarget:function(event){
		return event.target || event.srcElement;
	}

	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	}

	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		}else{
			element["on"+type] = null;
		}
	}

	stopPropagation :function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble= true;
		}
	}
}


var firstForm = document.forms[0];
var myForm = document.forms["form2"];


<input type = "submit" value = "submit Form">
<button type = "submit">submit Form</button>

var form = document.getElementById("myForm");
EventUtil.addHandler(form,"submit",function(event){
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
})


<input type="reset" value="reset Form">
<button type="reset">reset form</button>

var form = document.getElementById("myForm");
EventUtil.addHandler(form,"reset",function(event){
	event.EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
});

var form = document.getElementById("form1");
var field = form.elements[0];
var field2 = form.elements["textbox1"];
var fieldcount = form.elements.length;

var form = document.getElementById("myForm");
var colorFields = form.elements["color"];
alert(colorFields.length);

var firstColorField = colorFields[0];
var firstFormField = form.elements[0];
alert(firstColorField == firstFormField);

var form = document.getElementById("myForm");
var field = form.elements[0];

field.value = "Another value";
alert(field.form == form);

field.focus();
field.disabled = true;
field.type = "checkbox";

EventUtil.addHandler(form,"submit",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	var btn = target.elements["submit-btn"];
	btn.disabled = true;
});


EventUtil.addHandler(window,"load",function(event){
	document.form[0].elements[0].focus();
});

EventUtil.addHandler(window,"load",function(event){
	var element = document.forms[0].elements[0];
	if(elements.autofocus !== true){
		element.focus();
		console.log("Js focus");
	}
})

document.forms[0],elements[0].blur();

var textbox = document.forms[0].elements[0];

EventUtil.addHandler(textbox,"focus",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(target.style.backgroundColor != "red"){
		target.style.backgroundColor ="yellow";
	}
});

EventUtil.addHandler(textbox,"blur",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(/[^\d]/.test(target.value)){
		target.style.backgroundColor = "red";
	}else{
		target.style.backgroundColor = "";
	}
});

EventUtil.addHandler(textbox,"change",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	if(/[^\d]/).test(target.value)){
		target.backgroundColor = "red";
	}else{
		target.backgroundColor = "";
	}
});

var textbox = document.forms[0].elements["textbox1"]
textbox.select();

EventUtil.addHandler(textbox,"focus",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);

	target.select();
});

var textbox = document.forms[0].elements["textbox1"];
EventUtil.addHandler(textbox,"select",function(event){
	var alert("Text selected" + textbox.value);
});

function getSelectedText(textbox){
	if(typeof textbox.selectionStart == "number"){
		return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
	}else if(document.selection){
		return document.selection.createRange().text;
	}
}

textbox.value = "Hello world";

textbox.setSelectionRange(0,textbox.value.length);
textbox.setSelectionRange(0,3);
textbox.setSelectionRange(4,7);

textbox.value = "Hello world";
var range = textbox.createTextRange();

range.collapse(true);
range.moveStart("character",0);
range.moveEnd("character",textbox.value.length);
range.select();

range.collapse(true);
range.moveStart("character",0);
range.moveEnd("character",3);
range.select();

function selectText(textbox,startIndex,stopIndex){
	if(textbox.setSelectionRange){
		textbox.setSelectionRange(startIndex,stopIndex);
	}else if(textbox.createRange){
		var range = textbox.createTextRange();
		range.collapse(true);
		range.moveStart("character",startIndex);
		range.moveEnd("character",stopIndex - startIndex);
		range.select();
	}
	textbox.focus();
}

EventUtil.addHandler(textbox,"keypress",function(event){
	event = EventUtil.getEvent(event);
	EventUtil.preventDefault(event);
});

EventUtil.addHandler(textbox,"keypress",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	var charCode = EventUtil.getCharCode(event);

	if(!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey){
		EventUtil.preventDefault(event);
	}
});

var supportsDOM2CSS = document.implementation.hasFeature("CSS","2.0");

var myDiv = document.getElementById("myDiv");
myDiv.style.backgroundColor = "red";