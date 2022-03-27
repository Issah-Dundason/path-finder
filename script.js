function Element(item, priority) {
    this.item = item;
    this.priority = priority;
}

function PriorityQueue(fn) {
    this.fn = fn || ((e1, e2) => e1.priority - e2.priority);
    this.items = [];
}

PriorityQueue.prototype.offer = function (Element) {
   this.items.push(Element);
   this.items.sort(this.fn);
}


//returns undefined if the you have zero items
PriorityQueue.prototype.dequeue = function() {
  return this.items.shift();
}

PriorityQueue.prototype.isEmpty = function() {
    return this.items.length === 0;
}

PriorityQueue.prototype.peek = function() {
    return this.items[0];
}

function Node(name, x, y, center) {
    this.parent = null;
    this.g = Number.MAX_SAFE_INTEGER;
    this.h = Number.MAX_SAFE_INTEGER;
    this.name = name;
    this.x = x;
    this.y = y;
    this.neigbours = [];
    this.center = center || 50;
}

Node.prototype.getF = function() {
   return this.g + this.h;
}

Node.prototype.setH = function (target) { 
    this.h = Math.abs(this.x - target.x) + Math.abs(this.y - target.y);
}

function AStarSearch(start, finish) {
    
    start.g = 0;
    start.setH(finish);
    let sort = (a, b) => a.getF() - b.getF();

    let openList = new PriorityQueue(sort);
    let closedList = [];

    openList.offer(start);

    while(!openList.isEmpty()) {
        let currentNode = openList.dequeue();


        if(currentNode.name === finish.name)
            return currentNode;


        currentNode.neigbours.forEach(n => {
            let weight = currentNode.g + 1;

            if(!closedList.includes(n) && !openList.items.includes(n)) {
                n.parent = currentNode;
                n.g = weight;
                n.setH(finish);
                openList.offer(n);


            } else if(weight < n.g) {
                n.parent = currentNode;
                n.g = weight;
                n.setH(finish);

                if(closedList.includes(n)) {
                   closedList = closedList.filter(node => node.name != n.name);
                   openList.offer(n);
                }
            }
        });
        
        closedList.push(currentNode);
    }
    return null;
}

function getPath(goal) {
    let end = goal;
    let path = [];

    while(end) {
        path.unshift(end);
        end = end.parent;
    }

    return path;
}

export{AStarSearch, getPath, Node}



