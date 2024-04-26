<template>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
  
<script>
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        activities: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chartData: {
                labels: ['Em Curso', 'Continuo', 'Supervisor', 'Pendente', 'Concluido'],
                datasets: [
                    {
                        label: 'Resumo de Actividades',
                        backgroundColor: [
                            'rgba(75, 192, 192)',
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(244, 129, 31)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192)',
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(244, 129, 31)'
                        ],
                        data: [
                            this.activities.curso,
                            this.activities.continuo,
                            this.activities.supervisor,
                            this.activities.pendente,
                            this.activities.concluido,
                        ]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
            }
        }
    }
}
</script>
