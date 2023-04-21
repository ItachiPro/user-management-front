<template>
  <q-table :rows="props.users" :columns="columns">
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          round
          flat
          color="primary"
          icon="fas fa-edit"
          @click="showForm(props.row.id)"
        >
          <q-tooltip>Editar</q-tooltip>
        </q-btn>
        <q-btn
          round
          flat
          color="negative"
          icon="fas fa-trash"
          @click="showDeleteModal(props.row.id)"
        >
          <q-tooltip>Eliminar</q-tooltip>
        </q-btn>
      </q-td>
    </template>
  </q-table>
  <q-dialog persistent>
    <user-form-component
      v-model="modalForm"
      @hide-modal="hideModal"
      :edit-mode="true"
      :user="user"
    />
  </q-dialog>
  <q-dialog v-model="modalDelete" persistent>
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-center">Eliminar usuario</div>
      </q-card-section>
      <q-card-section>
        <div class="q-pt-none text-center">
          ¿Estás seguro de eliminar el usuario?
        </div>
      </q-card-section>
      <q-card-actions align="center" class="">
        <q-btn round flat color="primary" label="Ok" @click="delUser()" />
        <q-btn
          round
          flat
          color="negative"
          label="Cancel"
          @click="modalDelete = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import useUser from "../composables/user";
import UserFormComponent from "./UserFormComponent.vue";

const props = defineProps({
  users: {
    type: Array,
  },
});

const { getUserById, deleteUser } = useUser();

const id = ref(null);
const user = ref({});
const modalForm = ref(false);
const modalDelete = ref(false);

const columns = [
  {
    name: "username",
    label: "Username",
    field: "username",
    align: "center",
  },
  {
    name: "email",
    label: "Email",
    field: "email",
    align: "center",
  },
  {
    name: "actions",
    label: "Acciones",
    field: "",
    align: "center",
  },
];

const showForm = async (id) => {
  const response = await getUserById(id);
  if (response.status === 200) {
    user.value = response.data;
    modalForm.value = true;
  }
};

const hideModal = () => {
  modalForm.value = false;
};

const showDeleteModal = (id) => {
  id.value = id;
  modalDelete.value = true;
};

const delUser = async () => {
  await deleteUser(id.value);
  modalDelete.value = false;
};
</script>
