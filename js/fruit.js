/**
 * 创建食物（果实类）
 */
// 1.创建果实类
var fruitObj=function(){
    // console.log(1);
    this.alive=[];//保存当前食物是否活动 值为：true/false
    this.orange=new Image(); //橘色图片
    this.blue=new Image();   //蓝色图片
    this.x=[];              //食物位置
    this.y=[];              //食物位置
    this.spd=[]; //食物速度（生长，向上漂浮）
    this.fruitType=[];   //食物类型
    this.l=[];   //食物的宽度
}
// 2.添加属性
fruitObj.prototype.num=30;
// 3.添加初始化方法
fruitObj.prototype.init=function(){
    //3.1.创建循环30次
    for(var i=0;i<this.num;i++){
        //3.2 为属性赋值操作
        // 3.3 所有食物活动
        this.alive[i]=false;
        // 3.4 x和y随机
        this.x[i]=0;
        this.y[i]=0;
        //3.5 随机速度
        this.spd[i]=Math.random()*0.017+0.003;
        //3.6 为食物类型赋值，fruitType 蓝色多，橘色少
        this.fruitType[i]=Math.random()<0.9?"blue":"orange";
        //3.7 食物宽度
        this.l[i]=0;
    }
    //3.8 下载两张图片
    this.orange.src="./src/fruit.png";
    this.blue.src="./src/blue.png";
}
// 4.添加绘制方法
fruitObj.prototype.draw=function(){
    // 1.创建循环 （30个食物）
    for(var i=0;i<this.num;i++){
        // 2.判断当前的食物状态是否是活动的
        if(this.alive[i]){
            // 3.如果当前食物的宽度小于14变大 this.l
            if(this.l[i]<14){
                this.l[i]+=this.spd[i]*deltaTime;

            }else{
                // 4.大于14向下  this.y-
                this.y[i]-=this.spd[i]*3*deltaTime;
            }
            // 5.判断当前食物蓝色保存图片
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            }
            // 6.绘制图片
            ctx2.drawImage(pic,this.x[i],this.y[i],this.l[i],this.l[i]);
        }
        //7:当前食物如果漂出屏幕，让当前食物为false
        if(this.y[i]<0){
            this.dead(i);
        }
    }
}
//将当前食物状态修改为不活动
fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
}
    /*
    食物生长函数
    随机获取海葵，以及海葵的X,Y设置食物的X,Y
    食物宽度，状态，类型
    * */
    fruitObj.prototype.born=function(i){
        // 1.随机获取一个海葵
        var aneID=parseInt(Math.random()*ane.num);
        // 2.获取海葵X 设置当前食物X
        this.x[i]=ane.x[aneID];
        // 3.获取海葵Y 设置当前食物Y
        this.y[i]=canHeight-ane.len[aneID];
        // 4.设置当前食物宽度
        this.l[i]=0;
        // 5.设置当前食物状态
        this.alive[i]=true;
        // 6.设置当前食物类型
        this.fruitType[i]=Math.random()<0.9?"blue":"orange";
    }
    //该函数作用：监听画布上食物个数，如果当前画布上食物小于15个，产生食物
    function fruitMonitor(){
        // 1.创建变量保存累加和：   活动状态食物数量
        var count=0;
        // 2.创建循环获取每一个食物
        for(var i=0;i<fruit.num;i++){
            // 3.判断当前食物是否活动状态
            if(fruit.alive[i]){
                // 4.是活动状态累加器加一
                count++;
            }
        }
        // 5.循环外
        // 6.如果当前食物累加器结果小于15
        if(count<15){
            // 7.产生一个活动食物
           sendFruit();
            return;
        }
    }
    //该函数作用：获取所有食物并且从不活动食物中挑选出一个食物为活动食物
    function sendFruit() {
        // 1.创建状态所有食物
        for(var i=0;i<fruit.num;i++){
        // 2.查找当前状态为false食物
            if(!fruit.alive[i]){
            // 3.设置食物所有状态和数据（x,y,l,spd）
                fruit.born(i);
                return;
            }
        }
    }