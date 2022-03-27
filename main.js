import { addDescription, clean, drawBoard, drawCircle } from "./draw.js";
import { AStarSearch, getPath, Node } from "./script.js";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var startButton = document.getElementById("start_button");
var from = document.getElementById("from");
var to = document.getElementById("to");
var range = document.getElementById("range");

startButton.addEventListener("click", onStart);
range.addEventListener('change', onRange);

drawBoard(context);

addDescription(context, getNodes());

let path = [];


function getNodes() {
    let b = new Node("B", 100, 0);
    let a = new Node("A", 0, 0);
    let c = new Node("C", 200, 0);
    let d = new Node("D", 0, 100);
    let f = new Node("F", 0, 200);
    let g = new Node("G", 100, 200);
    let h = new Node("H", 200, 200);
    let e = new Node("E", 200, 100);

    b.neigbours.push(a, c);
    a.neigbours.push(b, d);
    d.neigbours.push(a, f);
    c.neigbours.push(b, e);
    f.neigbours.push(d, g);
    g.neigbours.push(f, h);
    h.neigbours.push(e, g);
    e.neigbours.push(c, h);

    return [a, b, c, d, e, f, g, h];
}

var shouldRun = true, delay = 1, firstDraw = true, start, currentLoc;

function onStart() {

    let nodes = getNodes();

    var start = nodes.find(n => n.name.toLowerCase() === from.value.toLowerCase());
    var finish = nodes.find(n => n.name.toLowerCase() === to.value.toLowerCase());

    let goal = AStarSearch(start, finish);
    path = getPath(goal);

   if(shouldRun) {
       shouldRun = false;
       startButton.classList.add("pressed");
       requestAnimationFrame(animLoop);
   }
}

function onRange(e) {
    delay = Number(e.target.value);
}

function animLoop(timeStamp) {
    clean(context);
    drawBoard(context);
    addDescription(context, getNodes());

    if(!start) {
        start = timeStamp;
    }

    var elapsedTime = Math.floor((timeStamp - start) / 1000);


    if(path.length !== 0 && firstDraw) {
        currentLoc = path.shift();
        drawCircle(context, currentLoc);
        requestAnimationFrame(animLoop)
        firstDraw = false;
    } else if(path.length !== 0 && elapsedTime === delay) {
        currentLoc = path.shift();
        drawCircle(context, currentLoc);
        start = undefined;
        requestAnimationFrame(animLoop)
    } else if (path.length === 0) {
        shouldRun = true;
        firstDraw = true;
        start = undefined;
        startButton.classList.remove("pressed");
        drawCircle(context, currentLoc,"#FF4433", "#FFFF");
    } else {
        if(currentLoc) {
            drawCircle(context, currentLoc);
        }
        requestAnimationFrame(animLoop);
    }
}