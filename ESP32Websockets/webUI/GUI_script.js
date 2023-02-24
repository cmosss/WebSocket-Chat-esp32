var myGamePiece;
var myScore;
function startGame() {
    myGamePiece = new component(20, 20, "1224273.png", 100, 120, "image");
    myScore = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
       // this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
   stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.angle = 0;  // เพิ่มตัวแปร angle เพื่อเก็บค่ามุมหมุน
    this.x = x;
    this.y = y;
    ///////////////////////////////////////////////////////////////////
    this.update = function() 
    {
        ctx = myGameArea.context;
        ctx.save();  // บันทึกสถานะของ canvas
        ctx.translate(this.x + this.width/2, this.y + this.height/2);  // ย้ายจุดเริ่มต้นของการหมุน
        ctx.rotate(this.angle);  // หมุนตามมุมที่กำหนด
        ctx.translate(-(this.x + this.width/2), -(this.y + this.height/2));  // ย้ายจุดกลับไปเริ่มต้น
        if (type == "image") 
        {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }
        else if (this.type == "text") 
        {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else
        {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
      
        ctx.restore();  // คืนสถานะของ canvas
    }   
}

var angle_bot = 0;
function rotateOnce()
{
    angle_bot++;
    myGamePiece.angle += Math.PI / 2; 
    myGameArea.clear();
    myScore.text="SCORE: "+angle_bot;
    myScore.update();
    myGamePiece.update(); 
}

function moveCharacter() {
   if(angle_bot%4==0){myGamePiece.y += -25;}
   else if(angle_bot%4==1){myGamePiece.x += 25;}
   else if(angle_bot%4==2){myGamePiece.y += 25;}
   else {myGamePiece.x += -25;}
    //myGamePiece.x += 20; // เลื่อนตามแนวแกน x ไปทางขวา 20 พิกเซล
     // เลื่อนตามแนวแกน y ไปลงล่าง 10 พิกเซล
   // myGameArea.clear();
    myScore.text="SCORE: "+angle_bot;
    myScore.update();
    myGamePiece.update(); // วาดตัวละครใหม่หลังจากเลื่อนตำแหน่ง
   
}