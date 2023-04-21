import { ref, computed } from "vue"
import useVuelidate from "@vuelidate/core"
import { helpers, required } from "@vuelidate/validators"
import userServices from '../../../services/user.services'
import { notification } from "src/utils/notification"

const useUser = () => {
  const userForm = ref({
    id: null,
    username: '',
    email: '',
    password: '',
  })

  const userRules = computed(() => {
    return {
      username: {
        required: helpers.withMessage('El nombre de usuario es requerido', required),
      },
      email: {
        required: helpers.withMessage('El email es requerido', required),
      },
      password: {
        required: helpers.withMessage('La contraseña es requerida', required),
      },

    }
  })

  const userV$ = useVuelidate(userRules, userForm)

  const clean = () => {
    userForm.value.id = null
    userForm.value.username = ''
    userForm.value.email = ''
    userForm.value.password = ''
  }

  const getUsers = async () => {
    const response = await userServices.getUsers()
    return response
  }

  const getUserById = async (id) => {
    const response = await userServices.getUsersById(id)
    return response
  }

  const postUser = async () => {
    const response = await userServices.postUser(userForm.value)
    if (response.status === 201) {
      notification('Usuario creatdo con éxito', 'positive')
      clean()
    }
    return response
  }

  const putUser = async (user, id) => {
    const response = await userServices.putUser(user, id)
    if (response.status === 200) {
      notification('Usuario modificado con éxito', 'positive')
      clean()
    }
    return response
  }

  const deleteUser = async (id) => {
    const response = await userServices.deleteUser(id)
    if (response.status === 200) {
      notification('Usuario eliminado con éxito', 'positive')
    }
  }

  return {
    userForm,
    userRules,
    userV$,
    clean,
    getUsers,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    usernameError: () =>
      userV$.value.username.$error ? userV$.value.username.$errors[0].$message : '',
    emailError: () =>
      userV$.value.email.$error ? userV$.value.email.$errors[0].$message : '',
    passwordError: () =>
      userV$.value.password.$error ? userV$.value.password.$errors[0].$message : '',
  }
}

export default useUser
