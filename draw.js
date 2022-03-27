
function drawBoard(context) {
    context.save();

    context.strokeStyle = "#ffff00";
    context.lineWidth = 0.2;

    for(let i = 100; i < 300; i+= 100) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, 300);
        context.stroke();
    }

    for(let i = 100; i < 300; i+= 100) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(300, i);
        context.stroke();
    }

    context.fillStyle = "#D4AF37"

    context.beginPath();
    context.fillRect(100, 100, 100, 100);
    context.fill();

    context.restore();
}

function addDescription(context, nodes) {

    context.fillStyle = '#ccc';
    context.lineWidth = 1;

    nodes.forEach(node => {
        context.save();

        context.font = '80px Monospace';
        context.fillText(node.name, node.x + 30, node.y + 75);
        context.restore();
    });
}

function drawCircle(context, node, background, foreground) {
    context.save();

   
    context.fillStyle = background || "#ffff";
    context.beginPath();
    context.ellipse(node.x + node.center,
         node.y + node.center, 
         30, 30, 0, 0, 2 * Math.PI);
    context.fill();


    context.fillStyle = foreground || "#03AC13";
    context.beginPath();
    context.ellipse(node.x + node.center,
         node.y + node.center, 
         10, 10, 0, 0, 2 * Math.PI);
    context.fill();

    context.restore();
}

function clean(context) {
    context.save();
    context.beginPath();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fill();
    context.restore();
}

export {drawBoard, addDescription, drawCircle, clean};