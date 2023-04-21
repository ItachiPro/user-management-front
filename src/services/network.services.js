import { api } from 'src/boot/axios'
import { notification } from 'src/utils/notification'

const instance = api

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token && config.headers !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    let message = ''
    if (error.response.status === 0) {
      message = 'No se pudo establecer conexión con el servidor.'
    } else if (error.response.status === 500) {
      message = 'Error de servidor.'
    } else if (error.response.status >= 401 && error.response.status < 500) {
      if (error.response.data.message) {
        message = error.response.data.message
      } else {
        message = error.response.statusText
      }
    } else {
      message = error.response.statusText
    }
    notification(message, 'negative')

    return Promise.resolve(error.message)
  }
)

export default instance
