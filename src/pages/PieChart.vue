<template>
    <Pie :data="data" :options="options" />
</template>
  
<script lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Pie
    },
    props: {
        users: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            data: {
                labels: ['Normal', 'Admin'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [this.users.normal, this.users.admin]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    }
}
</script>
  