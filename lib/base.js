
import {
    kernel_1,
    kernel_2,
    kernel_arr_6,
}  from './kernel.js';


/**
 * 求解两点直线方程的一般式：ax+by+c=0
 * @param {Point} sp - the start point
 * @param {Point} ep - the end point
 * @return {array} a,b,c
 * |/|a|b|c|
 * |--|--|--|--|
 * |index|0|1|2|
 */
function SolveLineForm(sp,ep){
    let m=sp.x-ep.x;
    let n=sp.y-ep.y;
    let a = m;
    let b = -n;
    let c = n*ep.x - m*ep.y;
    let reslist=[a,b,c];
    return reslist;
}

/**
 * 判断点是否在直线上 直线方程是一般式： ax + by + c = 0
 * @param {number} a 
 * @param {number} b
 * @param {number} c
 * @param {Point} p 
 * @return {Boolean} 返回布尔类型的值 若在点上则为true
 */
function IsPointonLine(a,b,c,p){
    let n=a*p.x + b*p.y + c;
    if(n===0){return true;}
    else{return false;}
}

/**
 * 求解 ax+by+c=0 直线外一点到该直线的距离 
 *  公式 |ax+by+c|/sqrt(a^2+b^2)
 * @param {Point} sp - the start point
 * @param {Point} ep - the end point
 * @param {Point} op - 直线外一点
 * @return {number} 返回点到直线的距离
 */
 function getPoint2LineDistence(sp,ep,op){
    let fun = SolveLineForm(sp,ep);
    let x = op.x;
    let y = op.y;
    let a=fun[0];
    let b=fun[1];
    let c=fun[2];
    let up = Math.abs(a*x+b*y+c);
    let down = Math.sqrt(a*a+b*b);
    return up/down;
}

/**
 * 求连续三个带坐标点的时针性(亦可判断三点共线)
 *  原理：
 * *  area = (b.x-a.x) * (c.y-a.y) - (b.y-a.y) * (c.x-a.x) 
 *  * area >0，A-B-C逆时针旋转； 
 *  * area <0，A-B-C顺时针旋转； 
 *  * area =0，A-B-C在一条直线上。
 * @param {Point} a - the first point
 * @param {Point} b - the middle point
 * @param {Point} c - the last point
 * @return {number} - the output list
 * 
 | 逆时针 | 顺时针 | 共线 | other |
 |--|--|--|--|
 | 1 | 2 | 3 |-1|
 */
function getClockwiseFea(a,b,c){
    let area = (b.x-a.x) * (c.y-a.y) - (b.y-a.y) * (c.x-a.x) ;
    //(b.getX()-a.getX()) * (c.getY()-a.getY()) - (b.getY()-a.getY()) * (c.getX()-a.getX());

    if ( area > 0 ) {
        return 1;
    }
    else if (area < 0) {
        return 2;
    }
    else if ( area === 0){
        return 3;
    }
    else {return -1;}
}

/**
 * 点类型 （x，y） 绑定了一些常用算法
 */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        return this.x;
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        return this.y;
    }

    /**
     * Get the x,y value.
     * @return {Array} [x,y]
     */
    getXY() {
            return [this.x,this.y];
    }

    /**
     * 计算欧氏距离(Euclidean Distance)
     * functionname_()表示对某对象的运算
     * @param {Point} InPoint - 输入点对象
     * @return {number} - 返回两点间的欧氏距离
     */
    getEuclideanDistance_(InPoint) {
        return Math.sqrt(kernel_1(this.x,InPoint.x)+kernel_1(this.y,InPoint.y));
    }
    
    /**
     * 曼哈顿距离(Manhattan Distance) Chebyshev distance
     * @param {Point} InPoint - 输入点对象
     * @return {number} - 返回两点间的曼哈顿距离
     */
       getManhattanDistance_(InPoint) {
        return kernel_2(this.x,InPoint.x)+kernel_2(this.y,InPoint.y);
    }

    /**
     * 切比雪夫距离(Chebyshev distance) : max(|a-b|...)
     * @param {Point} InPoint - 输入点对象
     * @return {number} - 返回两点间的切比雪夫距离
     */
     getChebyshevDistance_(InPoint) {
        return Math.max(kernel_2(this.x,InPoint.x)+kernel_2(this.y,InPoint.y));
        
    }

    /**
     * 简化闵氏距离(Minkowski Distance) : (｜a-b｜^p+...)^(1/p)
     * @param {Point} InPoint - 输入点对象
     * @param {number} p - 闵氏距离的维度
     * @return {number} - 返回两点间的闵氏距离
     */
    getMinkowskiDistance_(InPoint,p) {
        return Math.pow(
                Math.pow(kernel_2(this.x,InPoint.x),p)+
                Math.pow(kernel_2(this.y,InPoint.y),p),
                Math.pow(p,-1)
                );
            
        }

    /**
     * 计算以该点为开始点与输入点构成向量关于x正半轴构成的夹角 范围0~360
     * functionname_()表示对某对象的运算
     * @param {Point} InPoint - 输入点对象
     * @return {number} - 返回角度
     */
     getAngle_(InPoint) {
        let po1=this.getXY();
        let po2=InPoint.getXY();
        return kernel_arr_6(po1,po2);
    }

    /**
     * 计算该点到某直线（始点，终点）距离
     * @param {Point} sp - 始点
     * @param {Point} ep - 终点
     * @return {number} 本点到这条直线的距离
     */
    getDistance2Line_(sp,ep){
        return getPoint2LineDistence(sp,ep,this);
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * 将由逗号隔开的一对数字解析为点对象。
     * 类（class）通过 static 关键字定义静态方法。不能在类的实例上调用静态方法，而应该通过类本身调用。
     * 这些通常是实用程序方法，例如创建或克隆对象的功能。
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        let xy= str.split(',');
        let point=new Point(xy[0], xy[1]);
        return point;
    }
}

