/**
 * Created by qhyang on 2017/4/1.
 */

module.exports = function(container) {
    var canvas = document.createElement("canvas");

    container.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var SIZE = 1;
    var STEP_SIZE = 2; // change to 1 to get true walkers without spacing
    var STAGGERED_ALLOWED = true;

    var colors = {
        primary:    'rgb(96, 125, 139)',
        secondary:  'rgb(69, 90, 100)',
        secondary_alt: '#fff',
        // background: '45105C'
    };

// add theme color to body background
//     document.body.style.backgroundColor = "#" + colors.background;

// stuff that happens in a single frame
    function repeat() {
        for(var i = 0; i < BULK_WALKERS.length; i++) {
            BULK_WALKERS[i].step();
            BULK_WALKERS[i].display();
        }
        requestAnimationFrame(repeat);
    }

// draw the pixel to the canvas
    function draw(x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect (x, y, SIZE, SIZE);
    }

// set initial canvas size
    function setCanvasSize() {
        ctx.canvas.width = container.offsetWidth;
        ctx.canvas.height = container.offsetHeight;
    }

// set size of canvas to be size of window
    setCanvasSize();

    var Walker = function(initX, initY, walkerWidth) {
        this.x = initX;
        this.y = initY;
        this.walkerWidth = walkerWidth;
        this.color;

        this.init = function() {
            this.color = getRandomColor()
        }

        this.init();
    }

    Walker.prototype.step = function() {
        this.x += (Math.floor(Math.random() * 3) - 1) * this.walkerWidth;
        this.y += (Math.floor(Math.random() * 3) - 1) * this.walkerWidth;
    }

    Walker.prototype.display = function() {
        draw(this.x, this.y, this.color);
    }

    function generateWalkers(amount) {
        var self = this;
        var walkers = [];
        var staggeredRow = false;
        // add row for every walker
        for (var i = 0; i < amount; i++) {
            // add columns for every row
            for (var a = 0; a < amount; a++) {
                var initX = Math.floor((ctx.canvas.width / amount) * i);
                var initY = Math.floor((ctx.canvas.height / amount) * a);
                if (STAGGERED_ALLOWED) {
                    var offsetX = 0;
                    var offsetY = 0;
                    if (staggeredRow) {
                        offsetX = Math.floor(initX / 2);
                        offsetY = Math.floor(initY / 2);
                        staggeredRow = false;
                    } else {
                        staggeredRow = true;
                    }
                    initX += offsetX;
                    initY += offsetY;
                }
                var walker = new Walker(initX, initY, STEP_SIZE);
                walkers.push(walker);
            }
        }
        return walkers;
    }

// randomly decide which color a walker is created with
    function getRandomColor() {
        var r = Math.random();
        var color = '';
        if (r <= 0.33) {
            color = colors.primary
        } else if (r > 0.67) {
            color = colors.secondary
        } else {
            color = colors.secondary_alt
        }
        return color;
    }

// generate 100 x 100 walkers (10,000)
    var BULK_WALKERS = generateWalkers(100);

    requestAnimationFrame(repeat);

    var randomWalkers = {};

    randomWalkers.resize = setCanvasSize;

    return randomWalkers;
};
