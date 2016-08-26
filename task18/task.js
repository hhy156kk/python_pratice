(function(){
	
	var buttonLeftIn = document.getElementById("left-in");
	buttonLeftIn.addEventListener("click",function(){
		var input = document.getElementById("input-queue").value;
		if(/^[0-9]+$/.test(input)){
			var divElement = document.createElement("div");
			var text = document.createTextNode(input.toString());
			divElement.appendChild(text);

			var container = document.getElementById("container");
			var target = container.getElementsByTagName("div")[0];
			container.insertBefore(divElement,target);
		}

	},false);

	var buttonRightIn = document.getElementById("right-in");
	buttonRightIn.addEventListener("click",function(){
		var input = document.getElementById("input-queue").value;
		if(/^[0-9]+$/.test(input)){
			var divElement = document.createElement("div");
			var text = document.createTextNode(input.toString());
			divElement.appendChild(text);

			var container = document.getElementById("container");
			container.appendChild(divElement);
		}

	},false);

	var buttonLeftOut = document.getElementById("left-out");
	buttonLeftOut.addEventListener("click",function(){
		var container = document.getElementById("container");
		var deleteDiv = container.getElementsByTagName("div")[0];
		container.removeChild(deleteDiv);
	},false);

	var buttonRightOut = document.getElementById("right-out");
	buttonRightOut.addEventListener("click",function(){
		var container = document.getElementById("container");
		var length = container.getElementsByTagName("div").length;
		var deleteDiv = container.getElementsByTagName("div")[length-1];
		container.removeChild(deleteDiv);
	},false);
})();