/**
 * 大鱼 mom.js
 */
// 1.大鱼类
var momoObj=function(){
    this.x;//保存大鱼位置
    this.y;
    this.angle;//角度
    this.bigEye=[];//大鱼的眼睛
    this.bigBody=[];//大鱼的身体
    this.bigTail=[];//大鱼的尾巴
    //大鱼眼睛图片切换所需三个变量
    this.bigEyeIndex=0;//大鱼眼睛图片下标 [0,1]
    this.bigEyeStart=1;//计时开始
    this.bigEyeEnd=2000;//终止时间

    //大鱼身体图片切换所需三个变量
    this.bigBodyIndex=0;//大鱼身体图片下标 [0,7]
    this.bigBodyStart=1;//计时开始
    this.bigBodyEnd=3000;//终止时间

    //大鱼尾巴图片切换所需三个变量
    this.bigTailIndex=0;//大鱼尾巴图片下标 [0,7]
    this.bigTailStart=1;//计时开始
    this.bigTailEnd=500;//终止时间
}
// 2.添加大鱼方法 init
momoObj.prototype.init=function(){
    // 1.初始化大鱼位置 X Y屏幕中间
    this.x=canWidth/2;
    this.y=canHeight/2;
    // 2.初始化大鱼角度0
    this.angle=0;
    // 3.初始化眼睛 身体 尾巴 图片并且下载对应图片
    for(var i=0;i<2;i++){
        this.bigEye[i]=new Image();//创建图片对象
        this.bigEye[i].src="./src/bigEye"+i+".png";//
    }
    for(var i=0;i<8;i++){
        this.bigBody[i]=new Image();
        this.bigBody[i].src="./src/bigSwim"+i+".png";
    }
    for(var i=0;i<8;i++){
        this.bigTail[i]=new Image();
        this.bigTail[i].src="./src/bigTail"+i+".png";
    }
    // console.log(this.bigTail);
}
// 3.添加大鱼方法 draw
momoObj.prototype.draw=function(){
    //3.1 大鱼位置跟随鼠标
    //3.2在main_js创建全局函数，获取鼠标位置
    // 3.2.1大鱼向鼠标慢慢移动过去
    this.x=lerpDistance(mx,this.x,0.99);
    this.y=lerpDistance(my,this.y,0.98);
    //3.2.2 修改大鱼游的角度【固定套路】四行代码
        //（1）获取大鱼和鼠标的坐标差
        var deltaY=my-this.y;
        var deltaX=mx-this.x;
        //（2）获取大鱼和鼠标角度差
        var beta=Math.atan2(deltaY,deltaX)+Math.PI;
        //（3）使用函数获取新角度给大鱼
        this.angle=lerpAngle(beta,this.angle,0.9);
    // 3.3 控制大鱼眼睛图片切换 切换16ms
    //3.4大鱼眼睛计时开始
    this.bigEyeStart=this.bigEyeStart+deltaTime;
    //3.5 如果大鱼眼睛计算超过总时长
    if(this.bigEyeStart>this.bigEyeEnd){
        //3.6 切换到下一张图片
        this.bigEyeIndex=(this.bigEyeIndex+1)%2;
        //3.7 大鱼眼睛计算清空，重新开始
        this.bigEyeStart=1;
        //如果当前下标为1 闭着眼睛 结束时间300
        if(this.bigEyeIndex==1){
            this.bigEyeEnd=300;
        }
        //如果当前下标为0，睁眼睛 结束时间 2000
        if(this.bigEyeIndex==0){
            this.bigEyeEnd=2000;
        }
    }
    //  3.8大鱼身体计时图片切换
    this.bigBodyStart=this.bigBodyStart+deltaTime;
    if(this.bigBodyStart>this.bigBodyEnd){
        this.bigBodyIndex=(this.bigBodyIndex+1)%8;
        this.bigBodyStart=1;
    }

    //  3.9大鱼尾巴计时图片切换
    this.bigTailStart=this.bigTailStart+deltaTime;
    if(this.bigTailStart>this.bigTailEnd){
        this.bigTailIndex=(this.bigTailIndex+1)%8;
        this.bigTailStart=1;
    }
    //3.10 绘制大鱼
    ctx1.save(); //保存当前画笔状态 颜色 位置
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    //绘制大鱼的身体
    ctx1.drawImage(this.bigBody[this.bigBodyIndex],
        -this.bigBody[this.bigBodyIndex].width*0.5,
        -this.bigBody[this.bigBodyIndex].height*0.5);

    //3.12绘制大鱼尾巴
    ctx1.drawImage(this.bigTail[this.bigTailIndex],
        -this.bigTail[this.bigTailIndex].width*0.5+30,
        -this.bigTail[this.bigTailIndex].height*0.5);
    //3.13 绘制大鱼眼睛
    ctx1.drawImage(this.bigEye[this.bigEyeIndex],
        -this.bigEye[this.bigEyeIndex].width*0.5,
        -this.bigEye[this.bigEyeIndex].height*0.5);
    ctx1.restore();//恢复


}