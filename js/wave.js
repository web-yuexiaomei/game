/**
 * wave.js特效类  大鱼吃食物特效
 */
// 1.创建特效类
var waveObj=function(){
    // 1.1 创建两个变量保存特效对象位置
    this.x=[];
    this.y=[];
    // 1.2 创建一个变量保存圆环半径
    this.r=[];
    // 1.3 创建一个变量保存活动状态
    this.alive=[];
}
// 2.添加初始化方法
//特效池10个圆，当大鱼吃到一个食物产生一个特效圆环
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
    for(var i=0;i<wave.num;i++){
        // 2.1 将所有圆环半径初始化为0
        this.r[i]=0;
        // 2.2 状态初始化为false
        this.alive[i]=false;
    }
}
// 3.添加绘制方法
waveObj.prototype.draw=function () {
    ctx1.save();//保存状态
    // 圆环半径20~100 状态false
        //遍历所有特效对象，获取状态为true对象
        for(var i=0;i<this.num;i++){
            if(this.alive[i]){
                ctx1.beginPath();  //开始画圆的路径
                ctx1.lineWidth=2;//设置圆环的描边的宽度
                this.r[i]+=deltaTime*0.06; //使半径由小变大
                if(this.r[i]>100){    //当半径超过100
                    this.alive[i]=false;  //当前特效对象隐藏
                    break;    //退出本次循环
                }
                var alpha=1-this.r[i]/100;
                ctx1.strokeStyle="rgba(255,215,0,"+alpha+")";
                ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);//画圆
                ctx1.closePath();//闭合圆的路径
                ctx1.stroke();//描边
            }
    }
    ctx1.restore();//恢复状态
}
//4. 产生一个活动状态圆环
//x.y 当前食物位置
waveObj.prototype.bron=function(x,y){
    // 4.1 创建一个循环，循环所有的特效对象
    for(var i=0;i<this.num;i++){
        // 4.2 判断第一个状态为false状态
        if(!this.alive[i]){
        // 4.3 将当前对象状态改为true
            this.alive[i]=true;
        // 4.4 半径改为20
            this.r[i]=20;
        // 4.5 x y 为食物的x,y
            this.x[i]=x;
            this.y[i]=y;
            // 4.6 返回该对象
            return;
        }


    }
}