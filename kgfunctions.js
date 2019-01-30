
function getStyle(object, styleName) {
   if (window.getComputedStyle) {
      return document.defaultView.getComputedStyle(object, null).getPropertyValue(styleName);
   } else if (object.currentStyle) {
      return object.currentStyle[styleName]
   }
}

function withinIt(object1, object2) {
   var within = false;
   var x1 = parseInt(object1.style.left);
   var y1 = parseInt(object1.style.top);

   var left = parseInt(object2.style.left);
   var top = parseInt(object2.style.top);
   var width = parseInt(object2.style.width);
   var height = parseInt(object2.style.height);

   var bottom = top + height;
   var right = left + width;

   if ((x1 > left && x1 < right) && (y1 > top && y1 < bottom)) within = true;

   return within;
}

function randomArray(size) {
   var ra = new Array(size);
   for (var i = 0; i < ra.length; i++) ra[i] = i;
   ra.sort(randOrder);
   return ra;
}

function randOrder(){
   return 0.5 - Math.random();
}

function addEvent(object, evName, fnName, cap) { 
   if (object.attachEvent)
       object.attachEvent("on" + evName, fnName);
   else if (object.addEventListener)
       object.addEventListener(evName, fnName, cap);
}

function removeEvent(object, evName, fnName, cap) {
   if (object.detachEvent)
       object.detachEvent("on" + evName, fnName); 
   else if (object.removeEventListener)
       object.removeEventListener(evName, fnName, cap);
}