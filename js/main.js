
function merge(arr, start, end, split) {
  return new Promise(resolve => {
    setTimeout(() => {
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
      var toRemove = svg.children;

      for(let i = start; i <= end; i++) {
        arr[i] = _tmpArr[count++];
        task(i);
      }

      function task(i) {
        setTimeout(function() {
          for(var r = 0; r < toRemove.length; r++) {
            if(toRemove[r].getAttribute("x") == ((i+1)*15).toString()) {
              break;
            }
          }
          // now find the one with the correct x value try to remove it
          try {
            svg.removeChild(document.getElementById(toRemove[r].id));
          } catch (e) {
            console.log("could not find child of svg with id:", toRemove[r].id);
          }
          shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");

          shape.setAttribute("x", (i+1)*15);
          shape.setAttribute("y", 250-arr[i]);
          shape.setAttribute("id", "rect"+i);
          shape.setAttribute("width", 15);
          shape.setAttribute("rx", 2)
          shape.setAttribute("ry", 2)
          shape.setAttribute("height", arr[i]);
          svg.appendChild(shape);
        }, 10*i);
      }
      resolve("Resolved");
    },200);
  });
}


async function mergeSort(arr, start, end) {
  if(start >= end) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("resolved");
      },100);
    });
  }
  var split = Math.floor((start + end) / 2);
  let res;

  res = await mergeSort(arr, start, split);  // sort left side

  res = await mergeSort(arr, split+1, end);  // sort right side

  res = await merge(arr, start, end, split);  // merge them together
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
async function main(sort) {
  if(!sort) {
    randomArr = [];
    randomArr = randomize();
    barHeights = barArr = [];
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
      shape.setAttribute("rx", 2)
      shape.setAttribute("ry", 2)
      shape.setAttribute("height", randomArr[c]*10);
      shape.setAttribute("fill", "grey");

      barHeights.push(randomArr[c]*10);

      c++;
      document.getElementById("SVG").appendChild(shape);
    }
  } else {
    document.getElementById("randomBtn").disabled = true;
    document.getElementById("mergeBtn").disabled = true;
    const res = await mergeSort(barHeights, 0, 24);
    document.getElementById("randomBtn").disabled = false;
    document.getElementById("mergeBtn").disabled = false;
  }
}

main(false);
