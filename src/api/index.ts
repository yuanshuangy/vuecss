//Axios二次封装
import { message } from 'ant-design-vue'
import axios from 'axios'
import router from '@/router'

// const $router = useRouter()
const instance = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('bookToken')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 204) {
      message.error(response.data.msg)
      //跳转到登录页面
      router.push('/login')
    }
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    message.error('服务器或网络错误!', 2)
    return Promise.reject(error)
  }
)
export default instance
