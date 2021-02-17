import axios from 'axios'

const axiosConfig = {
  setupInterceptors: () => {
    axios.interceptors.request.use((request) => {
      const token = localStorage.getItem('accesToken')

      request.headers.authorization = `Bearer ${token}`
      return request
    })
  }
}

export default axiosConfig
