<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row justify-between">
        <div class="col-4">
          <h3>Users</h3>
        </div>
        <div class="col-8 self-center">
          <q-btn
            color="primary"
            round
            dense
            icon="fas fa-plus"
            @click="modalForm = true"
          />
        </div>
      </div>
      <user-table-component :users="users" />
    </div>
    <q-dialog v-model="modalForm" persistent>
      <user-form-component @hide-modal="hideModal" :edit-mode="false" />
    </q-dialog>
  </q-page>
</template>
<script setup>
import { onMounted, ref } from "vue";
import useUser from "./composables/user";
import UserTableComponent from "./components/UserTableComponent.vue";
import UserFormComponent from "./components/UserFormComponent.vue";

const { getUsers } = useUser();

const users = ref([]);
const modalForm = ref(false);

const getAllUser = async () => {
  const response = await getUsers();
  if (response.status === 200) {
    users.value = response.data;
  }
};

const hideModal = () => {
  modalForm.value = false;
};

onMounted(async () => {
  await getAllUser();
});
</script>
