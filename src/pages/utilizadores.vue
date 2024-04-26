<script>
import api from '@/config/api';
import DemoSimpleTableBasics from '@/views/pages/tables/DemoSimpleTableBasics.vue';
export default {
  components: {
    DemoSimpleTableBasics,

  },
  data() {
    return {
      status: [],
      status_id: "",
      activities: [],
      loading: false,
      users: [

      ],
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
      api.get("/users", config).then((res) => {
        this.users = res.data
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
      <v-btn prepend-icon="mdi-add" style="margin-right: 10px;" to="/utilizadores/adicionar">Atribuir
        acesso administrador</v-btn>
      <div class="" style="height: 10px;"></div>
      <VCard title="Utilizadores">
        <v-table class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Nome do Trabalhador
              </th>
              <th class="text-left">
                E-mail
              </th>
              <th class="text-left">
                Nivel
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in users" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.role.name }}</td>
            </tr>
          </tbody>
        </v-table>
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

<style>
.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}
</style>
