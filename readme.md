##1、体现速度有2种方式：
###1.2、定时器间隔减小
###1.2、步长增大
###对俄罗斯方块这种来讲，只能采取1.2，因为步长增大跳过了一些单元格
##2、断点断不住定时器？！
##3、偶尔会出现四拼版穿透已经静止的四拼版的情况，原因不明！！
###可能原因：判断碰撞失效！！！！isCrash
###3.1、getTetrominoRandom(),调试语句283
##4、功能稳定bug处理后，用seajs模块化
##5、websocket多人竞技俄罗斯方块
