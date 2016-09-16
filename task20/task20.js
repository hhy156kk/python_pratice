(function(){
	var insertButton = document.getElementById("insertButton");
	var container = document.getElementById("container");
	
	insertButton.addEventListener("click",function(){
		var insertArea = document.getElementById("insertarea");
		var data = insertarea.value.split(/[^0-9A-Za-z\u4e00-\u9fa5]+/);

		for(var i=0;i<data.length;i++){
			var divElement = document.createElement("div");
			var text = document.createTextNode(data[i]);
			divElement.appendChild(text);
			container.appendChild(divElement);
		}
	},false);

	var queryButton = document.getElementById("queryButton");
	queryButton.addEventListener("click",function(){
		var queryArea = document.getElementById("queryarea");
		var queryValue = queryarea.value.trim();
		var queryNodes = container.getElementsByTagName("div");
		for(var i=0;i<queryNodes.length;i++){
			var text = queryNodes[i].firstChild.nodeValue;
			var newText = text.replace(new RegExp(queryValue,"g"),"<span class='select'>" + queryValue + "</span>");
			queryNodes[i].innerHTML = newText;
		}

	},false);
})();