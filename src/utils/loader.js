import { Loading } from 'quasar'

export const loader = (state) => {
  if (state) Loading.show()
  else Loading.hide()
}
