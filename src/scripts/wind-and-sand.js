/**
 * Created by qhyang on 2017/3/17.
 */

 module.exports = function(container) {

    //*
    var console = function() {
        return({
            log: function(msg) {
                consoleDiv = container.getElementsByClassName('console')[0];
                para = document.createElement('p');
                text = document.createTextNode(msg);
                para.appendChild(text);
                consoleDiv.appendChild(para);
            }
        });
    }();
//*/

     container.innerHTML = "<div class='console' style='color:#fff;'/><img class='myImg' src='data:image/png;base64,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' style='display:none;'/><canvas class='myCanvas' width='367' height='367' style='position:absolute;margin:auto;width:160%;height:110%;top:-10%;bottom:-10%;left:-35%;right:-30%;'></canvas><div class='instruction' style='position:absolute;margin:auto;width:100%;top:50%;margin-top:180px;text-align:center;display:none;color:#c49a6c;font-family:Helvetica,Arial,Sand-serif;font-size:0.8em'>Pass through</div>";

    var canvas = container.getElementsByClassName('myCanvas')[0];
    var context = canvas.getContext('2d');
    var img = container.getElementsByClassName('myImg')[0];
    var myData;
    var particles = [];
    var pCount = 0;
    var skip = 2;
    var nParticles = 0;
    var distRepulsion = 3000;
    var cycleDist = 0;
    var isDemo = true;
    var rectCanvas;
    var mouseX;
    var mouseY;
    var dirMouse = 1;


    Particle = function(x,y,absPosition){
        this.initX = this.currentX = this.targetX = x;
        this.initY = this.currentY = this.targetY = y;
        this.vx = 0;
        this.vy = 0;
        this.inplace = true;

        this.repulse = function(cx,cy){
            var dx = (cx-this.currentX);
            var dy = (cy-this.currentY);
            var dist = Math.pow(dx,2) + Math.pow(dy,2);
            if (dist < distRepulsion){
                this.vx += -dx*.02;
                this.vy += -dy*.02;
            }else{
                this.vx += (this.initX - this.currentX)*.1;
                this.vy += (this.initY - this.currentY)*.1;
            }
            this.vx*=.85;
            this.vy*=.85;

            if (Math.abs(this.vx)<.1 && Math.abs(this.yv)<.1){
                this.vx = this.vy = 0;
                this.currentX = this.initX;
                this.currentY = this.initY;
                this.inplace = true;
            }else{
                this.currentX = Math.round(this.currentX+this.vx);
                this.currentY = Math.round(this.currentY+this.vy);
                this.inplace = false;
            }
        }
    }

    // window.onload = function() {
    setTimeout(function() {
        document.onmousemove = handleMouseMove;
        context.drawImage(img, 0, 0 );
        myData = context.getImageData(0, 0, img.width, img.height);
        parseImage();
        rectCanvas = canvas.getBoundingClientRect();
        mouseX=0;
        mouseY=0;
        requestAnimationFrame(loop);
    }, 0);
    // };


    function handleMouseMove(event){

        if (!isDemo){
            mouseX = event.clientX - rectCanvas.left;
            mouseY = event.clientY - rectCanvas.top;
        }
    }

    function parseImage(){
        var pix = myData.data;
        var n = pix.length;
        for (var i = 0 ; i < n; i += (4*skip)) {
            if (pix[i+3] > 100){
                var particle = new Particle(pCount%canvas.width, 			Math.floor(pCount/canvas.width),pCount);
                particles.push(particle);
            }
            pCount+=skip;
        }
        nParticles = particles.length;
    }

    function loop() {
        cycleDist += .1;
        distRepulsion = 2500 + Math.sin(cycleDist)*1000;
        var newData = context.createImageData(canvas.width, canvas.height);
        var needRender = false;

        if (isDemo){
            mouseX += dirMouse*2;
            mouseY += 2;
            if (mouseX > canvas.width){
                dirMouse = -1;
                mouseX = canvas.width;
            }
            if (mouseY > canvas.height){
                isDemo = false;
            }
        }

        for (var i=0; i<nParticles; i++ ){
            var p = particles[i];
            p.repulse(mouseX,mouseY);
            if (!p.inplace){
                var pos = ((p.currentY*canvas.width)+p.currentX)*4;
                newData.data[pos] = 255;
                newData.data[pos+1] = 193;
                newData.data[pos+2] = 7;
                newData.data[pos+3] = 255;
                needRender = true;
            }
        }
        if (needRender) {
            context.putImageData(newData,0,0);
        }
        requestAnimationFrame(loop);
    };
};