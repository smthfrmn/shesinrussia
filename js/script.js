function updateCircle(){var e=$(".circle"),t=$(".circle-svg"),o=$(".circle-text");for(i=0;i<e.length;i++)sizeCircleToText(e[i],t[i],o[i],.705)}function sizeCircleToText(e,t,i,o){r=i.innerHTML.length*o,d=2*r,path="M"+d+","+d+"m "+-r+",0 a "+r+","+r+" 0 1,1 "+d+",0 a "+r+","+r+" 0 1,1 "+-d+",0",viewBox="0 0 "+2*d+" "+2*d,e.setAttribute("d",path),t.setAttribute("viewBox",viewBox)}var move=0,width=$("main").width()-2*$("section").outerWidth(),speed=.5;setTimeout(function(){screen.width<1025||screen.height<480?$("body").addClass("horizontal"):$("html").on("wheel",function(e){if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){var t=e.originalEvent.deltaY;t<0?(move-=speed*-t)<0&&(move=0):t>0&&(move+=speed*t)>width&&(move=width)}else{var t=e.originalEvent.wheelDelta;t<0?(move+=speed*-t)>width&&(move=width):t>0&&(move-=speed*t)<0&&(move=0)}document.documentElement.style.overflow="hidden",$("main").css("transform","translate3d(-"+move+"px, 0px, 0px)","width",width)})},100),updateCircle();