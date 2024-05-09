<script>
import api from '@/config/api';
import IncidentesSimpleTable from '@/views/pages/tables/IncidentesSimpleTable.vue';
import JsonExcel from "vue-json-excel3";
export default {
  components: {
    IncidentesSimpleTable,
    JsonExcel

  },
  data() {
    return {
      status: [],
      status_id: "",
      incident: [],
      loading: false,
    }
  },
  methods: {
    getStatus() {
      api.get("/status").then((res) => {
        this.status = res.data
      })
    },
    getAllActivties() {
      this.loading = true
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
      };
      api.get("/incident", config).then((res) => {
        this.incident = res.data
        this.loading = false
      }).catch((error) => {
        this.loading = false
      })
    },
    changeStatus() {
      console.log(this.status_id)
    },
    byStatus(item) {
      console.log(item)
    }
  },
  created() {
    // this.getStatus()
    this.getAllActivties()
  },
  // watch: {
  //   status_id(newV, old) {
  //     let data = []
  //     this.activities.forEach((element) => {
  //       if (element['status'] == newV) {
  //         data.push(element)
  //       }
  //     })
  //     this.activities = data
  //   }
  // }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <v-card>
        <v-card-text>
          <VRow>
            <VCol cols="3">
              <v-btn prepend-icon="mdi-add" style="margin-right: 10px;" to="/incidentes/adicionar"
                block="">Adiconar</v-btn>
            </VCol>
            <!-- <VCol>
              <JsonExcel :data="activities">
                <v-btn prepend-icon="mdi-download" color="#E5153D" style="color: #fff;" block="">Exportar
                  actividade</v-btn>

              </JsonExcel>
            </VCol>

            <VCol cols="6">
              <v-select :items="status" v-model="status_id" item-title="name" item-value="name"
                label="Filtrar por status"></v-select>

            </VCol> -->

          </VRow>
        </v-card-text>
      </v-card>
      <div class="" style="height: 30px;"></div>
      <VCard title="Lista de incidentes">
        <IncidentesSimpleTable :incidentes="incident" />
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
