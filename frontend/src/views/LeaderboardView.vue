<template>
    <body>
        <h1>Leaderboard</h1>
        <table class="leaderboard-table">
            <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Total Bytes</th>
                <th>Bytes</th>

            </tr>
                <tr v-for="score in scores" :key="score.id">
                    <td>{{score.user}}</td>
                    <td>{{score.level}}</td>
                    <td>{{score.total_bytes}}</td>
                    <td>{{score.bytes}}</td>

                </tr>
        </table>
    </body>
</template>

<script>
import {getAPI} from '../api'

export default {
  data () {
    return {
      scores: [],
    }
  },
  mounted (){
    this.getScores();
  },
  methods: {
    getScores() {
      getAPI('/scores/').then(response => this.scores = response.data)
    },
  }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #28A484;
  color: white;
}

tr:nth-child(even) {background-color: #f2f2f2;}
</style>