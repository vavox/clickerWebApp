<template>
  <div class="logo">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>

  <div id ="Game">
    <Overview /> 
    <Upgrades />
  </div>
</template>

<script>
import Overview from '../components/Overview_item';
import Upgrades from '../components/Upgrades_item';
import {getAPI} from '../api'


export default {
  components: {
    Overview,
    Upgrades,
  },
  mounted() {
    if (!this.$store.getters.authorized) {
     this.$router.push({name: "LogIn"})
    } else {
      getAPI.get('/scores/'+this.$store.state.score_id+'/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => {
        this.$store.commit('updateScores', response.data)
      }).catch(error => {
          console.log(error)
      })
    }
  },
  methods: {
    coding() {
      // Key pressed 
      this.$store.commit('incrementBytes', this.$store.state.bpk)
    }, 
    loop() {
      // Game loop
      this.$store.commit('bytesPerSecond');
      this.levelManger();
      requestAnimationFrame(this.loop);
    },
    levelManger() {
      if (this.$store.getters.bytesUntilLevelUp <= 0) {
        this.$store.commit('levelUp');
      }
    }
  },
  created() {
    this.loop();
    window.addEventListener('keypress', this.coding);
  },
  unmounted() {
    window.removeEventListener('keypress', this.coding);
  }
}
</script>

<style lang="scss" scoped>

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
