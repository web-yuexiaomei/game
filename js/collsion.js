/**
 * 负责游戏碰撞检测
 * 检测大鱼和食物距离是否碰到，让食物消失
 */
function momFruitsCollision(){
    // 1.创建循环所有食物
    for(var i=0;i<fruit.num;i++){
        // 2.判断当前食物是否活动状态
        if(fruit.alive[i]){
        // 3.获取大鱼和当前食物距离
            var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
        // 4.如果距离小于900 (小于30像素)
            if(l<900){
                // 5.食物消失
                fruit.dead(i);
                wave.bron(fruit.x[i],fruit.y[i]);
            }

        }
    }

}
// 大鱼碰到小鱼
function momBabyCollistion(){
    // 1.计算大鱼与小鱼之间的距离
    var l=calLength2(mom.x,mom.y,baby.x,baby.y);
    // 2.如果两个距离小于30像素
    if(l<900){
        // 3.小鱼身体下标  =0;
        baby.babyBodyIndex=0;
    }
}