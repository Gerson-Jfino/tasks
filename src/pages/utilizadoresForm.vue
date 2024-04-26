<script>
import api from '@/config/api';
import Swal from "sweetalert2";

export default {
    data() {
        return {
            loading: false,
            form: {
                name: '',
                password: '',
                password: '',
                confirm_password: '',
                role_id: "1",
            }
        }
    },
    methods: {
        resetForm() {

        },
        submit() {
            this.loading = true
            api.post('/users/register', this.form)
                .then((res) => {
                    this.loading = false
                    Swal.fire({
                        title: "Sucesso!",
                        html: `Acesso atribuido!<br> Partilhe as mesmas credenciais para fazer o login.`,
                        icon: "success",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#FF1744",
                    });
                    this.$router.push("/utilizadores")
                })
                .catch((error) => {
                    console.log(error)
                    this.loading = false
                    Swal.fire({
                        title: "O processo falhou!",
                        html: `Verifque o preenchimento dos campos antes de enviar o formulário.`,
                        icon: "warning",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#FF4500",
                    });
                })
        }
    }
}
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12" md="12">

                <VCard title="Atribuir acesso a um Administrador">
                    <VCardText>
                        <VRow class="match-height">
                            <VCol cols="12">
                                <VForm class="mt-6">
                                    <VRow>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Nome Completo" v-model="form.name" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="E-mail" v-model="form.email" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Senha" v-model="form.password" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Confirmar Senha" v-model="form.confirm_password" />
                                        </VCol>

                                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                                            <VBtn @click="submit()">Submeter</VBtn>
                                            <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                                                Cancelar
                                            </VBtn>
                                        </VCol>
                                    </VRow>
                                </VForm>
                            </VCol>
                            <VDialog width="auto" v-model="loading">
                                <VCard color="primary">
                                    <VCardText>
                                        Por favor aguarde
                                        <VProgressLinear indeterminate color="white" class="mb-0" />
                                    </VCardText>
                                </VCard>
                            </VDialog>
                        </VRow>
                    </VCardText>
                </VCard>
            </VCol>


        </VRow>
    </div>
</template>