/**
 * 简单线类 （直线段） 仅有始末点组成
 */
 class SimpleLine {

    /**
     * Create a simpleline
     * @param {Point} sp - the start point
     * @param {Point} ep - the end point 
     */
     constructor(sp,ep) {
        this.sp = sp;
        this.ep = sp;
        this.pointlist = [sp,ep];
    }

    /**
     * Get the pointlist.
     * @return {array} The point list.
     */
     getSimpleLine() {
        return this.pointlist;
    }

    /**
     * Get the startpoint.
     * @return {Point} The start point.
     */
     getStartPoint() {
        return this.sp;
    }

    /**
     * Get the endpoint.
     * @return {Point} The end point.
     */
    getEndPoint() {
        return this.ep;
    }
    
    /**
     * 在不考虑地理意义的情况下求解线到点的距离。
     * - get the (math)distance from the line to point.
     *  -    __math__ means DO NOT CONSIDER THE REAL CONDITION
     * @param {Point} op - 直线外一点
     * @return {number} distance
     */
    getMathDistance2Point_(op) {
        let dis = getPoint2LineDistence(this.sp,this.ep,op);
        return dis;
    }

    /**
     * 获取该点一般式的系数.
     * - get a,b,c of __ax+by+c=0__ .
     * @return {array} 
     * |/|a|b|c|
     * |--|--|--|--|
     * |index|0|1|2|
     */
    getMathFrom(){
        let res = this.SolveLineForm(this.sp,this.ep)
        return res;
    }

    /**
     * 数学意义 ：判断某点是否在线上。
     * * (math) : is the in_point on the simple line .
     * * __math__ means __DO NOT CONSIDER THE REAL CONDITION__
     * @param {Point} op - the point .
     * @return {boolean} the result .
     */
    IsPointOnLine_(op){
        let mathform = this.getMathFrom();
        let a = mathform[0];
        let b = mathform[1];
        let c = mathform[2];
        let res = IsPointonLine(a,b,c,op);
        return res;
    }


}


/**
 * (折线)线类型 由不重复的 顺序点列表构成
 */
class Line {
    /**
     * Create a line
     * @param {array} pointlist - The point list.
     */
     constructor(pointlist) {
        this.pointlist = pointlist;
        this.sp = pointlist[0];
        this.ep = pointlist[pointlist.length-1];
    }

    /**
     * 延长该线 即向点列末尾追加点 注意 最好不要与原有的点重复
     * @param {Point} point - the new end point
     */
    extendLine(point) {
        this.pointlist.push(point);
        this.ep = point;
    }

    /**
     * Get the pointlist.
     * @return {array} The point list.
     */
     getLine() {
        return this.pointlist;
    }

    /**
     * Get the startpoint.
     * @return {Point} The start point.
     */
     getStartPoint() {
        return this.sp;
    }

    /**
     * Get the endpoint.
     * @return {Point} The end point.
     */
    getEndPoint() {
        return this.ep;
    }

     /**
     * 获取道格拉斯扑克法抽稀后的子集 不改变自身
     * @param {number} thresh - 道格拉斯扑克法的阈值 用于调节抽稀程度 
     * @return {array} 道格拉斯扑克法抽稀后的子集
     */
    getSubSetByDP(thresh){
        let res = Douglas_Peuker(this.pointlist,thresh);
        return res;
    }

    /**
    * * 线一分为二 [sp,mp1,mp2,mp3,op] 
    * @param {number} index - 切分位置的索引 注意切分处的点会被重复两次 也就是说最小单元是两点构成的直线
    * @return {object} 例如从索引为1开始切分{ firstline ;[[sp,mp1],secondline: [mp1,mp2,mp3,op]}
    */
    getTwoSubLineFromInx(index){
        let obj = getTwoLineFromeOne(this.pointlist,index);
        return obj;
   }

     
}

/**
 * 散点集 
 */
class PointSet{

    /**
    * Create a pointset
    * @param {array} pointlist - The point list.
    */
    constructor(pointlist) {
        this.pointset = pointlist ;
    }

    /**
     * Get the pointset
     * @return {array} The pointlist
     */
     getPointSet() {
        return this.pointset;
    }

