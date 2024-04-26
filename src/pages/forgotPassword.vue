<script setup>
import api from '@/config/api';
import Swal from "sweetalert2";
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const form = ref({
  email: '',
  password: '',
})

const router = useRouter();

const loading = ref(false)
const disabled = ref(false)

const isPasswordVisible = ref(false)

const submitLogin = () => {
  loading.value = true
  disabled.value = true
  api.post("/users/recoveryPassword", form.value)
    .then((res) => {
      console.log(res.data.message)
      Swal.fire({
        title: "Sucesso!",
        html: `${res.data.message}`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF1744",
      });
      sessionStorage.setItem("email", form.value.email)
      loading.value = false
      disabled.value = false
      sessionStorage.setItem("TOKEN_AUTH", res.data.access_token)
      router.push('/verifycode')
    })
    .catch((error) => {
      console.log(error.response.data.message)
      Swal.fire({
        title: "Erro!",
        html: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF1744",
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
          Esqueci a minha senha
        </h5>
        <p class="mb-0">

          Por favor introduza o seu e-mail para recuperar a sua senha
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitLogin()">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.email" autofocus label="E-mail" type="email" />
            </VCol>

            <!-- password -->
            <VCol cols="12">


              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
              </div>

              <!-- login button -->
              <VBtn block type="submit">
                Submeter
              </VBtn>
            </VCol>

            <!-- create account   -->
            <VCol cols="12" class="text-center text-base">
              <span>Ainda não tem conta?</span>
              <RouterLink class="text-primary ms-2" to="/register">
                Registe-se
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
