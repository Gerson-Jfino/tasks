<script setup>
import api from '@/config/api';
import Swal from "sweetalert2";
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const form = ref({
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  role_id: "2",
})

const router = useRouter();

const loading = ref(false)
const disabled = ref(false)

const isPasswordVisible = ref(false)

const submitLogin = () => {
  loading.value = true
  disabled.value = true
  api.post("/users/register", form.value)
    .then((res) => {
      loading.value = false
      disabled.value = false
      sessionStorage.setItem("TOKEN_AUTH", res.data.access_token)
      Swal.fire({
        title: "Sucesso!",
        html: `A sua conta foi registada!<br> Use as mesmas credenciais para fazer o login.`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF1744",
      }).then(() => {
        router.push('/login')
      });
    })
    .catch((error) => {
      console.log(error.response.data.message)
      Swal.fire({
        title: "O processo falhou!",
        html: `Esse e-mail ja existe.`,
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF4500",
      });
      loading.value = false
      disabled.value = false
    })
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
          Criar Conta
        </h5>
        <p class="mb-0">
          Crie a sua conta
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitLogin()">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.name" autofocus label="Nome Completo" type="text" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="form.email" autofocus label="E-mail" type="email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Senha" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

            </VCol>

            <VCol cols="12">
              <VTextField v-model="form.confirm_password" label="Confirmar Senha"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">

              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Criar conta
              </VBtn>
            </VCol>

            <!-- create account  -->
            <VCol cols="12" class="text-center text-base">
              <span>Já têm uma conta?</span>
              <RouterLink class="text-primary ms-2" to="/login">
                Entrar
              </RouterLink>
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
