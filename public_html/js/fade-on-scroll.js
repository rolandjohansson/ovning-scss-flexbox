/*
fade-on-scroll.js
Author: Roland Johansson
Created: October 2018
*/

//Definiera vid hur många pixlars bredd på viewporten vi vill ha vår brytpunkt
const breakpoint = $(".wrapper").width();

//Definera den initiala bredden på viewporten
let previousWidth = $(window).width();

selectAlphaMode(previousWidth);

$(window).resize(function() {
  let width = $(window).width();

  if ((width < breakpoint && previousWidth >= breakpoint) || (width >= breakpoint && previousWidth < breakpoint)) {
    selectAlphaMode(width);
  }  

  previousWidth = width;

});

// Sätt alpha till 1 eller adaptiv baserat på viewportens bredd
function selectAlphaMode(width) {

  if (width < breakpoint) {
    $(document).scroll().off();
    setAlpha(1);
  } else {
    setAlpha(calcAlpha());
    $(document).scroll(function() {
      setAlpha(calcAlpha());
    });
  }

}

function setAlpha(alpha) {
  $("nav").css("background-color", "rgba(39, 39, 39," + alpha + ")");
}

function calcAlpha() {
  //Definiera variabel för alfa-värdet
  let alpha = 0;

  //Definiera en variabel för hur långt det är till toppen av HTML-dokumentet
  let scroll = $(document).scrollTop();

  //Vid vilken pixel ska toningen starta
  const fadeStart = 100;

  //Vid vilken pixel ska toningen sluta
  const fadeStop = 200;

  //Hur långt är det mellan start och stop
  const fadeLength = fadeStop - fadeStart;

  //Vi har tre cases, mellan 0 och fadeStart, mellan fadeStart och fadeStop, samt från fadeStop till oändligheten (och vidare)
  if (scroll < fadeStart) {
    alpha = 0;
  } else if (scroll < fadeStop) {
    alpha = (scroll - fadeStart) / fadeLength;
  } else {
    alpha = 1;
  }
  
  //Returnera vad alpha nu har blivit efter vår uträkning
  return alpha;  
}