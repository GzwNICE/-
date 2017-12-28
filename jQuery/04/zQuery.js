
// 手动处理className 

function getByClassName(myClass){
	// 建立一个数组
	var arr = [];
	
	var allEle = document.getElementsByTagName("*");
	for(var i = 0; i < allEle.length; i++) {
		
		var arrClassNames = allEle[i].className.split(" ");
		
		for(var j = 0; j < arrClassNames.length; j++) {
			
			if(arrClassNames[j] == myClass) {
				arr.push(allEle[i]);
				break;
			}
			
		}
		
	}
	
	return arr;
	
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj)[attr];
	}
}

function bind(obj,evType,evFn) {
	if(obj.addEventListener) {
		obj.addEventListener(evType,evFn,false);
	} else if (obj.attachEvent){
		obj.attachEvent("on"+evType,evFn);
	} else {
		obj["on"+evType] = evFn;
	}
	
}


function ZaG(arg) {
	
	
	return new zQuery(arg);
	
}

	function zQuery(arg){
		// 建立一个数组 用来存 获取的元素
		this.ele = [];
		
		// 通过传入的参数 进行判断  类型  如果是函数
		if(typeof arg == "function") {
//			window.onload=function(){ //在jQuery中 绑定事件的方式 全部用addEventListener
//				
//			};
			/*window.addEventListener("load",arg,false);
			attachEvent()*/
			bind(window,"load",arg);
		} else if(typeof arg == "string") {
			
			// 如果arg 是一个字符串   说明要获取元素了  那么到底获取什么元素 需要进一步判断
			// "div" "#box" ".aa"
			switch(arg.charAt(0)) {
				case "#":
				this.ele.push(document.getElementById(arg.slice(1)));
				break;
				case ".":
				//document.getElementsByClassName()
				this.ele = getByClassName(arg.substring(1));
				break;
				default :
				this.ele = document.getElementsByTagName(arg);
				break;
			}
			
			
		}
		
	}
	// css(backgrondColor)  css({})   
	zQuery.prototype.css = function(attr,value){
		
		if(arguments.length == 1){
			
			
			
			if(typeof arguments[0] == "object") {
				//console.log(this.ele);
				//console.log(456);
				//console.log(arguments[0]);
				for(var i = 0; i < this.ele.length; i++) {
					
					for(var k in arguments[0]) {
						
						this.ele[i].style[k] = arguments[0][k];
						
					}
					
				}
			}else {
				
				//console.log(this.ele[0]);
//				return getStyle(this.ele[0],attr);  
				return this.ele[0].style[attr];
			}
			
		} else if(arguments.length==2) {
			for(var i = 0; i < this.ele.length; i++) {
				
				this.ele[i].style[attr] = value;
				
			}
		}
		
		
	}

