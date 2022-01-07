import Vue from 'vue';

const hasPermission = {
  install(Vue, options) {
    //自定义指令v-has：
    Vue.directive('has', {
      //inserted：被绑定元素插入父节点时调用
      inserted: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
          el.parentNode.removeChild(el);
        }
      },
    });

    Vue.prototype.$_has = function(value){
      // console.log("jinru");
      let isExist = false;
      //从浏览器中获取权限数组
      var permissionStr =  eval(window.localStorage.getItem('permissionArray'));
      // console.log("权限数组",permissionStr);
      if(permissionStr == undefined || permissionStr == null){
        return false;
      }else{
        permissionStr.forEach(element => {
          //判断当前的权限编码是否在拥有的权限数组中
          if(element.code == value){
            isExist = true;
          }
        });
      }
      return isExist;
    }
  }
};
export default hasPermission;

