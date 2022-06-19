<template>
  <body>
    <ul>
      <li><router-link :to="{name: 'Game'}">Game</router-link></li>
      <li><router-link :to="{name: 'Leaderboard'}">Leaderboard</router-link></li>
      <li><router-link :to="{name: 'AboutApp'}">About App</router-link></li>
      <li v-if="!this.$store.getters.authorized"><router-link :to="{name: 'LogIn'}">Log In</router-link></li>
      <li v-if="!this.$store.getters.authorized"><router-link :to="{name: 'Registration'}">Registration</router-link></li>
      <li v-if="this.$store.getters.authorized"><router-link :to="{name: 'Profile'}">Profile</router-link></li>
      <li v-if="this.$store.getters.authorized"><router-link :to="{name: 'LogOut'}">Log Out</router-link></li>
    </ul>
    <router-view style="padding: 10px"/>
  </body>
</template>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
  border-right:1px solid #bbb;
}

li:last-child {
  border-right: none;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #111;
}

.active {
  background-color: #04AA6D;
}
</style>