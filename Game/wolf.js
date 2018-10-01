$(function(){
	//点击进入游戏按钮
	$("#wenter").click(function() {		
		$("#ballgame").hide();
		$("#wolfPlay").show();
		$("#score").show();
		$("#lifebar").show();
	});
	//点击开始游戏按钮
	$("#wolfPlay").click(function() {
		$(this).hide();
		lifeBarMove();
		wolfTogger();				
	});
	//点击重新开始按钮
	$(".restart").click(function() {
		
		$("#gover").fadeOut();
		lifeBarMove();
		wolfTogger();		
	});
	//游戏开始，生命条逐渐减少
	function lifeBarMove(){		
		var	$barWidth = 500;
		timer = setInterval(function(){
			$barWidth--;
			$("#bar").css({width: $barWidth});					
			if ($barWidth <= 0){	     //游戏结束判断条件	
			    $(".wolf").remove();			 			    		
				clearInterval(timer);
				clearInterval(wolftimer);
				$("#gover").stop().fadeIn();	
			};		
		}, 50);				
	};
	//灰太狼与小灰灰随机出现在草原上
	function wolf(){		      	
		var $width = $("#div1").width()-200;
		var $height = $(window).height()-400;
		var lf=Math.random();
		var tf=Math.random();
		var $Wolf = null;
		$Wolf = $("<img src=''>");
		var $score= $("<p></p>");
		$Wolf.addClass('wolf dis');	
		$score.addClass('bigscore');		
		$Wolf.css({			
			left: $width*lf,
			top: 200+$height*tf,
		});		
  		$("#div1").append($Wolf); 
  		$("#div1").append($score); 			
  		if (Math.round(Math.random())==1) {   //判断是灰太狼还是小灰灰，1是小灰灰
  			$Wolf.attr({
  				src: './img/littlewolf.png'  				
  			});
  			$Wolf.one('click',function() {     
  			   $("#sc").text(parseInt($("#sc").text())-10);
  			   debugger
  			   $score.empty().css({color: '#f00'});
  			   $score.html('-10分').stop().fadeOut();
  			}); 		
  		} else {                       //如果是灰太狼
  			$Wolf.attr({  				
  				src: './img/bigwolf.png'  				
  			});
  			$Wolf.one('click',function() {
  			   $("#sc").text( parseInt($("#sc").text()) + 10);
  			    $score.empty().css({color: '#4876FF'});
  			    $score.html('+10分').stop().fadeOut();
  			}); 
  		}  		
  		$Wolf.fadeIn('slow').fadeOut(1200,function(){
  			$Wolf.remove();  			
  		});  
  		if (parseInt($("#sc").text())>=500) {    //判断通关条件	
  			$Wolf.remove();		
			clearInterval(timer);
			clearInterval(wolftimer);			
  			$(".gover").empty().text('恭喜通关成功');
  			$("#gover").stop().fadeIn('fast');
  		}    		 		
	};	
	//灰太狼和小灰灰出现的动画
	function wolfTogger(){
		wolftimer=setInterval(function(){ 	  					
			wolf();
  		}, 800);  					
	}		
});