import axios from 'axios'

const axiosConfig = {
  setupInterceptors: () => {
    axios.interceptors.request.use((request) => {
      const token = JSON.parse(localStorage.getItem('accessToken'))

      request.headers.authorization = `Bearer ${token}`
      return request
    })
  }
}

export default axiosConfig
