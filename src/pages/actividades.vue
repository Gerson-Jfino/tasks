<script>
import api from '@/config/api';
import DemoSimpleTableBasics from '@/views/pages/tables/DemoSimpleTableBasics.vue';
import JsonExcel from "vue-json-excel3";
export default {
  components: {
    DemoSimpleTableBasics,
    JsonExcel

  },
  data() {
    return {
      status: [],
      status_id: "",
      name: "",
      search: false,
      activities: [],
      loading: false,
      excelFields: {
        actividade: 'name',
        gestor: 'manager',
        proprietario: 'owner',
        inicio: 'start_date',
        fim: 'final_due',
        estado: 'status',
        designado: 'user',
        'Tipo de actividade': 'tipo_actividade',
      }
    }
  },
  methods: {
    getStatus() {
      api.get("/status").then((res) => {
        this.status = res.data;
      })
    },
    resetSearchResults() {
      this.name = "";
      this.getAllActivties();
      this.search = false;
    },
    getAllActivties() {
      this.loading = true
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
      };
      if (this.name) {
        api.get(`/activities?s_name=${this.name}`, config).then((res) => {
          this.activities = res.data
          this.loading = false
          this.search = true
        }).catch((error) => {
          this.loading = false
        })
      } else {
        api.get("/activities", config).then((res) => {
          this.activities = res.data
          this.loading = false
        }).catch((error) => {
          this.loading = false
        })
      }
    },
    changeStatus() {
      console.log(this.status_id)
    },
    byStatus(item) {
      console.log(item)
    }
  },
  created() {
    this.getStatus()
    this.getAllActivties()
  },
  watch: {
    status_id(newV, old) {
      let data = []
      this.activities.forEach((element) => {
        if (element['status'] == newV) {
          data.push(element)
        }
      })
      this.activities = data
    }
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <v-card>
        <v-card-text>
          <VRow>
            <VCol cols="3">
              <v-btn prepend-icon="mdi-add" style="margin-right: 10px;" to="/actividades/adicionar"
                block="">Adiconar</v-btn>
            </VCol>
            <!--<VCol cols="3">
              <v-btn prepend-icon="mdi-download" color="#E5153D" style="color: #fff;" block="">Exportar
                actividade</v-btn>
            </VCol>-->
            <VCol>
              <JsonExcel :data="activities" :fields="excelFields">
                <v-btn prepend-icon="mdi-download" color="#E5153D" style="color: #fff;" block="">Exportar
                  actividade</v-btn>

              </JsonExcel>
            </VCol>

            <VCol cols="6">
              <v-select :items="status" v-model="status_id" item-title="name" item-value="name"
                label="Filtrar por status"></v-select>

            </VCol>
            
            <VCol cols="6">
              <VTextField v-model="name" item-title="name" item-value="name"
                label="Filtrar por nome do colaborador" append-icon="mdi-search" @click:append.prevent="getAllActivties" @keypress.enter.prevent="getAllActivties"></VTextField>

            </VCol>

          </VRow>
        </v-card-text>
      </v-card>
      <div class="" style="height: 30px;"></div>
      <vRow v-if="search">
              <vCol cols="12">
                <v-alert dense text type="success" border="left">
                  

                  <vRow justify="space-between">
                    <vCol>
                      <span class="caption"
                    >Resultados de actividades de {{ name }}.
                  </span>
                    </vCol>
                    <vCol class="text-right">
                      <v-btn @click="resetSearchResults" color="success" small text
                        >Limpar <v-icon small>mdi-close</v-icon></v-btn
                      >
                    </vCol>
                  </vRow>
                </v-alert>

        
              </vCol>
            </vRow>
      <VCard title="Livro de Actividades">
        <DemoSimpleTableBasics :activities="activities" />
      </VCard>
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
</template>
