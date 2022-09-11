//kernel区域 算子区域 所有两步以上的数学运算放在此区域 防止过多重复
const ori_x=[1,0] // x 正半轴方向

/**
 * kernel_1 : (a-b)^2 
 * @param {number} a - a
 * @param {number} b - b 
 * @return {number} The result value.
 */
function kernel_1(a,b){
    return Math.pow((a-b),2);
}

/**
 * kernel_2 : |a-b| 
 * @param {number} a - a
 * @param {number} b - b 
 * @return {number} The result value.
 */
 function kernel_2(a,b){
    return Math.abs((a-b));
}

/**
 * kernel_3 : 求位置向量的模（位置向量 始点 原点 ｜ 终点 当前参数）
 * @param {number} a - a
 * @param {number} b - b 
 * @return {number} sqrt(a^2+b^2) 
 */
 function kernel_3(a,b){
    return Math.sqrt(a*a+b*b);
}



/**
 * kernel_4 : (a+b)/2
 * @param {number} a - a
 * @param {number} b - b 
 * @return {number} The result value.
 */
 function kernel_4(a,b){
    return (a+b)/2;
}
/** kernel_5 : get the rendom int number from [0,max)
 * @param {number} max - the superior limit of the radom reagion
 * @return {number} the random int number
 */
function kernel_5(max) {
    return Math.floor(Math.random() * max);
  }



/**
 * kernel_arr_1 : mean of [...]&[...]： [(a1+b1)/2,(a2+b2)/2,...]
 * @param {Array} a - a
 * @param {Array} b - b 
 * @return {Array} The result value.
 */
 function kernel_arr_1(a,b){
    let m=[];
    for(let i=0;i<a.length;i++)
    {
        m.push(kernel_4(a[i],b[i]));
    } 
    return m;
}


/**
 * kernel_arr_2 : [result]=[a1-b1,a2-b2,...]
 * @param {Array} a - a
 * @param {Array} b - b 
 * @return {Array} The result array.([a1-b1,a2-b2,...])
 */
 function kernel_arr_2(a,b){
    let m=[];
    for(let i=0;i<a.length;i++)
    {
        m.push(a[i]-b[i]);
    } 
    return m;
}


/**
 * kernel_arr_3 : number * [arr] = [num*arr1,num*arr2...]
 * @param {number} n - a
 * @param {Array} b - b 
 * @return {Array} The result value.([num*arr1,num*arr2...])
 */
 function kernel_arr_3(n,b){
    let m=[];
    for(let i=0;i<b.length;i++)
    {
        m.push(n*b[i]);
    } 
    return m;
}

/**
 * kernel_arr_4 : 两列向量对应位置的元素相乘
 * @param {array} a - a
 * @param {array} b - b 
 * @return {array} [a1 * b1 , a2 * b2...]
 */
 function kernel_arr_4(a,b){
    let m=[];
    for(let i=0;i<a.length;i++)
    {
        m.push(a[i]*b[i]);
    } 
    return m;
}

/**
 * kernel_arr_5 : 点积 dot product [a1,a2,a3...] * [b1,b2,b3...]
 * @param {array} a - a
 * @param {array} b - b 
 * @return {number} a1 * b1+a2 * b2...
 */
 function kernel_arr_5(a,b){
    let m=0;
    for(let i=0;i<a.length;i++)
    {
        m+=a[i]*b[i];
    } 
    return m;
}

/**
 * kernel_arr_6 : 求两点组成的向量关于x轴的角度
 * 会先将开始点移至原点，然后求向量与（1，0）向量的夹角
 * @param {array} a - 始点
 * @param {array} b - 终点
 * @return {number} - 返回与x轴的夹角 范围：[0,360)
 */
 function kernel_arr_6(a,b){
    if(kernel_arr_9(a,b)){return -1;}
    let abmv = kernel_arr_7(a,b);
    //console.log(abmv[0]+"| |"+abmv[1])
    let dot_product=kernel_arr_5(abmv,ori_x);
    //console.log(dot_product)
    let cos_va=dot_product/(kernel_arr_8(a,b)*1)
    
    let angle = (Math.acos(cos_va) * 180 )/ Math.PI;
    //console.log(angle)
    if (abmv[1] < 0) angle = -angle;
    return (angle+360) % 360 ;
}

/**
 * kernel_arr_7 : 将由两点表示的向量的坐标系移动至原点
 * @param {array} a - 始点
 * @param {array} b - 终点 
 * @return {array} [b1-a1,b2-a2,...]
 */
 function kernel_arr_7(a,b){
    let m=[];
    for(let i=0;i<a.length;i++)
    {
        m.push(b[i]-a[i]);
    } 
    return m;
}

/**
 *  mod of a vector :
 * * （将由两点表示的向量的坐标系移动至原点） __向量求模__
 * @param {array} a - 始点
 * @param {array} b - 终点 
 * @return {number} sqrt((a1-b1)^2+...)
 */
 function kernel_arr_8(a,b){
    let mv = kernel_arr_7(a,b);
    return kernel_3(mv[0],mv[1]);
}

/**
 * kernel_arr_9 : 判断两个列向量是否完全一样
 * @param {array} a - a
 * @param {array} b - b 
 * @return {boolean} The result value.
 * |1|1|
 * |--|--|
 * |1|1|
 */
 function kernel_arr_9(a,b){
    let boo = true;
    for(let i=0;i<a.length;i++)
    {
       if(a[i]!==b[i]){boo=false;break;}
    } 
    return boo;
}

//console.log("判断是否为同一列向量"+kernel_arr_9([1,2],[1,2]));
//console.log("判断是否为同一列向量"+kernel_arr_9([1,1],[1,2]));

export {
    kernel_1,
    kernel_2,
    kernel_3,
    kernel_4,
    kernel_5,
    kernel_arr_1,
    kernel_arr_2,
    kernel_arr_3,
    kernel_arr_4,
    kernel_arr_5,
    kernel_arr_6,
    kernel_arr_7,
    kernel_arr_8,
    kernel_arr_9
}