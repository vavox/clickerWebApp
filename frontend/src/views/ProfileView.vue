<template>
    <body>
        <h1>Profile</h1>
        <table class="profile-table">
            <tr>
            <th>Email:</th>
            <td>{{user_info.email}}</td>
            </tr>
            <tr>
            <th>Username:</th>
            <td>{{user_info.username}}</td>
            </tr>
            <tr>
            <th>Full Name:</th>
            <td>{{user_info.full_name}}</td>
            </tr>
            <tr>
            <th>Gender:</th>
            <td>{{user_info.gender}}</td>
            </tr>
            <tr>
            <th>Birth Date:</th>
            <td>{{user_info.birth_date}}</td>
            </tr>
        </table>
  </body>
</template>

<script>
import {getAPI} from '../api'

export default {
  data () {
    return {
      user_info: "",
    }
  },
  
  mounted (){
    this.get_UserInfor();
  },

  methods: {
    get_UserInfor () {
      if (!this.$store.getters.authorized) {
     // this.$router.push({name: "LogIn"})
    } else {
        getAPI('/api/user/',
        { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
      .then(response => this.user_info = response.data) 
      }
    }
  }
}

</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
th {
  width: 100px;
}
</style>