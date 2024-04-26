<script setup>
import api from '@/config/api';
import Swal from "sweetalert2";
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const form = ref({
  email: sessionStorage.getItem("email"),
  password: '',
  confirm_password: ''
})

const router = useRouter();

const loading = ref(false)
const disabled = ref(false)

const isPasswordVisible = ref(false)

const submitLogin = () => {
  loading.value = true
  disabled.value = true
  if (form.value.password == form.value.confirm_password) {
    api.post("/users/changePassword", form.value)
      .then((res) => {
        loading.value = false
        disabled.value = false
        sessionStorage.setItem("TOKEN_AUTH", res.data.access_token)
        Swal.fire({
          title: "Sucesso!",
          html: `A sua senha foi actualizada com Sucesso.`,
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#FF1744",
        });
        router.push('/actividades')
      })
      .catch((error) => {
        Swal.fire({
          title: "O processo falhou!",
          html: `${error.response.data.message}`,
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#FF4500",
        });
        loading.value = false
        disabled.value = false
      })
  }
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" width="448" :loading="loading" :disabled="disabled">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <img src="../assets/logo.png" width="130" height="110" alt="">
          </div>
        </template>


      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Redefinição da Senha
        </h5>
        <p class="mb-0">

          Por favor actualize a sua senha
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitLogin()">
          <VRow>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Senha" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />
              <div class="" style="height: 20px;"></div>
              <VTextField v-model="form.confirm_password" label="Confirmar Senha"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <v-spacer></v-spacer>
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Submeter
              </VBtn>
            </VCol>


          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
