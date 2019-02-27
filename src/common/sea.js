//数据渲染
let sing = {
	'1':{
    "name": "渲染"
  	},
  '2':{
    "name": "数据"
  },
}
export {sing}


export const list=[
	{value:1,name:'新浪微博'},
	{value:2,name:'腾讯微博'},
	{value:3,name:'微信公众号'}
]
//方法
export function flame(){
  
  return '1:yahoo我咧哒';
}

export const trys = function(){
	return '2:trys滴滴';
}

export const summer = () =>{
	return '3:summer';
}
//渲染与方法优化
export var park = {
	render: '渲染数据',
	skill:function(){
//		定要有return,不然有个undefined
		return 'skill';
	}
}
