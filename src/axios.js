import axios from 'axios'
import store from '@/store'

const BASE_URL = process.env.VUE_APP_BASE_URL

const $host = axios.create({
  baseURL: BASE_URL
})

// Для демонстрации вывода сообщения пользователю об ошибке при запросе к API
// Некорректный URL адрес возвращает при запросе 404 статус и сообщение об ошибке,
// которое обрабатывается на клиенте
// const $host = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com/usrs'
// })

$host.interceptors.response.use(null, (error) => {
  const errorMsg = error?.message
  const status = error?.response.status
  // console.log('STATUS ', error?.response.status)
  if (status == 404) store.dispatch('message', {text: 'Адрес ресурса, к которому вы обращаетесь, не найден!', status: status})
  else if (errorMsg) store.dispatch('message',{text: errorMsg, status: status})

  return errorMsg
})


export {
  $host
}