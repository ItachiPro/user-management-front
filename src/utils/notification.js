import { Notify } from 'quasar'

export const notification = (msg, type) => {
  Notify.create({
    message: msg,
    type: type,
    position: 'top-right',
    timeout: 10000,
    actions: [
      {
        icon: 'close',
        color: 'white',
      },
    ],
  })
}
