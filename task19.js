(function(){
	var queue = {
		
		list:[],

		leftIn:function(value){
			this.list.unshift(value);
		},

		rightIn:function(value){
			this.list.push(value);
		},

		leftOut:function(){
			this.list.shift();
		},

		rightOut:function(){
			this.list.pop();
		},

		swap:function(index1,index2){
			var div1 = document.getElementById("table").getElementsByTagName("div")[index1];
			var div2 = document.getElementById("table").getElementsByTagName("div")[index2];
			var temp = div1.style.height;
			div1.style.height = div2.style.height;
			div2.style.height = temp;
		},
		
		sort:function(){
			for(var i=0;i<this.list.length-1;i++){
				for(var j=0;j<this.list.length-1-i;j++){
					if(this.list[j] > this.list[j+1]){
						setTimeout("swap("+this.list[j]+","+this.list[j+1]+")",1000);
						
					}
				}
			}
		},

		

		paint:function(){

			var table = document.getElementById("table");
			table.innerHTML = "";
			for(var i=0;i<this.list.length;i++){
				div = document.createElement("div");
				div.style.height = parseInt(this.list[i]) + "px";
				table.appendChild(div);
			}
		}
	}

	var buttonLeftIn = document.getElementById("leftIn");
	buttonLeftIn.addEventListener("click",function(){
		
		var value = document.getElementById("inputButton").value;
		

		if(/[0-9]+/.test(value) && parseInt(value)>=10 && parseInt(value)<=100){
			
			queue.leftIn(value);
			queue.paint();

		}
	},false);

	var buttonRightIn = document.getElementById("rightIn");
	buttonRightIn.addEventListener("click",function(){
		var value = document.getElementById("inputButton").value;

		if(/[0-9]+/.test(value) && parseInt(value)>=10 && parseInt(value)<=100){
			queue.rightIn(value);
			queue.paint();
		}
	},false);

	var buttonLeftOut = document.getElementById("leftOut");
	buttonLeftOut.addEventListener("click",function(){
		queue.leftOut();
		queue.paint();
	},false);

	var buttonRightOut = document.getElementById("rightOut");
	buttonRightOut.addEventListener("click",function(){
		queue.rightOut();
		queue.paint();
	},false);

	var buttonSort = document.getElementById("sort");
	buttonSort.addEventListener("click",function(){
		queue.sort();
	},false);
})();