<template>
  <q-card style="width: 700px; max-width: 80vw; heigth: 900px">
    <q-bar dark class="bg-primary text-white">
      <div class="col text-center text-weight-bold">
        <div>{{ props.editMode ? "Editar " : "Nuevo " }} usuario</div>
      </div>
      <q-space />
      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip>Cerrar</q-tooltip>
      </q-btn>
    </q-bar>
    <q-card-section>
      <div class="row justify center">
        <div class="col-md-12 col-sm-12 col-xs-12 q-pa-xs txt-center">
          <q-form>
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12 q-pa-xs">
                <q-input
                  dense
                  filled
                  type="text"
                  label="Nombre de usuario"
                  v-model="userForm.username"
                  :error-message="usernameError()"
                  :error="userV$.username.$error"
                  @blur="userV$.username.$touch"
                />
              </div>
              <div class="col-md-6 col-sm-12 col-xs-12 q-pa-xs">
                <q-input
                  dense
                  filled
                  type="text"
                  label="email"
                  v-model="userForm.email"
                  :error-message="emailError()"
                  :error="userV$.email.$error"
                  @blur="userV$.email.$touch"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-12 col-xs-12 q-pa-xs">
                <q-input
                  dense
                  filled
                  type="text"
                  label="Contraseña"
                  v-model="userForm.password"
                  :error-message="passwordError()"
                  :error="userV$.password.$error"
                  @blur="userV$.password.$touch"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12 q-pa-xs">
                <div class="col-md-5 col-sm-4 col-xs-4 q-pa-md" align="right">
                  <q-btn
                    type="button"
                    color="primary"
                    text-color="white"
                    :label="props.editMode ? 'Editar' : 'Guardar'"
                    @click="props.editMode ? editar() : guardar()"
                  />
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { onMounted, ref } from "vue";
import useUser from "../composables/user";
import { loader } from "src/utils/loader";

const props = defineProps({
  editMode: {
    default: false,
  },
  user: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["hide-modal"]);

const {
  userForm,
  userV$,
  postUser,
  putUser,
  usernameError,
  emailError,
  passwordError,
} = useUser();

const setData = async (user) => {
  userForm.value.id = user.id;
  userForm.value.username = user.username;
  userForm.value.email = user.email;
};

const guardar = async () => {
  loader(true);
  userV$.value.$validate();
  if (!userV$.value.$error) {
    const response = await postUser();
    if (response.status === 201) {
      userV$.value.$reset();
    }
  }
  loader(false);
};

const editar = async () => {
  loader(true);
  userV$.value.$validate();
  if (!userV$.value.$error) {
    const response = await putUser(userForm.value.id);
    if (response.status === 201) {
      userV$.value.$reset();
    }
  }
  loader(false);
};

onMounted(async () => {
  if (props.user) {
    setData(props.user);
  }
});
</script>
