// 1.小鱼宝宝类
var babyObj=function(){
   this.x;//小鱼位置坐标
   this.y;
   this.angle;//小鱼角度
   this.babyEye=[];//小鱼眼睛
   this.babyBody=[];//小鱼身体
   this.babyTail=[];//小鱼尾巴
    this.babyEyeIndex=0;//小鱼眼睛图片下标0-1
    this.babyEyeStart=1;
    this.babyEyeEnd=2000;//小鱼眼睛图片切换时间

    this.babyBodyIndex=0;//小鱼身体图片下标 0-19
    this.babyBodyStart=1;
    this.babyBodyEnd=3000;//小鱼身体图片切换时间

    this.babyTailIndex=0;//小鱼尾巴图片下标 0-7
    this.babyTailStart=1;
    this.babyTailEnd=300;//小鱼尾巴图片切换时间
}
// 2.添加初始化方法
babyObj.prototype.init=function(){
    // 1.初始化小鱼的位置在屏幕中间x,y
    this.x=canWidth/2;
    this.y=canHeight/2;
    // 2.初始化小鱼的角度0
    this.angle=0;
    // 3.初始化小鱼眼睛的图片
    for(var i=0;i<2;i++){
        this.babyEye[i]=new Image();//创建图片对象
        this.babyEye[i].src="./src/babyEye"+i+".png";
    }
    // 4.初始化小鱼身体的图片
    for(var i=0;i<20;i++){
        this.babyBody[i]=new Image();//创建图片对象
        this.babyBody[i].src="./src/babyFade"+i+".png";
    }
    // 5.初始化小鱼尾巴的图片
    for(var i=0;i<8;i++){
        this.babyTail[i]=new Image();//创建图片对象
        this.babyTail[i].src="./src/babyTail"+i+".png";
    }
}
// 3.添加绘制方法
babyObj.prototype.draw=function(){
    // 1.保存画笔1状态
    ctx1.save();
    // 2.保存原点
    ctx1.translate(this.x,this.y);
    // 3.设置选择角度
    ctx1.rotate(this.angle);
    //3.0.1小鱼面向大鱼慢慢游动 this.x this.y
    this.x=lerpDistance(mom.x,this.x,0.99);
    this.y=lerpDistance(mom.y,this.y,0.98);
    //3.0.2 小鱼面向大鱼慢慢游动 this.angle
    // （1）距离之差
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    // （2）角度之差
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;
    // （3）返回新角度
    this.angle=lerpAngle(beta,this.angle,0.9);
    // 3.1 计算小鱼眼睛下标切换
    this.babyEyeStart=this.babyEyeStart+deltaTime;
    // 如果小鱼眼睛计算超过总时长
    if(this.babyEyeStart>this.babyEyeEnd){
        // 切换到下一张图片
        this.babyEyeIndex=(this.babyEyeIndex+1)%2;
        // 小鱼眼睛计算清空，重新开始
        this.babyEyeStart=1;
        //如果当前下标为1 闭着眼睛 结束时间300
        if(this.babyEyeIndex==1){
            this.babyEyeEnd=300;
        }
        //如果当前下标为0，睁眼睛 结束时间 2000
        if(this.babyEyeIndex==0){
            this.babyEyeEnd=2000;
        }
    }
  // 3.2 计算小鱼尾巴下标切换
    this.babyTailStart=this.babyTailStart+deltaTime;
    if(this.babyTailStart>this.babyTailEnd){
        this.babyTailIndex=(this.babyTailIndex+1)%8;
        this.babyTailStart=1;
    }
    // 3.3 计算小鱼身体下标切换
    this.babyBodyStart=this.babyBodyStart+deltaTime;
    if(this.babyBodyStart>this.babyBodyEnd){
        this.babyBodyIndex=(this.babyBodyIndex+1)%8;
        this.babyBodyStart=1;
    }
    //4.绘制小鱼身体
    var body=this.babyBody[this.babyBodyIndex];
    ctx1.drawImage(body,-body.width*0.5,-body.height*0.5);
    // 5.绘制小鱼尾巴
    var tail=this.babyTail[this.babyTailIndex];
    ctx1.drawImage(tail,-tail.width*0.5+23,-tail.height*0.5);
    // 6.绘制小鱼眼睛
    var eye=this.babyEye[this.babyEyeIndex];
    ctx1.drawImage(eye,-eye.width*0.5,-eye.height*0.5);
    // 7.恢复状态
    ctx1.restore();
}
// 4.将小鱼宝宝类添加main.js

// 5.将baby.js 添加index.html