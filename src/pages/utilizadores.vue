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
      users: [],
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
    getAllUsers() {
      this.loading = true
      console.log("get users functon");
      this.users = [
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
      this.loading = false
      
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
    this.getAllUsers()
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
            <VCol cols="6">

              <VTextField v-model="name" item-title="name" item-value="name"
                    label="Search" append-icon="mdi-search"></VTextField>
            </VCol>
            <VCol cols="3">
              <v-btn prepend-icon="mdi-add" style="margin-right: 10px;" to="/utilizadores/adicionar">Add users</v-btn>
            </VCol>
          </VRow>

        </v-card-text>
      </v-card>
    </VCol>
    <VCol cols="12">
      
      <div class="" style="height: 10px;"></div>
      <VCard title="Utilizadores">
        <v-table class="styled-table">
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
            <tr v-for="item in users" :key="item.name">
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
