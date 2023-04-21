import { boot } from 'quasar/wrappers'
import useVuelidate from '@vuelidate/core'

export default boot(({ app }) => {
  app.use(useVuelidate)
})
