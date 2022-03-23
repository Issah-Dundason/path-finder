import { addDescription, clean, drawBoard, drawCircle } from "./draw.js";
import { AStarSearch, getPath, Node } from "./script.js";

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var startButton = document.getElementById("start_button");
var from = document.getElementById("from");
var to = document.getElementById("to");

startButton.addEventListener("click", onStart);

var intInterval;

drawBoard(context);

addDescription(context, getNodes());

let path = [];


function getNodes() {
    let b = new Node("B", 100, 0);
    let a = new Node("A", 0, 0);
    let c = new Node("C", 200, 0);
    let d = new Node("D", 0, 100);
    let f = new Node("F", 0, 200);
    let g = new Node("G", 100, 200)
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

function onStart() {

    let nodes = getNodes();

    var start = nodes.find(n => n.name.toLowerCase() === from.value.toLowerCase());
    var finish = nodes.find(n => n.name.toLowerCase() === to.value.toLowerCase());

    let goal = AStarSearch(start, finish);
   path = getPath(goal);
   clearInterval(intInterval);

   intInterval = setInterval(draw, 1000);
}

function draw() {
    clean(context);
    drawBoard(context);
    addDescription(context, getNodes());
    update();
}

function update() {
    if(path.length === 0) 
        return;
    drawCircle(context, path.shift());
}