var Queue = {

	list: [],

	leftPush: function(value){
		this.list.unshift(value);
	},

	rightPush:function(value){
		this.list.push(value);
	},

	leftPop:function(){
		this.list.shift();
	},

	rightPop:function(){
		this.list.pop();
	},



	paint:function(){
		var container = document.getElementById("container");
		str = "";
		for(var i=0;i<this.list.length;i++){
			str += "<div>" + this.list[i].toString() + "</div>";
		}
		container.innerHTML = str;
	}


};


(function(){

	var leftIn = document.getElementById("leftIn");
	leftIn.addEventListener("click",function(){
		var value = document.getElementById("queue").value ;
		if(parseInt(value) < 10 || parseInt(value) > 100){
			return;
		}

		if(Queue.list.length + 1 > 60){
			alert("too more");
			return;
		}

		Queue.leftPush(value);
		Queue.paint();
	},false);

	var rightIn = document.getElementById("rightIn");
	rightIn.addEventListener("click",function(){
		var value = document.getElementById("queue").value ;
		if(parseInt(value) < 10 || parseInt(value) > 100){
			return;
		}

		if(Queue.list.length + 1 > 60){
			alert("too more");
			return;
		}

		Queue.rightPush(value);
		Queue.paint();
	},false);

	var leftOut = document.getElementById("leftOut");
	leftOut.addEventListener("click",function(){
		var value = document.getElementById("queue").value ;
		if(parseInt(value) < 10 || parseInt(value) > 100){
			return;
		}

		Queue.leftPop();
		Queue.paint();
	},false);

	var rightOut = document.getElementById("rightOut");
	rightOut.addEventListener("click",function(){
		var value = document.getElementById("queue").value ;
		if(parseInt(value) < 10 || parseInt(value) > 100){
			return;
		}

		Queue.rightPop();
		Queue.paint();
	},false);

})();