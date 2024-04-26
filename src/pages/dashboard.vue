<script>
import api from '@/config/api';
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';

export default {
  components: {
    BarChart,
    PieChart
  },
  data() {
    return {
      loading: false,
      activitiesPendentes: [],
      activitiesConcluidos: [],
      activitiesCurso: [],
      stats: [],
      actividadestotal: 0,
      utilizadoresTotal: 0,
      activities: {
        curso: 0,
        continuo: 0,
        supervisor: 0,
        concluido: 0,
        pendente: 0
      },
      users: {
        admin: 10,
        normal: 3,
      },
      mount: false
    }
  },
  methods: {
    getAllDashboardData() {
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
      };
      this.loading = true
      api.get("/activities/dashboard/data", config).then((res) => {
        this.activitiesPendentes = res.data.pendentes
        this.activitiesConcluidos = res.data.concluidos
        this.activitiesCurso = res.data.curso

        this.stats = res.data.stats
        this.activities = res.data.status
        this.users = res.data.users
        this.actividadestotal = res.data.actividadestotal,
          this.utilizadoresTotal = res.data.usersTotla,
          this.loading = false
        this.mount = true
      }).catch((error) => {
        this.loading = false
      })
    },
  },
  created() {
    this.getAllDashboardData()
  }

};
</script>

<template>
  <VRow>
    <VCol cols="12" md="10">
      <VCard>
        <v-row>
          <v-col cols="8">

            <BarChart v-if="mount" :activities="activities" />

          </v-col>
          <v-col cols="4">
            <PieChart v-if="mount" :users="users" />
          </v-col>
        </v-row>
      </VCard>
      <!-- <AnalyticsTotalRevenue />  -->
    </VCol>
    <VCol cols="12" sm="2">
      <VRow>
        <VCol cols="12" md="12">
          <CardStatisticsVertical v-bind="{
            title: 'Utilizadores',
            stats: this.utilizadoresTotal,
          }" />
        </VCol>

        <VCol cols="12" md="12">
          <CardStatisticsVertical v-bind="{
            title: 'Actividades',
            stats: this.actividadestotal,
          }" />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="12">
      <VCard title="Actividades">
        <VTable class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Nome do Trabalhador
              </th>
              <th class="text-left">
                Actividades em curso
              </th>
              <th class="text-left">
                Em curso pelo supervisor
              </th>
              <th class="text-left">
                Actividades continuo
              </th>
              <th class="text-left">
                Actividades pendente
              </th>
              <th class="text-left">
                Actividades concluido
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in stats" :key="item.id">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.curso }}
              </td>
              <td>
                {{ item.supervisor }}
              </td>
              <td>
                {{ item.continuo }}
              </td>
              <td>
                {{ item.pendente }}
              </td>
              <td>
                {{ item.concluido }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12" md="12">
      <VCard title="Actividades Pendentes">
        <VTable class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Actividade
              </th>
              <th class="text-left">
                Designado a
              </th>
              <th class="text-left">
                Supervisor
              </th>
              <th class="text-left">
                Estado
              </th>

              <th class="text-left">
                Data final
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in activitiesPendentes" :key="item.id">
              <td>
                {{ item.actividade }}
              </td>
              <td>
                {{ item.user }}
              </td>
              <td>
                {{ item.manager }}
              </td>
              <td>
                {{ item.estado }}
              </td>

              <td>
                {{ item.data_final }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12" md="12">
      <VCard title="Actividades Em curso">
        <VTable class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Actividade
              </th>
              <th class="text-left">
                Designado a
              </th>
              <th class="text-left">
                Supervisor
              </th>
              <th class="text-left">
                Estado
              </th>

              <th class="text-left">
                Data final
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in activitiesCurso" :key="item.id">
              <td>
                {{ item.actividade }}
              </td>
              <td>
                {{ item.user }}
              </td>
              <td>
                {{ item.manager }}
              </td>
              <td>
                {{ item.estado }}
              </td>

              <td>
                {{ item.data_final }}
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
    <VCol cols="12" md="12">
      <VCard title="Actividades Concluidos">
        <VTable class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Actividade
              </th>
              <th class="text-left">
                Designado a
              </th>
              <th class="text-left">
                Supervisor
              </th>
              <th class="text-left">
                Estado
              </th>

              <th class="text-left">
                Data final
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in activitiesConcluidos" :key="item.id">
              <td>
                {{ item.actividade }}
              </td>
              <td>
                {{ item.user }}
              </td>
              <td>
                {{ item.manager }}
              </td>
              <td>
                {{ item.estado }}
              </td>

              <td>
                {{ item.data_final }}
              </td>
            </tr>
          </tbody>
        </VTable>
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
td {
  color: #111;
}

thead {
  background-color: #F58B31;
}

.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}

.text-left {
  text-align: right !important;
}
</style>
