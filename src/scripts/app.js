var move = 0;
var width = $('main').width() - ($('section').outerWidth() * 2);
var speed = .5;



setTimeout(function(){
  if ((screen.width < 1025) || (screen.height < 480)) {
    $('body').addClass('horizontal');
  } else {
    $('html').on('wheel', function (e) {
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
          var delta = e.originalEvent.deltaY;
          if (delta < 0) {
             move -= speed * -delta;
             if (move < 0) {
               move = 0;
             }
          } else if (delta > 0) {
             move += speed * delta;
             if (move > width) {
               move = width;
             }
          }
        } else {
          var delta = e.originalEvent.wheelDelta;
          if (delta < 0) {
             move += speed * -delta;
             if (move > width) {
               move = width;
             }
          } else if (delta > 0) {
             move -= speed * delta;
             if (move < 0) {
               move = 0;
             }
          }
        }
        document.documentElement.style.overflow = 'hidden';
        $( "main" ).css( "transform", "translate3d(-" + move + "px, 0px, 0px)", "width", width );
    });
  }
}, 100);

function updateCircle() {
  //Manages updating the circle's text and size.
  var circleArray = $(".circle");
  var circleSvgArray = $(".circle-svg");
  var circleTextArray = $(".circle-text");
  for (i = 0; i < circleArray.length; i++) {
    sizeCircleToText( circleArray[i], circleSvgArray[i], circleTextArray[i], .705 );
  };
}

function sizeCircleToText(pathObject,targetSVG,targetText,charWidth){
//Calcs the circumference of the circle needed and applies it.
  r = (targetText.innerHTML.length*charWidth); //Radius
  //r = (targetText.getComputedTextLength()+1)/6; //Maybe?
  d = (r*2); //diameter
  path = "M"+ (d) +","+ (d) + "m "+ (-r) +",0 a "+ (r) +","+ (r) +" 0 1,1 "+ (d) +",0 a "+r+","+r+" 0 1,1 "+ (-d) +",0"; //This gibberish is the path construction for a circle. Better way to do this or concat all this?
  viewBox = "0 0 "+d*2+" "+d*2; //The viewbox rect
  pathObject.setAttribute("d",path);
  targetSVG.setAttribute("viewBox",viewBox);
}

updateCircle();
