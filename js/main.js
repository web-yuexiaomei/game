// 游戏的主程序
//1:创建很多变量保存游戏所有角色
    //1.1：创建两个变量保存画布
    var can1=null; //前面画布
    var can2=null; //后面画布
   // 1.2：创建两个变量保存画笔
    var ctx1=null; //前面画布对应画笔
    var ctx2=null; //后面画布对应画笔
    //1.3：创建两个变量保存画布高度和宽度
    var canWidth=0;
    var canHeight=0;
    //1.4：创建变量保存背景图片
    var bgPic=new Image();
    //1.5创建变量保存海葵类
    var ane=null;
    //1.6创建一个变量保存食物类
    var fruit=null;
    //1.7创建两个变量，保存上一帧执行时长，保存二帧之间时间差
    var lastTime=0;
    var deltaTime=0;
    //1.8 创建变量保存大鱼对象
    var mom=null;
    //1.9 创建两个变量保存鼠标位置
    var mx=0;
    var my=0;
    //1.10 创建一个变量保存大鱼吃东西的特效
    var wave=null;
    //1.11 创建一个变量保存小鱼宝宝
    var baby=null;

//2：创建游戏入口函数 game 当前面加载成功调用game函数
    //2.1：分别调用init函数和gameloop函数
    function game(){
        init(); //初始化游戏函数
        lastTime=Date.now();//赋初始值 上一帧执行时间
        deltaTime=0; //赋初始值，二帧之间时间差
        gameloop();//使用定时器绘制游戏不同角色函数
    }
    document.body.onload=game;
//3：创建init函数：作用初始化角色（加载图片，设置大小）
function init(){
    //3.1 初始化画布
    can1=document.getElementById("canvas1");
    can2=document.getElementById("canvas2");
    //3.2 初始化画笔
    ctx1=can1.getContext("2d");
    ctx2=can2.getContext("2d");
    //3.3 初始化画布宽度和高度
    canWidth=can1.width;
    canHeight=can1.height;
    // console.log(canWidth+":"+canHeight);
    //3.4 下载背景图片
    bgPic.src="src/background.jpg"; //下载
    //3.5:创建海葵类并且调用初始化方法
    ane=new aneObj();
    ane.init();
    //3.6创建食物类并且调用初始化方法
    fruit=new fruitObj();
    fruit.init();
    //3.7 创建一个大鱼对象并且调用初始化方法
    mom=new momoObj();
    mom.init();
    //3.8 为画布绑定鼠标移动时间
    can1.addEventListener("mousemove",onMouseMove,false);
    //3.9 创建一个大鱼吃食物特效的对象并且调用初始化方法
    wave=new waveObj();
    wave.init();
    //3.10 创建一个小鱼宝宝的对象并且调用初始化方法
    baby=new babyObj();
    baby.init();
}
//4：创建gameloop函数：负责使用定时器绘制游戏不同角色
function gameloop(){
    //4.1 创建智能定时器调用gameloop
    requestAnimFrame(gameloop);
    var now=Date.now();
    deltaTime=now-lastTime;//二帧之间时间差
    lastTime=now;  //重新修改上一帧的时间
    // console.log(deltaTime);
    //4.2 绘制背景
    drawBackground();
    //4.3 调用绘制海葵方法
    momFruitsCollision();
    momBabyCollistion();//大鱼与小鱼的碰撞
    ane.draw();
    //4.4调用食物的绘制方法
    fruitMonitor();
    fruit.draw();
    //4.5 调用大鱼绘制的方法
    ctx1.clearRect(0,0,canWidth,canHeight);
    mom.draw();
    //4.6 调用大鱼吃食物特效绘制的方法
    wave.draw();
    //4.7 绘制小鱼对象
    baby.draw();
}
//5.创建全局函数获取当前鼠标位置
function onMouseMove(e){
    // 1.获取鼠标x的位置
    mx=e.offsetX==undefined?e.layerX:e.offsetX;  //浏览器兼容问题
    my=e.offsetY==undefined?e.layerY:e.offsetY;
    // console.log(mx+":"+my);

}