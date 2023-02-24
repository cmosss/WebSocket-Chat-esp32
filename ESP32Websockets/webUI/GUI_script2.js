var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var i=0;
var map_x =16;
var map_y =8;
var bot_x=0;
var bot_y=0;
//********************************************************************* */
//let num_stamp = Array.from({length: map_x}, () => new Array(map_y));
var num_stamp = new Array(map_x+1);
for (let x = 0; x <= map_x; x++) {
  num_stamp[x] = new Array(map_y+1);
}
//********************************************************************* */
var walls = [];
for (let i = 0; i <= map_x; i++) {
  walls[i] = [];
  for (let j = 0; j <= map_y; j++) {
    walls[i][j] = {
        row: 0,
        col: 0,
    };
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////##########################################################################################################################################
const HWGamePiece = ( (canvas.width/map_x)+(canvas.height/map_y))*0.3;
//console.log( HWGamePiece);
var myGamePiece=new component(HWGamePiece , HWGamePiece , "1224273.png",0,0, "image");
bot_move(0,0,0);
function  clear()
{
 canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
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
    this.update = function() 
    {
        ctx = canvas.getContext("2d");
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
function  SET_GRID()
    {
    // กำหนดขนาดของ Grid
    var gridSize = 50;
    // กำหนดสีพื้นหลังเป็นสีขาว
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // วาดเส้นกริดสีเทา
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;
    // วาดแนวตั้ง
    for (var x = 0; x <= canvas.width; x += (canvas.width/map_x)) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    // วาดแนวนอน
    for (var y = 0; y <= canvas.height; y += (canvas.height/map_y)) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke(); 
    }
function bot(ary)
{
 bot_x=ary[0];
 bot_y=ary[1];
 bot_move(ary[0],ary[1],ary[2]);
}
function set_wall(x,y)
{  
     const x_size=canvas.width/map_x;
     const y_size=canvas.height/map_y;
     ctx = canvas.getContext("2d");
     const element = document.getElementById('wall_color');
     const style = window.getComputedStyle(element);
     ctx.strokeStyle = style.getPropertyValue('color');
     ctx.lineWidth =(x_size+y_size)/40;
     ctx.beginPath();
        if(walls[x][y].row==1)
        {
            ctx.moveTo( x_size*x, y_size*y);
            ctx.lineTo(x_size*(x+1),y_size*y);
        }
        if(walls[x][y].col==1)
        {
            ctx.moveTo( x_size*x, y_size*y);
            ctx.lineTo(x_size*x,y_size*(y+1));
        }
        ctx.stroke(); 
}
function set_walls()
{
    for (let i = 0; i <= map_x; i++) 
    {
        for (let j = 0; j <= map_y; j++) 
        {
         set_wall(i,j);
        }
      } 

}

function bot_move(x,y,d)
{  
    var ix =(canvas.width/map_x)*x+(canvas.width/map_x)/2-myGamePiece.width/2;
    var iy =(canvas.height/map_y)*y+(canvas.height/map_y)/2-myGamePiece.height/2;
    //0  1   2    3
    myGamePiece.angle = (d*90)*Math.PI /180;  
    myGamePiece.x=ix;
    myGamePiece.y=iy;
    clear();
    SET_GRID();
    set_walls();
    update_num_stamp();
    myGamePiece.update(); 
}
//#:0:0:0:1:0:0
function  update_num_stamp()
{
    for (let x = 0; x <= map_x; x++) 
    {
        for (let y = 0; y <= map_y; y++) 
        {
            if (typeof num_stamp[x] !== 'undefined' && typeof num_stamp[x][y] !== 'undefined') 
            {
                numstamp(num_stamp[x][y], x, y);
            }
        }
      } 
}

function numstamp(text,x,y)
{
    const x_size=canvas.width/map_x;
    const y_size=canvas.height/map_y;
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    //console.log(((canvas.height/map_y)-myGamePiece.width)/2);
    const fontSize = canvas.width/map_x/2.5;
    // กำหนดฟอนต์และขนาดอักษร
    ctx.font = `${fontSize}px Arial`; // กำหนด font size แบบไดนามิกเป็นพิกเซล
    const textWidth = ctx.measureText(text).width;
    let _mapx = ((canvas.width/map_x) / 2 - textWidth/2)+((canvas.width/map_x)*x);
    let _mapy = ((canvas.height/map_y)/2 + (fontSize/Math.PI))+((canvas.height/map_y)*y);
    ctx.fillStyle = '#000000'; // กำหนดสีของตัวอักษร
    if(bot_x==x && bot_y==y)
    {
      // console.log(bot_x,bot_y);
       const fontSize = ((canvas.height/map_y)-myGamePiece.width)/2;
       ctx.font = `${fontSize}px Arial`; // กำหนด font size แบบไดนามิกเป็นพิกเซล
       const textWidth = ctx.measureText(text).width;
       _mapx = ((canvas.width/map_x)*x)+(x_size+y_size)/40;
       _mapy = ((canvas.height/map_y)-(x_size+y_size)/30)+((canvas.height/map_y)*y);
     } 
    // คำนวณตำแหน่ง X ของข้อความ
    // คำนวณตำแหน่ง Y ของข้อความ
    //const y = canvas.height / 2;
    //console.log(y);
    // วาดข้อความ
    ctx.fillText(text, _mapx,_mapy); 
}
function rotateOnce()
{
  /*
    for (let x = 0; x <= map_x; x++) 
    {
        for (let y = 0; y <= map_y; y++) 
        {
            num_stamp[x][y]= Math.floor(Math.random() * 999) + 1;
        }  
    }*/
  //  bot_move(0,0,0);
}
var K=0;
function moveCharacter() 
{
    K++;
    ws.send(`#:${K-1}:0:1:1:0:1:${K}`);
   // alert("555");
   /* numstamp("000",0,0);
    numstamp("000",0,1);
    numstamp("000",0,2);
    numstamp("000",0,3);
    numstamp("000",0,4);*/
   // set_walls();
   // console.log(walls);
}

