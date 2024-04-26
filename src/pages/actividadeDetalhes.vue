<script>
import api from '@/config/api';
import Swal from 'sweetalert2';

export default {
    props: {
        id: {
            required: true,
        },
    },

    data() {
        return {
            loading: false,
            form: {
                id: null,
                name: '',
                manager: '',
                status_id: null,
                owner: '',
                start_date: null,
                due_date: null,
                final_date: null,
                status_situation: '',
                document: null,
                observation: '',
            },
            status: [],
            uns: [
                { name: 'Direção de Academia (DACA)', value: 'Direção de Academia (DACA)' },
                { name: 'Direcção de Tecnologias de Informação (DTI)', value: 'Direcção de Tecnologias de Informação (DTI)' },
                { name: 'Direcção de Protecção de Receita e Controlo de Perdas (DPRCP)', value: 'Direcção de Protecção de Receita e Controlo de Perdas (DPRCP)' },
                { name: 'Direcção Comercial (DIC)', value: 'Direcção Comercial  (DIC)' },
                { name: 'Direcção de Distribuição  (DID)', value: 'Direcção de Distribuição (DID)' },
                { name: 'Direcção de Eletrificação (DIP)', value: 'Direcção de Eletrificação  (DIP)' },
                { name: 'Direcção de Planeamento de Sistemas e Engenharia  (DPSE)', value: 'Direcção de Planeamento de Sistemas e Engenharia (DPSE)' },
                { name: 'Direcção de Aquisições  (DIA)', value: 'Direcção de Aquisições  (DIA)' },
                { name: 'Direcção das Finanças corporativas  (DFC)', value: 'Direcção das Finanças corporativas  (DFC)' },
                { name: 'Direcção Serviços Gerais  (DSG)', value: 'Direcção das Finanças corporativas  (DFC)' },
                { name: 'Direcção Recursos Humanos (DRH)', value: 'Direcção Recursos Humanos (DRH)' },
                { name: 'Direcção de Higiene Segurança e saúde no Trabalho (DHSST)', value: 'Direcção de Higiene Segurança e saúde no Trabalho (DHSST)' },
                { name: 'Direcao de Operação de Mercado (DOS)', value: 'Direcao de Operação de Mercado (DOS)' },
                { name: 'Direcção de Desenvolvimento de Negócios (DDN)', value: 'Direcção de Desenvolvimento de Negócios (DDN)' },
                { name: 'Direcção de Energias Renováveis (DER)', value: 'Direcção de Energias Renováveis (DER)' },
                { name: 'Direcção de Operacao  de Sistema (DOS)', value: 'Direcção de Operacao  de Sistema (DOS)' },
                { name: 'Direcção de Produção  (DIP)', value: 'Direcção de Produção  (DIP)' },
                { name: 'Direcção de Transporte   (DIT)', value: 'Direcção de Transporte   (DIT)' },
                { name: 'Gabinete de Auditoria e Risco (GAR)', value: 'Gabinete de Auditoria e Risco (GAR)' },
                { name: 'Gabinete de Estratégia e Desempenho Empresarial (GEDE)', value: 'Gabinete de Estratégia e Desempenho Empresarial (GEDE)' },
                { name: 'Gabinete de Ética e Provedoria do Cliente (GEPC)', value: 'Gabinete de Ética e Provedoria do Cliente (GEPC)' },
                { name: 'Gabinete de Inspeção de Actividades (GIA)', value: 'Gabinete de Inspeção de Actividades (GIA)' },
                { name: 'Gabinete Jurídico (GAJ)', value: 'Gabinete Jurídico (GAJ)' },
                { name: 'Gabinete do Conselho de Administração  (GCA)', value: 'Gabinete do Conselho de Administração  (GCA)' },
                { name: 'Gabinete de Comunicao e Relações Institucionais  (GCRI)', value: 'Gabinete de Comunicao e Relações Institucionais (GCRI)' },
                { name: 'Área de Serviço ao cliente de Nacala  (ASC Nacala)', value: ' Área de Serviço ao cliente de Nacala (ASC Nacala)' },
                { name: 'Área de Serviço ao cliente de Angoche  (ASC Angoche)', value: ' Área de Serviço ao cliente de Angoche (ASC Angoche)' },
                { name: 'Área de Serviço ao cliente de Pemba  (ASC Pemba)', value: 'Área de Serviço ao cliente de Pemba (ASC Pemba)' },
                { name: 'Área de Serviço ao cliente de Nampula  (ASC Nampula)', value: ' Área de Serviço ao cliente de Nampula (ASC Nampula)' },
                { name: 'Área de Serviço ao cliente de Lichinga  (ASC Lichinga)', value: 'Área de Serviço ao cliente de Lichinga (ASC Lichinga)' },
                { name: 'Área de Serviço ao cliente de Cumba  (ASC Cumba)', value: ' Área de Serviço ao cliente de Cumba (ASC Cumba)' },
                { name: 'Área de Serviço ao cliente de Chimoio (ASC Chimoio)', value: ' Área de Serviço ao cliente de Chimoio (ASC Chimoio)' },
                { name: 'Área de Serviço ao cliente de Caia  (ASC Caia)', value: ' Área de Serviço ao cliente de Caia (ASC Caia)' },
                { name: 'Área de Serviço ao cliente de Beira  (ASC Beira)', value: 'Área de Serviço ao cliente de Beira (ASC Beira)' },
                { name: 'Área de Serviço ao cliente de Tete  (ASC Tete)', value: 'Área de Serviço ao cliente de Tete (ASC Tete)' },
                { name: 'Área de Serviço ao cliente de Quelimane  (ASC Quelimane)', value: 'Área de Serviço ao cliente de Quelimane (ASC Quelimane)' },
                { name: 'Área de Serviço ao cliente de Mocuba  (ASC Mocuba)', value: 'Área de Serviço ao cliente de Mocuba (ASC Mocuba)' },
                { name: 'Área de Serviço ao cliente de Chokwe  (ASC Chokwe)', value: 'Área de Serviço ao cliente de Chokwe (ASC Chokwe)' },
                { name: 'Área de Serviço ao cliente de Xai-Xai  (ASC Xai-Xai)', value: 'Área de Serviço ao cliente de Xai-Xai (ASC Xai-Xai)' },
                { name: 'Área de Serviço ao cliente de Vilanculos (ASC Vilanculos)', value: ' Área de Serviço ao cliente de Nacala (ASC Nacala)' },
                { name: 'Área de Serviço ao cliente de Boane  (ASC Boane)', value: ' Área de Serviço ao cliente de Boane (ASC Boane)' },
                { name: 'Área de Serviço ao cliente de Inhambane  (ASC Inhambane)', value: 'Área de Serviço ao cliente de Inhambane (ASC Inhambane)' },
                { name: 'Área de Serviço ao cliente de Machava  (ASC Machava)', value: ' Área de Serviço ao cliente de Machava (ASC Machava)' },
                { name: 'Área de Serviço ao cliente de Infulene  (ASC Infulene)', value: ' Área de Serviço ao cliente de Infulene (ASC Infulene)' },
                { name: 'Área de Serviço ao cliente de Matola  (ASC Matola)', value: 'Área de Serviço ao cliente de Matola (ASC Matola)' },
                { name: 'Área de Serviço ao cliente de Ka Maxaquene   (ASC Ka Maxaquene )', value: ' Área de Serviço ao cliente de Ka Maxaquene  (ASC Ka Maxaquene)' },
                { name: 'Área de Serviço ao cliente de Ka Guava  (ASC Ka Guava)', value: 'Área de Serviço ao cliente de Ka Guava (ASC Ka Guava)' },
                { name: 'Área de Serviço ao cliente de Ka Mubucuane  (ASC Ka Mubucuane)', value: ' Área de Serviço ao cliente de Ka Mubucuane (ASC Ka Mubucuane)' },
                { name: 'Área de Serviço ao cliente de  Ka Mavota  (ASC Ka Mavota)', value: ' Área de Serviço ao cliente de Ka Mavota (ASC Ka Ka Mavota)' },
                { name: 'Área de Serviço ao cliente de  Ka Mpfumo  (ASC Ka Mpfumo)', value: ' Área de Serviço ao cliente de Ka Mpfumo (ASC Ka Mpfumo)' },
                { name: 'Área de Serviço ao cliente de Ka Mubucuane  (ASC Ka Mubucuane)', value: ' Área de Serviço ao cliente de Ka Mubucuane (ASC Ka Mubucuane)' },
            ],

        }
    },
    methods: {
        getShowDetails() {
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
            };
            this.loading = true
            api.get(`/activities/${this.id}`, config)
                .then((res) => {
                    this.form = res.data
                    this.loading = false
                })
                .catch((error) => {
                    this.loading = false
                })
        },
        getStatus() {
            api.get("status").then((res) => {
                this.status = res.data
                this.loading = false
            })
                .catch((error) => {
                    this.loading = false
                })
        },
        goBack() {
            this.$router.push({ name: 'activities' })
        },
        handleFileChange(event) {
            //form.document = event.target.files[0];
            this.form.document = event.target.files[0]
        },
        resetForm() {

        },
        submit() {
            this.loading = true
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
            };
            const formData = new FormData();
            formData.append("id", this.id)
            formData.append("name", this.form.name)
            formData.append("manager", this.form.manager)
            formData.append("status_id", this.form.status_id)
            formData.append("owner", this.form.owner)
            formData.append("start_date", this.form.start_date)
            formData.append("due_date", this.form.due_date)
            formData.append("final_date", this.form.final_date)
            formData.append("status_situation", this.form.status_situation)
            formData.append("observation", this.form.observation)
            if (this.form.document != null) {
                formData.append('document', this.form.document);
            }
            //formData.append("document", this.form.document)
            api.post(`/activities/update/${this.id}`, formData, config)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actividade actualizada com Sucesso',
                    });
                    this.getShowDetails()
                    this.loading = false

                })
                .catch((error) => {
                    this.loading = false
                })
        },
        remove() {
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
            };
            this.loading = true
            api.delete(`/activities/${this.id}`, config)
                .then((res) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actividade actualizada com Sucesso',
                    });
                    this.$router.push("/actividades")
                    this.loading = false
                })
                .catch((error) => {
                    this.loading = false
                })
            console.log("clicked: " + this.id)
        },

        viewAnexo() {
            window.open(this.form.document, '_blank');
        }
    },
    created() {
        this.getShowDetails();
        this.getStatus()
    }

};
</script>

