import { kernel_5 }  from '../lib/kernel.js';
import { Point,PointSet,Line,SimpleLine }  from '../lib/base.js';

/**
 * 测试函数 ：生成单个随机点 点的范围是[0,a]
 * @param {number} a - 随机范围的上限
 * @return {Point} - 返回的单个点对象 
 */
 function test_1(a){
    let x= kernel_5(a) ;
    let y= kernel_5(a);
    let point =new Point(x,y);
    return point;
 }

 /**
 * 测试函数 ：生成随机点集
 * @param {number} n - 点集大小
 * @param {number} a - 随机范围的上限
 * @return {array} - 返回的点集列表 
 */
  function test_2(n,a){
    let reslist=[];
    for(let i=0;i<n;i++){
        reslist.push(test_1(a));
    }
    return reslist;
 }


 /**
 * parse function of getClockwiseFea
 * @param {number} a - the result of getClockwiseFea
 * @return {string} - the name of each code
 */
function parser_1(a){
    res="";
    switch (a){
        case 1 :
            res="逆时针" ;
            break;
        case 2 :
            res="顺时针" ;
            break;
        case 3 :
            res="共线" ;
            break;
        case -1:
            res="error";
        default:
            res="error";
    }
    return res;
}

export {
    test_1,
    test_2
}

//line class test part
//let pol=test_2(50,100);
//let ps = new PointSet(pol);
//let pp = test_1(190) ;
//console.log(ps.getConvexHull());
/*
console.log(line.getLine());
console.log(line.getStartPoint());
console.log(line.getEndPoint());
line.extendLine(pp)
console.log(line.ep);
console.log(line.getEndPoint());
*/


/* class point test part
  
//point1=new Point(1,1);
//point2=new Point(8,9);
//console.log(point1.getMinkowskiDistance_(point2,1));
//console.log(point1.getChebyshevDistance_(point2));
//console.log (point2.getX());
//console.log (point2.getY());
 */

// not importent part
//var numbers = require('numbers');
//暂时禁用马氏距离 需要依赖包 
/*
* 简化 马氏距离：简化马氏距离，仅考虑两个多维向量间的距离，而马氏距离需要考虑观察向量于总体分布的关系；
* @param {array} x - 多维向量一
* @param {array} y - 多维向量二
* @return {number} 返回两点间的马氏距离
 */
//function getMahalanobisDistance(x,y){
    //mean=kernel_arr_1(x,y);
    //x_mean=kernel_arr_2(x,mean);
    //cov=numbers.statistic.covariance(x,y);
    //cov_inverse=1/cov;
    //return Math.sqrt(kernel_arr_5(kernel_arr_3(cov_inverse,x_mean),x_mean));
//}


/*
"""Compute the Mahalanobis Distance between each row of x and the data  
    x    : vector or matrix of data with, say, p columns.
    data : ndarray of the distribution from which Mahalanobis distance of each observation of x is to be computed.
    cov  : covariance matrix (p x p) of the distribution. If None, will be computed from data.
    """ 
*/

//console.log(getconvex_hull(pointlist)); 
//getunidirectionalHausdorffDistance();

//pl1=test_2(90,50);
//console.log(pl1);
//console.log(getconvex_hull(pl1));
//console.log(pl1);
//console.log(pl2);
//console.log(getunidirectionalHausdorffDistance(pl1,pl2));
//console.log(getunidirectionalHausdorffDistance(pl2,pl1));
//console.log(getbidirectionalHausdorffDistance(pl1,pl2));

//let po1=new Point(1,1);
//let po2=new Point(9,2);
//let po3=new Point(3,5);
//let resu = SolveLineForm(po1,po2);
//console.log(IsPointonLine(resu[0],resu[1],resu[2],po3));
//console.log(getPoint2LineDistence(po1,po2,po3));
//console.log(po3.getDistance2Line(po1,po2));
//let po2 = new Point(1,1);
//console.log(po2);

/*
let pol = test_2(100,300);
let pos = new PointSet(pol);
console.log(pos.getConvexHull());
console.log(pos.getPointSet());
*/