
function merge(arr, start, end, split) {
    var _tmpArr = [];
    var left, right, count;
    count = 0;
    left = start;
    right = split + 1;

    while(left <= split && right <= end) {
      if(arr[left] <= arr[right]) {
        _tmpArr[count++] = arr[left++];
      }
      else if(arr[right] < arr[left]) {
        _tmpArr[count++] = arr[right++];
      }
    }
    // now flush anything left in the left and right of the array
    while(left <= split) {
      _tmpArr[count++] = arr[left++];
    }
    while(right <= end) {
      _tmpArr[count++] = arr[right++];
    }
    // copy the temp array over
    count = 0;
    var svg = document.getElementById("SVG");
    var toRemove = document.querySelectorAll('rect[x]');

     for(let i = start; i <= end; i++) {
        arr[i] = _tmpArr[count++];
       task(i);
     }

     function task(i) {
       setTimeout(function() {
         console.log("count = "+count);
         console.log("arr = "+arr);
         console.log("_tmpArr = "+_tmpArr);
         for(var r = 0; r < toRemove.length; r++) {
           //console.log(`attribute = ${toRemove[r].getAttribute("x")}, and x = ${((i+1)*15).toString()}`);
           if(toRemove[r].getAttribute("x") == ((i+1)*15).toString()) {
             break;
           }
         }
         //console.log("so, r = "+r);
         // now find the one with the correct x value to remove it
         svg.removeChild(toRemove[r]);
         //svg.removeChild(svg.childNodes[i]);
         shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    
         shape.setAttribute("x", (i+1)*15);
         shape.setAttribute("y", 250-arr[i]);
         shape.setAttribute("id", "rect"+i);
         shape.setAttribute("width", 15);
         shape.setAttribute("height", arr[i]);
         shape.setAttribute("fill", "grey");
         svg.appendChild(shape);
       }, 250 * i);
     }
/*
    for(var i = start; i <= end; i++) {
      arr[i] = _tmpArr[count++];

      for(var r = 0; r < toRemove.length; r++) {
        if(toRemove[r].getAttribute("x") == ((i+1)*15).toString()) {
          break;
        }
      }
      // now find the one with the correct x value to remove it
      svg.removeChild(toRemove[r]);
      //svg.removeChild(svg.childNodes[i]);
      shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");

      shape.setAttribute("x", (i+1)*15);
      shape.setAttribute("y", 250-arr[i]);
      shape.setAttribute("id", "rect"+i);
      shape.setAttribute("width", 15);
      shape.setAttribute("height", arr[i]);
      shape.setAttribute("fill", "grey");
      svg.appendChild(shape);

    }
*/
    return;
}


function mergeSort(arr, start, end) {
  if(start >= end) {
    return;
  }
  var split = Math.floor((start + end) / 2);

  mergeSort(arr, start, split);  // sort left side
  // setTimeout(mergeSort, 250, arr, start, split);
    mergeSort(arr, split+1, end);  // sort right side
   //setTimeout(mergeSort, 250, arr, split+1, end);
   merge(arr, start, end, split);  // merge them together
  // setTimeout(merge, 1000, arr, start, end, split);

}


function randomize() {
  var random = [];
  var _tmp, swapA, swapB;

  for (var i = 1; i <= 25; i++) {
    random.push(i);
  }
  for(var i = 0; i < 25; i++) {
    // do random swapping to randomize
    swapA = Math.floor(Math.random()*25);
    swapB = Math.floor(Math.random()*25);
    _tmp = random[swapA];
    random[swapA] = random[swapB];
    random[swapB] = _tmp;
  }
  return random;
}

var randomArr = [];
var barHeights = [];
function main(sort) {
  if(!sort) {
    randomArr = randomize();
    barArr = [];
    var shape, svg, c;
    svg = document.getElementById("SVG");
    c = 0;

    // first clear the svg if there are any children
    while (svg.lastChild) {
      svg.removeChild(svg.lastChild);
    }

    // create each line
    for(var i = 1; i <= 25; i++) {
      shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      shape.setAttribute("x", i*15);
      shape.setAttribute("y", 250-randomArr[c]*10);
      shape.setAttribute("id", "rect"+i);
      shape.setAttribute("width", 15);
      shape.setAttribute("height", randomArr[c]*10);
      shape.setAttribute("fill", "grey");

      barHeights.push(randomArr[c]*10);

      c++;
      document.getElementById("SVG").appendChild(shape);
    }
  } else {
    //setTimeout(mergeSort, 1000, barHeights, 0, 24);
    mergeSort(barHeights, 0, 24);
    console.log("end merge");
  }
}

main(false);