    /**
    * Get the convexhull of the pointset
    * @return {array} The convexhull
    */
    getConvexHull(){
        let coch = getconvex_hull(this.pointset);
        return coch;
    }



}
/**
 * Class representing a dot.
 * 类的继承示例。
 * @extends Point
 */
 class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        super(x, y);
        this.width = width;
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        return this.width;
    }
}

/** 
* 点集凸包算法
* @param {array} pointlist1 - 点集列表
* @return {array} - 构成凸包的点列表
*/
function getconvex_hull(pointlist1){
    let pointlist=pointlist1;
    let reslist=[];
    pointlist.sort((a, b) => a.y - b.y); // 1. 依照升降序排列
    //console.log(pointlist);
    let p0=pointlist.shift(); // 取第一个点
    reslist.push(p0);
    pointlist.sort((a, b) => p0.getAngle_(a) - p0.getAngle_(b)); // 依照与p0连线的角度值升序排序 
    reslist.push(pointlist.shift());    
    for(let i=0;i<pointlist.length;i++){
        // get the two points on the stack head
        let polast=reslist[reslist.length-1];
        let poseclast=reslist[reslist.length-2];
        let ponow=pointlist[i];
        if(getClockwiseFea(poseclast,polast,ponow)===1){// 若逆时针则将该点压入栈中
            reslist.push(pointlist[i]);
        }
        else { //否则将栈顶元素推出
            reslist.pop();
        }
    }
    return reslist;
}

/** 
* 点集 单向Hausdorff 距离算法
* @param {array} a - 点集列表
* @param {array} b - 点集列表
* @return {number} - Hausdorff（a,b）
* 即：对于a点集中的每一点找寻其到b点集中的最小距离 然后在这些距离中取最大值
*/
function getunidirectionalHausdorffDistance(a,b){
    let a1=a;
    let b1=b;
    let a_b=[];
    let mindic=[];
    for( let i=0;i<a1.length;i++){
        let p0=a1[i];
        for (let j=0;j<b1.length;j++){
            let p1=b1[j];
            a_b.push(p0.getEuclideanDistance_(p1));
        }
       // console.log(a_b);
        mindic.push(Math.min(...a_b)) //对于a点集中的每一点找寻其到b点集中的最小距离
        a_b=[];
    }
    return Math.max(...mindic); // 然后在这些距离中取最大值
}

/** 
* 点集 双向Hausdorff 距离算法
* @param {array} a - 点集列表
* @param {array} b - 点集列表
* @return {number} - bidirectionalHausdorff（a,b）
* 即：max(Hausdorff（a,b）,Hausdorff（b,a）)
*/
function getbidirectionalHausdorffDistance(a,b){
    return Math.max(
        getunidirectionalHausdorffDistance(a,b),
        getunidirectionalHausdorffDistance(b,a)
    )
}

/**
 * 线一分为二 [sp,mp1,mp2,mp3,op] 
 * @param {array} line - 要一分为二的线
 * @param {number} index - 切分位置的索引
 * @return {object} 例如从索引为1开始切分{ firstline ;[[sp,mp1],secondline: [mp1,mp2,mp3,op]}
 */
function getTwoLineFromeOne(line,index){
    
    return {
        firstline:line.slice(0,index+1),
        secondline:line.slice(index,line.length+1)
    }
}
/**
 * 道格拉斯扑克法的递归算子
 * @param {array} line - 输入的点列 [ 起点 , 中间点 , 终点 ]
 * @param {number} n - 阈值
 * @param {array} ouarr - 递归结果存储栈
 */
function Douglas_Peuker_kernel(line,n,ouarr){
    //
    let line1 = line.slice();
    let sp=line1.shift();
    let ep=line1.pop();

    if (line1.length === 0){
        //console.log(line);
        ouarr.push(line);
    }
    else{
        //let v_line=[sp,ep]; // 假想一条连接头尾的线
        line1.sort((a,b)=>a.getDistance2Line_(sp,ep)-b.getDistance2Line_(sp,ep));// 根据到中间点到该线的距离升序排序
        //console.log(line1);
        let midpoint = line1[line1.length-1]; //获取中间的分段点
        let m = line.indexOf(midpoint); 

        if( midpoint.getDistance2Line_(sp,ep)< n){
            //console.log([sp,ep]);
            //return [sp,ep];
            ouarr.push([sp,ep]) ;
        }
        else {
            let obj=getTwoLineFromeOne(line,m);
            Douglas_Peuker_kernel(obj.firstline,n,ouarr);
            Douglas_Peuker_kernel(obj.secondline,n,ouarr);
        }
    }
   
}
/**
 * 线抽稀算法 道格拉斯扑克法
 * @param {array} line - 输入的点列 [ 起点 , 中间点 , 终点 ]
 * @param {number} n - 阈值
 * @return {array} 返回抽稀后的点列
 */
 function Douglas_Peuker(line,n){
    let ouarr= [];
    Douglas_Peuker_kernel(line,n,ouarr);
    // 数据处理部分 去重
    let resarr=[];
    for (let it of ouarr){
        resarr.push(it[0]);
    }
    resarr.push(ouarr[ouarr.length-1][1]);
    //console.log(ouarr);
    return  resarr;
 }

export{ Point,Line,SimpleLine,PointSet }