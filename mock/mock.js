
//链接
// vue+vuecli+webpack中使用mockjs模拟后端数据
// https://blog.csdn.net/yw00yw/article/details/81272632
// 在vue-cli项目中使用Mock模拟数据的增删改查操作：
// https://blog.csdn.net/yw00yw/article/details/81328126

import Mock from 'mockjs';

Mock.mock("http://text.com",'post',{
    value: 'star'
});

// const objTest = {
//     a:"aa",
//     b:"bb",
//     c:"cc",
//     d:"dd"
// }
// var arr = [11,22,33];
// var fun = function(x){
//     return x + 10;
// }
// Mock.mock("http://text.com",'post',{
//     "name1|1-3":  'a',
//     "name2|2": 'b',
//     "name3|+1": 3,
//     "name4|1-4": 2,
//     "name5|1-4.5-8": 1,
//     "name6|1": true,
//     "name7|1-3": true,
//     "name8|1-4": objTest,
//     "name9|2": objTest,
//     "name10|1": arr,
//     "name11|1-3": arr,
//     "name12|2": arr,
//     "name13": fun(10),
//     "name14": /[a-z][A-Z]/,
//     "name15": /\d{1,3}/,
//     "name16": "@FIRST",
//     "name17": "@LAST",
//     "name18": "@email",
//     "name19": "@date",
//     "name20": "@image"
// });


// 模拟数据列表
var arr = [];
for(let i = 0 ; i < 10 ; i++){
    let newArticleObject = {
        name: '月亮'+i,
        content: '星星'+i,
        id: i
    }
    arr.push(newArticleObject);  //将模拟的数据放到数组中
}

// 数据的删除操作
let list = function(options){
    let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let id = parseInt(JSON.parse(options.body).params.id); // 获取请求的id，将options.body转换为JSON对象
            arr = arr.filter(function(val) {
                return val.id != id;  // 过滤掉前台传过来的id对应的相应数据，并重新返回
            });
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/list',/get|post/i,list);

// 数据的添加操作
let listAdd = function(options){
//  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
    let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
            let obj = JSON.parse(options.body).params.obj;
            arr = arr.concat(obj);  // 将前台返回来的数据，拼接到数组中。
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/listAdd',/get|post/i,listAdd);

// 数据的修改操作
let listUpdate = function(options){
    let rtype = options.type.toLowerCase(); //获取请求的类型
    switch (rtype) {
        case 'get':
            break;
        case 'post':
        // 获取前端返回的参数,要字符串转对象
            let obj = JSON.parse(options.body).params.obj;
            console.log('params数据',options,obj);
            arr = arr.map(val => {  // 将需要替换的数据替换掉
                return Number(val.id) === Number(obj.id) ? obj : val ;
            });
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/listUpdate',/get|post/i,listUpdate);

