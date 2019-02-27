var fancy = {
    //判断是否为空
    isEmpty(str){
        if(str == ''||str == null||str == undefined){
            return true;
        }else{
            return false;
        }
    },
    //判断是否为手机
    isMoblie: function (value) {
		return !/^1\d{10}$/.test(value)?'663':'00';
    },
    //判断所在环境
    isEnvironment(){
        var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/Chrome/i) == 'chrome') {
			return true;
		} else {
			return false;
		}
    }  
}
export default fancy;