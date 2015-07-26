//全局变量
var move_x=0;
var move_x_old=0;
var move_y=0;
var move_y_old=0;
var dirKey=true;
//坠落定时器间隔时间
var dropTimerTime=1000;
//方向键
document.onkeydown=function(event){
    if(!dirKey){
        return;
    }
    var e = event || window.event;
    if(e && e.keyCode==38){//上
        console.log("up");
        rotateTetromino();
    }
    if(e && e.keyCode==39){//右
        console.log("right");
        move_x_old=move_x;
        move_x++;
        clearSite();
        drawTetrominoByXY(curOpeTetromino,move_x,move_y);
    }
    if(e && e.keyCode==37){//左
        if(!dirKey){
            return;
        }
        console.log("left");
        move_x_old=move_x;
        move_x--;
        clearSite();
        drawTetrominoByXY(curOpeTetromino,move_x,move_y);
    }
    if(e && e.keyCode==40){//下
        console.log("down");
        if(dropTimerTime==100){
            return;
        }
        clearInterval(window.dropTimer);
        dropTimerTime=100;
        dropTetromino();
    }
}; 
document.onkeyup=function(){
    if(!dirKey||dropTimerTime==1000){
        return;
    }
    console.log("up");
    clearInterval(window.dropTimer);
    dropTimerTime=1000;
    dropTetromino();
}