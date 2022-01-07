import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../router'

//配置axios
// 配置请求的根路径
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
//axios.defaults.baseURL = "http://192.168.0.134:8021";
//请求超时时间
axios.defaults.timeout = 10000;
//请求拦截器
axios.interceptors.request.use(config => {
  //在所有的请求的请求头增加token  Authorization
  //console.log("进入拦截器：",window.localStorage.getItem('token'));
  config.headers.Authorization = window.localStorage.getItem('token');
  // 在最后必须 return config
  return config
},error => {//请求出错，抛出异常
  return Promise.reject(error);
});
//响应拦截器
axios.interceptors.response.use(
  response => {
    //console.log(response, 'response响应拦截器');
    //进行响应后的处理
    if(response.status === 200){//成功返回请求
      //判断后台程序返回的状态码
      let res = response.data;//返回状态中的数据
      let code = res.code;
      if(res.code === 200){//有返回数据
        return res;
      }else if(code === 301 || code === 302 || code === 303 || code === 304 || code === 305){//token信息出现问题
        console.log("token过期");
        //token出现问题，给出提示信息，并重新登录
        Message({
          message: res.msg,
          duration: 1000,
          type: 'warning'
        });
        //清除localStorage里的数据
        localStorage.clear();
        //回到登录页面重新登录
        setTimeout(() => {
          router.replace({
            path: '/login'
          });
        }, 1000);
      }else{//其他类型错误，给出提示信息即可
        Message({
          message: res.msg,
          duration: 1000,
          type: 'warning'
        });
        return res;
      }
    }
  },
  error => {
    Message({
      message: '系统报错',
      duration: 1000,
      type: 'error'
    });
    return Promise.reject(error);
});

// 封装axios的get请求
export function requestGet(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params}).then(res => {
      resolve(res);
    })
    .catch(error => {
      reject(error);
    });
  });
}

// 封装axios的post请求body
export function requestPost(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(res => {
      resolve(res);
    })
    .catch(error => {
      reject(error);
    });
  });
}

// 封装axios的post请求(form)
export function requestPostForm(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(res => {
      resolve(res);
    })
    .catch(error => {
      reject(error);
    });
  });
}

