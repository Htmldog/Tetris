/*
一个四拼版的初始状态本质就是一个二维数组，转化后是一组位置信息组成的一维数组
*/
//"L"形四拼版
var tetromino_L=[
[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,0,0]
],

[
    [0,0,1,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]
],

[
    [1,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]
],

[
    [0,0,0,0],
    [1,1,1,0],
    [1,0,0,0],
    [0,0,0,0]
]

];
//J形四拼版
var tetromino_J=[
[
    [0,1,0,0],
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0]
],
[
    [0,0,0,0],
    [1,1,1,0],
    [0,0,1,0],
    [0,0,0,0]
],
[
    [0,1,1,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,0,0,0]
],
[
    [1,0,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]
]

];
//S形四拼版
var tetromino_S=[
[
    [0,0,0,0],
    [0,1,1,0],
    [1,1,0,0],
    [0,0,0,0]
],
[
    [0,0,0,0],
    [0,1,0,0],
    [0,1,1,0],
    [0,0,1,0]
],

];
//Z形四拼版
var tetromino_Z=[
[
    [1,1,0,0],
    [0,1,1,0],
    [0,0,0,0],
    [0,0,0,0]
],
[
    [0,1,0,0],
    [1,1,0,0],
    [1,0,0,0],
    [0,0,0,0]
]

];
//I形四拼版
var tetromino_I=[
[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
],
[
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
]

];
//O形四拼版
var tetromino_O=[
[
    [1,1,0,0],
    [1,1,0,0],
    [0,0,0,0],
    [0,0,0,0]
]

];
//T形四拼版
var tetromino_T=[
[
    [0,1,0,0],
    [1,1,1,0],
    [0,0,0,0],
    [0,0,0,0]
],
[
    [0,1,0,0],
    [1,1,0,0],
    [0,1,0,0],
    [0,0,0,0]
],
[
    [0,0,0,0],
    [1,1,1,0],
    [0,1,0,0],
    [0,0,0,0]
],
[
    [0,1,0,0],
    [0,1,1,0],
    [0,1,0,0],
    [0,0,0,0]
]

];
//四拼版总集合
var tetrominoes=[
tetromino_L,
tetromino_J,
tetromino_S,
tetromino_Z,
tetromino_I,
tetromino_O,
tetromino_T
];