<template>
    <div>
        <VRow>
            <VCol cols="12" md="12">
                <v-btn prepend-icon="mdi-arrow-left-circle" small style="margin-right: 10px;"
                    @click="goBack()">Voltar</v-btn>
                <div class="" style="height: 15px;"></div>
                <VCard>
                    <VCardText>

                        <VRow class="match-height">
                            <VCol cols="12">
                                <VForm class="mt-6">
                                    <VRow>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Titulo da actividade" v-model="form.name" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Responsavel" v-model="form.manager" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VSelect label="Estado" :items="status" item-title="name" item-value="id"
                                                v-model="form.status_id" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VSelect label="Solicitante" :items="uns" item-title="name" item-value="value"
                                                v-model="form.owner" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Anexo" type="file" @change="handleFileChange"
                                                v-model="form.document" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Data de inicio" type="date" v-model="form.start_date" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Data prevista" type="date" v-model="form.due_date" />
                                        </VCol>
                                        <VCol md="6" cols="12">
                                            <VTextField label="Data final" type="date" v-model="form.final_date" />
                                        </VCol>
                                        <VCol md="12" cols="12">
                                            <VTextarea label="Ponto de situação" v-model="form.status_situation" />
                                        </VCol>
                                        <VCol md="12" cols="12">
                                            <VTextarea label="Observações" v-model="form.observation" />
                                        </VCol>

                                        <VCol cols="12" class="d-flex flex-wrap gap-4">
                                            <VBtn @click="submit()" prepend-icon="mdi-update">Actualizar</VBtn>
                                            <VBtn @click="remove()" prepend-icon="mdi-remove" color="#000"
                                                style="color: #fff;">Remover</VBtn>

                                            <VBtn prepend-icon="mdi-cancel" color="secondary" variant="tonal" type="reset"
                                                @click="goBack()">
                                                Cancelar
                                            </VBtn>
                                            <VBtn @click="viewAnexo()" prepend-icon="mdi-eye" color="#000"
                                                style="color: #fff;">
                                                Visualizar anexo
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
