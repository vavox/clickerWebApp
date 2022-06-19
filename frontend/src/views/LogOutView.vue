<template>
  <div>
  </div>
</template>

<script>
  export default {
    created () {
      this.$store.dispatch('userLogout')
        .then(() => {
            this.$router.push({ name: 'LogIn' })
        })

    }
  }
</script>