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
      
      usersDash: [],
      users: {
        admin: 10,
        normal: 3,
      },
      mount: false
    }
  },
  methods: {
    getAllDashboardData() {
      //get data function
      this.usersDash = [
        {
          name: 'user name',
          email: 'email@emal.com',
          created_at: '01-01-2024 12:00:00',
          role: 'Admin',
        },
        {
          name: 'user name2',
          email: 'email@emal.com',
          created_at: '01-01-2024 12:00:00',
          role: 'Admin',
        },
        {
          name: 'user name3',
          email: 'email@emal.com',
          created_at: '01-01-2024 12:00:00',
          role: 'Admin',
        },
        {
          name: 'user name4',
          email: 'email@emal.com',
          created_at: '01-01-2024 12:00:00',
          role: 'Admin',
        },
      ]
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
      
      <!-- <AnalyticsTotalRevenue />  -->
    </VCol>

    <VCol cols="12" md="12">
      <VCard title="Actividades">
        <VTable class="styled-table">
          <thead>
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Email
              </th>
              <th class="text-left">
                Create at
              </th>
              <th class="text-left">
                Role
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in usersDash" :key="item.id">
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.email }}
              </td>
              <td>
                {{ item.created_at }}
              </td>
              <td>
                {{ item.role }}
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
