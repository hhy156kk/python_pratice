function createPerson(name,age,job){
	var o = new Object();
	o.name = name;
	o.age = age;
	o.job = job;
	o.sayName = function(){
		alert(this.name);
	};
	return o;
}

var person1 = createPerson("Ni",29,"soft");
var person2 = createPerson("li",28,"doctor");

var book = {};
Object.defineProperties(book,{
	_year:{
		value:2004;
	},

	edition:{
		value:1;
	},

	year:{
		get:function(){
			return this._year;
		},
		set:function(){
			if(newValue > 2004){
				this._year = newValue;
				this.edition += newValue - 2004;
			}
		}
	}

});

var descriptor = Object.getOwnPropertyDescriptor()
