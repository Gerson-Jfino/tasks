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
  api.post("/users/login", form.value)
    .then((res) => {
      loading.value = false
      disabled.value = false
      sessionStorage.setItem("TOKEN_AUTH", res.data.access_token)
      router.push('/actividades')
    })
    .catch((error) => {
      Swal.fire({
        title: "O processo falhou!",
        html: `${error.response.data.error}`,
        icon: "warning",
        confirmButtonText: "Ok",
        confirmButtonColor: "#FF4500",
      });
      loading.value = false
      disabled.value = false
    })
    .finally((error) => {
      console.log(error)
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
            <img src="../assets/logo.png" width="130" height="auto" alt="">
          </div>
        </template>


      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1 titulo text-center">
          Gestão de Tarefas
        </h5>
        <p class="paragrafo">
          Inicie sessão para continuar.
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="submitLogin()">
          <VRow>

            <VCol cols="12">
              <VTextField v-model="form.email" autofocus label="E-mail" type="email" />
            </VCol>


            <VCol cols="12">
              <VTextField v-model="form.password" label="Senha" :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

              <div class="d-flex align-center justify-space-between flex-wrap mt-4 mb-4">
                <v-spacer></v-spacer>

                <RouterLink class="text-primary ms-2 mb-1" to="/forgot-password">
                  Esqueceu a senha?
                </RouterLink>
              </div>

              <VBtn block type="submit">
                Entrar
              </VBtn>
            </VCol>

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

.titulo {
  color: #111;
  font-size: 16px;
  padding-bottom: 8px;
}

.paragrafo {
  color: #111;

}

.pt-2 {
  padding-bottom: 5px !important;
  margin: 0;
}
</style>
