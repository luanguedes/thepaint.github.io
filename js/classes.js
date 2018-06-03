var figura;
var Figura = Class.create({
    setPoint: function(x, y) {
        if (this.x1 == undefined) {
            this.x1 = x;
            this.y1 = y;
        } else {
            this.x2 = x;
            this.y2 = y;
        }
    },
    clear: function() {
        this.x1 = undefined;
        this.x2 = undefined;
        this.y1 = undefined;
        this.y2 = undefined;
    }
});

var Linha = Class.create(Figura, {
    draw: function(canvas) {
        canvas.beginPath();
        canvas.moveTo(this.x1, this.y1);
        canvas.lineTo(this.x2, this.y2);
        canvas.stroke();
    }
});

var Retangulo = Class.create(Figura, {
    draw: function(canvas) {
        canvas.strokeRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    }
});

var RetanguloCheio = Class.create(Figura, {
    draw: function(canvas) {
        canvas.fillRect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1);
    }
});

var Triangulo = Class.create(Figura, {
    draw: function(canvas) {
        canvas.beginPath();
        canvas.moveTo(this.x1, this.y1);
        canvas.lineTo(this.x2, this.y2);
        canvas.lineTo(this.y2, this.x2);
        canvas.closePath();
        canvas.stroke();
    }
});

var TrianguloCheio = Class.create(Figura, {
    draw: function(canvas) {
        canvas.beginPath();
        canvas.moveTo(this.x1, this.y1);
        canvas.lineTo(this.x2, this.y2);
        canvas.lineTo(this.y2, this.x2);
        canvas.closePath();
        canvas.fill();
    }
});


Element.prototype.leftTopScreen = function() {
    var x = this.offsetLeft;
    var y = this.offsetTop;

    var element = this.offsetParent;

    while (element !== null) {
        x = parseInt(x) + parseInt(element.offsetLeft);
        y = parseInt(y) + parseInt(element.offsetTop);

        element = element.offsetParent;
    }

    return new Array(x, y);
}

function drawLine() {
    figura = new Linha();
}

function drawStrokeRect() {
    figura = new Retangulo();
}

function drawFillRect() {
    figura = new RetanguloCheio();
}

function drawTriangule(){
    figura = new Triangulo();
}

function drawFillTriangule(){
    figura = new TrianguloCheio();
}

function createFigure(event) {
    console.log("X do mouse: " + event.clientX);
    console.log("Y do mouse: " + event.clientY);
    var xy = document.querySelector("canvas").leftTopScreen();
    var x = event.clientX;
    var y = event.clientY;

    figura.setPoint(x - xy[0], y - xy[1]);
}

function closeFigure(event) {
    createFigure(event);
    var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
    figura.draw(ctx);
    figura = Object.clone(figura);
    figura.clear();
}

function toggleShadow() {
    var ctx = document.querySelector("canvas").getContext('2d');
    if (ctx.shadowBlur == 10) {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        document.querySelector("#toggle").value = "Ligar Sombra";
    } else {
        ctx.shadowColor = "blue";
        ctx.shadowBlur = 10;
        document.querySelector("#toggle").value = "Desligar Sombra";
    }
}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}

function save(){
document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'canvas', 'paint.png');
}, false);

}
