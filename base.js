//全局变量
var siteCol =10;
var boxs = J_site.getElementsByTagName("i");
var solidBoxCls = "noEmpty";
var boxsColor=[
    "noEmpty",
    "noEmpty1",
    "noEmpty2"
]
//获取当前四拼版的颜色
var colorIndex=0;
function getTetrominoColor(){
    colorIndex++;
    if(colorIndex>2){
        colorIndex=0;
    }
    solidBoxCls=boxsColor[colorIndex];
}
//基类方法，把x,y坐标信息变成index下标信息
function xyToIndex(x,y){
    return y * siteCol + x;
}
//基类方法，填充指定x,y坐标处的单元格
function drawBox(x,y){
    var index = xyToIndex(x,y);
    if(boxs[index]){
        boxs[index].className=solidBoxCls;
    }  
}
//基类方法，将原始的2维数组4拼版变成方便操作的1维数组4拼版
function initTetromino(arr){
    var arrPos=[];
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(arr[i][j]==1){
                var o={};
                o.x=j;
                o.y=i;
                arrPos.push(o);
            }
        }
    }
    return arrPos;
}
//基类方法，绘制一个四拼版，操作对象为1维数组表示的4拼版
function drawTetromino(arr){
    for(var i=0;i<4;i++){
        drawBox(arr[i].x,arr[i].y);
    }
}
//将指定四拼版移动到指定x,y坐标处，操作对象为1维数组表示的4拼版
function moveTetrominoByXY(arr,x,y){
    var newTetromino=[];
    for(var i=0;i<4;i++){
        var o={};
        o.x=arr[i].x + x;
        o.y=arr[i].y + y;
        newTetromino.push(o);
    }
    return newTetromino;
}
//将指定四拼版在指定x,y坐标处绘制
function drawTetrominoByXY(arr,x,y){
    var tetro = moveTetrominoByXY(arr,x,y);
    var temp = moveTetrominoByXY(arr,move_x,move_y_old);
    var state = isOutOfBounds(tetro);
    if(state=="outY"){
        clearInterval(window.dropTimer);
        drawTetromino(temp);
        translateTetrominoToSolid();
        dropBoxSomeLine();
        initDrop();
    }
    if(state=="noOut"){
        //若没有超出边界，应该先判断是否发生碰撞，
        //没有发生才执行drawTetromino(tetro)
        //若发生temp = moveTetrominoByXY(arr,move_x,move_y_old);drawTetromino(temp);initDrop();
        // drawTetromino(tetro);
        if(isCrash(temp)){
            clearInterval(window.dropTimer);
            drawTetromino(temp);
            translateTetrominoToSolid();
            dropBoxSomeLine();
            initDrop();
        }else{
            drawTetromino(tetro);
        }
    }
    if(state=="outX"){
        move_x = move_x_old;
        temp = moveTetrominoByXY(arr,move_x_old,move_y);
        drawTetromino(temp);
    }
}
//清场方法
function clearSite(){
    var temp;
    for(var i=0;i<200;i++){
        temp=boxs[i];
        if(temp.getAttribute("state")!=1){
            temp.className="";
        }
    }
}
//越界判断
function isOutOfBounds(arr){
    var temp;
    for(var i=0;i<4;i++){
        temp = arr[i];
        if(temp.x<0||temp.x>9){
            return "outX";
        }
        if(temp.y>19){
            return "outY";
        }
    }
    return "noOut";
}
//将指定四拼版下落
function dropTetromino(){
    window.dropTimer=setInterval(function(){
        if(isGameOver()){
            clearInterval(window.dropTimer);
            dirKey=false;
            return;
        }
        clearSite();
        move_y_old = move_y;
        move_y++;
        drawTetrominoByXY(curOpeTetromino,move_x,move_y);
    },dropTimerTime);
}
//判断一个四拼版的最大y值
function _getMaxY(arr){
    var maxY=arr[0];
    for(var i=0;i<3;i++){
        if(maxY.y<=arr[i+1].y){
            maxY=arr[i+1];
        }
    }
    return maxY;
}
function getMaxY(arr){
    var arrMaxY=[];
    var maxY = _getMaxY(arr);
    for(var i=0;i<4;i++){
        if(arr[i].y==maxY.y){
            arrMaxY.push(arr[i]);
        }
    }
    return arrMaxY;
}
//判断一个四拼版有么有发生碰撞
function isCrash(arr){
    var maxYBoxs=getMaxY(arr);
    var nextBox={};
    for(var i=0,len=maxYBoxs.length;i<len;i++){
        nextBox.x=maxYBoxs[i].x;
        nextBox.y=maxYBoxs[i].y+1;
        if(nextBox.y<=19){
            var nextBoxIndex=xyToIndex(nextBox.x,nextBox.y);
            var nextBoxState=boxs[nextBoxIndex].getAttribute("state");
            if(nextBoxState==1){
                clearInterval(window.dropTimer);
                translateTetrominoToSolid();
                dropBoxSomeLine();
                dirKey=false;
                return true;
            }
        }       
    }
    return false;
}
//旋转四拼版
function rotateTetromino(){
    curRotateIndex++;
    if(curRotateIndex>curRotateLength-1){
        curRotateIndex=0;
    }
    curOpeTetromino = initTetromino(curTetromino[curRotateIndex]);
    clearSite();
    drawTetrominoByXY(curOpeTetromino,move_x,move_y);
}
//计算要消除的行数
function countNeedDelBox(){
    var index;
    var temp;
    var count;
    var score=0;
    var result={};
    for(var y=19;y>-1;y--){
        count=0;
        for(var x=0;x<10;x++){
            index = xyToIndex(x,y);
            temp=boxs[index];
            if(temp.getAttribute("state")==1){
                count++;
            }
        }
        if(count==10){
            score++;
            if(!result.startLine){
                result.startLine=y;
            } 
        }
    }
    result.score=score;
    return result;
}
//四拼版碰撞静止后，改变其state状态
function translateTetrominoToSolid(){
    var index;
    var temp;
    for(var x=0;x<10;x++){
        for(var y=19;y>-1;y--){
            index = xyToIndex(x,y);
            temp=boxs[index];
            if(temp.className!=""&&temp.getAttribute("state")!=1){
                temp.setAttribute("state",1);
            }
        }
    }
}
//消除指定行
function delOneLineBox(n){
    var index;
    var temp;
    for(var i=0;i<10;i++){
        index = xyToIndex(i,n);
        temp=boxs[index];
        temp.className="";
        temp.setAttribute("state","");
    }
}
//返回实心单元下落指定行后的下标
function getNeedDropBox(n,startLine){
    var index,index2;
    var temp,temp2;
    var arr=[];
    for(var x=0;x<10;x++){
        for(var y=startLine;y>-1;y--){
            index = xyToIndex(x,y);
            temp = boxs[index];
            if(temp.getAttribute("state")==1){
                temp.className="";
                temp.setAttribute("state","");
                index2 = xyToIndex(x,y+n);
                arr.push(index2);
            }
        }
    }
    return arr;
}
//绘制实心单元下落后的状态
function drawAfterDrop(arr){
    var temp;
    for(var i=0,len=arr.length;i<len;i++){
        temp = boxs[arr[i]];
        temp.className=solidBoxCls;
        temp.setAttribute("state",1);
    }
}
//满格消行
function dropBoxSomeLine(){
    var count=1;
    var result = countNeedDelBox();
    var line = result.score;
    var startLine = result.startLine;
    var temp =startLine;
    if(!line)return;
    //消除满格行
    for(var i=0;i<20;i++){
        if(count>line){
            break;
        }
        delOneLineBox(startLine);
        startLine--;
        count++;
    }
    //下落
    var arr = getNeedDropBox(line,temp);
    drawAfterDrop(arr);
    //显示分数
    var temp = parseInt(J_score.innerHTML);
    J_score.innerHTML=line*10+temp;
}
//判断游戏是否结束(是否顶到上边界)
function isGameOver(){
    var temp,index,count=0;
    for(var j=0;j<20;j++){
        for(var i=0;i<10;i++){
            index = xyToIndex(i,j);
            temp=boxs[index];
            if(temp.className!=""){
                count++;
                break;
            }
        }
    }
    if(count==20){
        console.log("game over");
        return true;
    }else{
        return false;
    }
}
//获取指定范围随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}
//随机获取一个四拼版
function getTetrominoRandom(){
    var index = random(0,7);
    return tetrominoes[index];
}
//重新开始坠落
function initDrop(){
    curRotateIndex=0;
    curTetromino=getTetrominoRandom();
    curRotateLength=curTetromino.length;
    curOpeTetromino = initTetromino(curTetromino[curRotateIndex]);
    getTetrominoColor();
    move_x_old = move_x=0;
    move_y_old = move_y=0;
    drawTetromino(curOpeTetromino);
    dropTetromino();
    dirKey=true;
}

//一个实际被操作的4拼版
var curTetromino;
var curRotateIndex=0;
var curRotateLength;
var curOpeTetromino;
initDrop();

