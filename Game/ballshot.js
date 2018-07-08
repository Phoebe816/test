window.onload=function(){			 
	var oEnter=document.getElementById('enter');	
    oEnter.onclick=function(){     //进入游戏，新一关函数 
    	display('ballgame',false);
    	display('play',true);
    	display('score',true);  
    	display('gk',true);  	
    	NewGame.init('div1');
    };	
        		
}
function display(id,bul){		 //全局函数显示隐藏
    var oId=document.getElementById(id);  
	oId.style.display = bul ? 'block': 'none';
}
var NewGame={	    	  //游戏json
	//气球数据
	oBall:{
		b1:{bclass:'b1',blood:1,speed:1,score:1},
		b2:{bclass:'b2',blood:2,speed:2,score:2},
		b3:{bclass:'b3',blood:3,speed:3,score:3},
	},
	//关卡数据
	gk:[{bMap:[	'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
			   	'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
		       	'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
		       	'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1'],
		 rownum:10,
		 colnum:6,
		 speedX:2,
		 speedY:10,
		 times:3000,
		},
		{bMap:[	'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
			   	'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b2','b2','b2','b2','b2','b2','b2','b2','b2','b2',
				'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
		       	'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1',
		       	'b1','b1','b1','b1','b1','b1','b1','b1','b1','b1'],
		 rownum:10,
		 colnum:6,
		 speedX:3,
		 speedY:10,
		 times:2000,
		},
	],
	//枪的数据
	oGun:{gclass:'gun',
		  bulletclass:'bullet',
	},
	//进入游戏界面
	init:function(id){
   		this.oParent=document.getElementById(id);      				
   		this.createBall(0); 
   		this.createGun();    	   	    	    
	},	
	//气球创建
	createBall:function(iNow){
		if(this.oUl){
			clearInterval(this.oUl.timer);
			this.oParent.removeChild(this.oUl);
		};		
		var oUl=document.createElement('ul');
		var gk=this.gk[iNow];
		var gkw=gk.rownum;
		var gkh=gk.colnum;
		oUl.className='ball';		
		oUl.style.width=gkw*40+'px';
		oUl.style.height=gkh*40+'px';
        this.oParent.appendChild(oUl);        
        oUl.style.left=(this.oParent.offsetWidth-oUl.offsetWidth)/2+'px';  
        this.oUl = oUl;/*因为oUl这个元素别的地方也要经常使用，所以用this把他注册为Game的属性，
        其他函数就可以直接使用；还有种方法是当参数传进去，下面的gk就是传参*/                            
        for (var i = 0,L=gk.bMap.length; i < L; i++) {
        	var oLi=document.createElement('li');
        	oLi.className=this.oBall[gk.bMap[i]].bclass;
        	oLi.blood=this.oBall[gk.bMap[i]].blood;
        	oLi.speed=this.oBall[gk.bMap[i]].speed;
        	oLi.score=this.oBall[gk.bMap[i]].score;
        	oUl.appendChild(oLi);
        }       
        this.aLi=oUl.getElementsByTagName('li');  /*获取ul下所有的li小蜜蜂敌人，并注册为全局的变量
		由于小蜜蜂都是浮动布局，所以子弹碰撞删除之后，删除的小蜜蜂不再占位置，后面的小蜜蜂需要往前浮动，导致
		又被删，与游戏不符,而且小蜜蜂需要飞出来，改变left和top值使其飞，所以需要将小蜜蜂批量改成定位布局
		JS布局转换的思想：每一个浮动布局的offsetleft和offsettop值，跟它改为定位布局后的left和top值是一回事，
		因为都是相对于有定位的父级,先把每个浮动蜜蜂的offsetleft、offsettop值保存在数组里*/		
		var arr=[];				
		for (var i = 0,L=this.aLi.length; i < L; i++) { //存成复合数组，因为left和top总是成对出现的
			arr.push([this.aLi[i].offsetLeft,this.aLi[i].offsetTop]);
		}
		//转为定位之后再取出来，赋给定位蜜蜂的left和top值，采用“移形换位”的方法		
        for (var i = 0,L=this.aLi.length; i < L; i++){
        	this.aLi[i].style.position = 'absolute';
        	this.aLi[i].style.left = arr[i][0]+'px';
        	this.aLi[i].style.top=arr[i][1]+'px';
        }        
        var oPlay=document.getElementById('play');     
        var This=this;    
        oPlay.onclick=function(){     
            oPlay.style.display="none";   
            This.ballMove(gk);//气球移动         
        };       
        if(iNow>0) {
            This.ballMove(gk);
        }
	},		
	//气球运动	
	ballMove:function(gk){		
        var This=this;        
        var L=0;          
        var R=This.oParent.offsetWidth-This.oUl.offsetWidth;    
        This.oUl.timer=setInterval(function(){        	       	
        	if (This.oUl.offsetLeft>R) {
                gk.speedX*=-1;
                This.oUl.style.top=This.oUl.offsetTop+gk.speedY+'px';
        	} else if(This.oUl.offsetLeft<L){
                gk.speedX*=-1;
                This.oUl.style.top=This.oUl.offsetTop+gk.speedY+'px';
        	}        	
           This.oUl.style.left=This.oUl.offsetLeft+gk.speedX+'px';
        }, 30);
        This.onemove.timer=setInterval(function(){        	
        	This.onemove();
        },gk.times);
	},
	//单兵作战:使蜜蜂始终跟着飞机飞，两点之间用到勾股定理算法
	onemove:function(){
        var This=this;
        var nowli=this.aLi[Math.floor(Math.random()*this.aLi.length)];//向下取整           
        nowli.timer=setInterval(function(){        	
        	var a=(This.oG.offsetLeft+This.oG.offsetWidth/2)-(nowli.offsetLeft+nowli.offsetWidth/2+This.oUl.offsetLeft);
            var b=(This.oG.offsetTop+This.oG.offsetHeight/2)-(nowli.offsetTop+nowli.offsetHeight/2+This.oUl.offsetTop);
        	var c=Math.sqrt(a*a+b*b);
        	var IX=nowli.speed*a/c;
        	var IY=nowli.speed * b/c;
        	nowli.style.top=nowli.offsetTop+IY+'px';
        	nowli.style.left=nowli.offsetLeft+IX+'px';
        	if (This.pz(This.oG,nowli)) {     
        		for (var i = 0,l=This.aLi.length;i < l; i++) {
        		   			clearInterval(This.aLi[i].timer);
        		};        
        		clearInterval(This.onemove.timer);		       		
        		clearInterval(This.oUl.timer);          		
        		display('gameover',true);        		      		
        		setTimeout('window.location.reload()', 5000);  
        	}
        },30);          
       this.nowli=nowli;
	},
	//枪创建
	createGun:function(){
  		var oG=document.createElement('div');
  		oG.className=this.oGun.gclass;
  		this.oParent.appendChild(oG);  		
        oG.style.left=(document.body.clientWidth-oG.offsetWidth)/2+'px';
        oG.style.top=this.oParent.offsetHeight-oG.offsetWidth+'px';
        this.oG=oG;
        this.gunMove();
	},
	//枪运动
	gunMove:function(){
		var This=this;	
		var timer=null;		
		document.onkeydown=function(ev){
			var ev=ev||window.event;			
			if(!timer){ //防止按下多次键盘多个定时器的情况
				timer=setInterval(function(){
            		if(ev.keyCode===37){            			
                  		This.oG.style.left=This.oG.offsetLeft-20+'px';      
            		}else if(ev.keyCode===39){
            			This.oG.style.left=This.oG.offsetLeft+20+'px';
            		}
				}, 30);
			}

		}
		document.onkeyup=function(ev){
			var ev=ev||window.event;
			clearInterval(timer);	
			timer=null;		
			if(ev.keyCode==32){
				This.createBullet();
			}
		}
	},
	createBullet:function(){
		var oB=document.createElement('div');
		oB.className=this.oGun.bulletclass;
		this.oParent.appendChild(oB);
		oB.style.left=this.oG.offsetLeft+(this.oG.offsetWidth-oB.offsetWidth)/2+'px';
		oB.style.top=this.oG.offsetTop-oB.offsetHeight+'px';
		this.runBullet(oB);   
		//子弹创建好之后就需要运动，同时需要知道是哪个子弹要运动，所以把创建的子弹oB当做参数穿过去 	
	},	
	runBullet:function(ob){
    	var This = this;
    	var sc=document.getElementById('sc');
    	var gknum=document.getElementById('gknum');
    	ob.timer=setInterval(function(){
    		if(ob.offsetTop<-ob.offsetHeight){
               clearInterval(ob.timer);       
              //删除定时器之后再删除元素，提高性能（因为元素删了之后，它的定时器还是存在的，会影响性能）
               This.oParent.removeChild(ob);
    		}else {
    			ob.style.top=ob.offsetTop-10+'px';    //子弹运动
    		};
    		
    		for (var i = 0,l=This.aLi.length; i < l; i++) {//子弹与所有的小蜜蜂进行碰撞检测   
    		    			
    			if(This.aLi[i]&&This.pz(ob,This.aLi[i])){    
    			    clearInterval(ob.timer);       
                  	This.oParent.removeChild(ob);  				
    				if(This.aLi[i].blood==1){    //判断敌人的血量
    					clearInterval(This.aLi[i].timer);  //删除单兵作战的定时器
     					sc.innerHTML=parseInt(sc.innerHTML)+This.aLi[i].score;//算积分
    					This.oUl.removeChild(This.aLi[i]); 
    				}else {
    					This.aLi[i].blood--;
    				};     								
    			};
    		}; 

    		if(!This.aLi.length){//如果li敌人被消灭完了，就开始下一关
    		    This.createBall(1);                  
                gknum.innerHTML++;
    		}            
    	}, 30);
	},
	//碰撞检测:两个元素上下左右边界进行判断
	pz:function(obj1,obj2){
		if(obj1&&obj2){
			var L1=obj1.offsetLeft;    //子弹或者枪
			var T1=obj1.offsetTop;
			var R1=L1+obj1.offsetWidth;
			var B1=T1+obj1.offsetHeight;
			//因为子弹的参照物是游戏界面div1，而气球的参照物是ul，所以两者不在一个参照物下，无法碰撞检测
			//给气球加上父级元素的offset值，转换为跟子弹同一参照物下就可以进行碰撞检测了
			var L2=obj2.offsetLeft+obj2.parentNode.offsetLeft;    //气球
			var T2=obj2.offsetTop+obj2.parentNode.offsetTop;			
			var R2=L2+obj2.offsetWidth;
			var B2=T2+obj2.offsetHeight;
		}				
        if (R1<L2||L1>R2||T1>B2||B1<T2) {        
        	return false;
        } else {        	
        	return true;
        }

	},
}


