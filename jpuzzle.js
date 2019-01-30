
var grids = new Array();
var pieces = new Array();
var mousePiece = null;
var keyPiece = null;
var keyIndex = null;
var selectMode = true;
var diffX = null;
var diffY = null;
var maxZ = 1;
var hoverGrid = null;

window.onload = init;

function jumbleIt() {
   window.location.reload();
}

function solveIt() {
   for (var i = 0; i < grids.length; i++) {
      pieces[i].style.backgroundImage = "";
      grids[i].style.backgroundImage = "url(piece"+i+".jpg)";
   }
}


function init() {

   var allElem = document.getElementsByTagName("*");

   for (var i = 0; i < allElem.length; i++) {
      if (allElem[i].className == "grid") grids.push(allElem[i]);
      if (allElem[i].className == "pieces") pieces.push(allElem[i]);
   }
   
   var randomIntegers = randomArray(pieces.length);
   for (var i = 0; i < pieces.length; i++) {
      pieces[i].style.backgroundImage = "url(piece" + randomIntegers[i] + ".jpg)";
      pieces[i].style.top = getStyle(pieces[i],"top");
      pieces[i].style.left = getStyle(pieces[i],"left");
      pieces[i].style.width = getStyle(pieces[i],"width");
      pieces[i].style.height = getStyle(pieces[i],"height"); 
      pieces[i].style.cursor = "pointer";   

      addEvent(pieces[i], "mousedown", mouseGrab, false); 
   } 

   for (var i = 0; i < grids.length; i++) {
      grids[i].style.top = getStyle(grids[i],"top");
      grids[i].style.left = getStyle(grids[i],"left");
      grids[i].style.width = getStyle(grids[i],"width");
      grids[i].style.height = getStyle(grids[i],"height"); 

   }
   document.onkeydown = keyGrab;
   keyPiece = pieces[0];
   keyIndex = 0;
   keyPiece.style.borderColor = "red";

   document.getElementById("jumble").onclick = jumbleIt;
   document.getElementById("solve").onclick = solveIt;
}

function keyGrab(e) {
     var evt = e || window.event;
  
     if (evt.keyCode == 32) {toggleMode(); return false}
     else if (selectMode && evt.keyCode == 37) {selectPiece(-1); return false} 
     else if (selectMode && evt.keyCode == 39) {selectPiece(1); return false} 
     else if (!selectMode && evt.keyCode == 37) {keyMove(-8, 0); return false}
     else if (!selectMode && evt.keyCode == 38) {keyMove(0, -8); return false}
     else if (!selectMode && evt.keyCode == 39) {keyMove(8, 0); return false} 
     else if (!selectMode && evt.keyCode == 40) {keyMove(0, 8); return false}
}

function keyMove(moveX, moveY) {
   keyPiece.style.left = parseInt(keyPiece.style.left) + moveX + "px";
   keyPiece.style.top = parseInt(keyPiece.style.top) + moveY + "px";
   highlightGrid(keyPiece);
}

function selectPiece(diffIndex) {
     keyPiece.style.borderColor = "black";

     keyIndex = keyIndex + diffIndex;
     if (keyIndex == -1) keyIndex = pieces.length - 1;
     else if (keyIndex == pieces.length) keyIndex = 0;

     keyPiece = pieces[keyIndex];
     keyPiece.style.borderColor = "red";
}

function toggleMode() {
   if (dropValid(keyPiece)) selectMode = !selectMode;
   var modeBox = document.getElementById("keyMode");

   if (selectMode) {
       keyPiece.style.borderColor = "red";
       alignPiece(keyPiece);
       modeBox.value = "SELECT PIECE";
       modeBox.style.backgroundColor = "red";
    } else {
       keyPiece.style.borderColor = "rgb(151, 255, 151)";
       maxZ++;      
       keyPiece.style.zIndex = maxZ;

       modeBox.value = "MOVE PIECE";
       modeBox.style.backgroundColor = "green";
    }
   }
    

function dropValid(object) {

    for (var i = 0; i < pieces.length; i++) {
       if (withinIt(object, pieces[i])) return false;
    }
    return true;
}

function alignPiece(object) {
   for (var i = 0; i < grids.length; i++) {
      if (withinIt(object, grids[i])) {
            object.style.left = grids[i].style.left;
            object.style.top = grids[i].style.top;
            break;
      } 
     }
    }

function highlightGrid(object) {
    if (hoverGrid) hoverGrid.style.backgroundColor = "";

    for (var i = 0; i < grids.length; i++) {
       if (withinIt(object, grids[i])) {
           hoverGrid = grids[i];
           hoverGrid.style.backgroundColor = "rgb(192, 255, 192)";
      }
     }
    }

function mouseGrab(e) {
   var evt = e || window.event;    
   mousePiece = evt.target || evt.srcElement; 

   maxZ++;
   mousePiece.style.zIndex = maxZ; // place the piece above other objects 
   mousePiece.style.cursor = "move";


   var mouseX = evt.clientX; // x-coordinate of pointer
   var mouseY = evt.clientY; // y-coordinate of pointer

   /* Calculate the distance from the pointer to the piece */
   diffX = parseInt(mousePiece.style.left) - mouseX;
   diffY = parseInt(mousePiece.style.top) - mouseY;

   /* Add event handlers for mousemove and mouseup events */
   addEvent(document, "mousemove", mouseMove, false);
   addEvent(document, "mouseup", mouseDrop, false);
}

function mouseMove(e) {
   var evt = e || window.event;
   var mouseX = evt.clientX;
   var mouseY = evt.clientY;

   mousePiece.style.left = mouseX + diffX + "px";
   mousePiece.style.top = mouseY + diffY + "px";
   highlightGrid(mousePiece);
}

function mouseDrop(e) {
      if (dropValid(mousePiece)) {
        alignPiece(mousePiece);
        removeEvent(document, "mousemove", mouseMove, false);
        removeEvent(document, "mouseup", mouseDrop, false);
        mousePiece.style.cursor = "pointer";
      }  

}