<template>
    <div id="login">
        <body>
            <h1>Log In</h1>
            <p v-if="error_text">{{error_text}}</p>
            <form class="login-form" @submit.prevent="login">
                <input type="email" class = "login-email" placeholder="Email" required v-model="email"/>
                <input type="password" class = "login-password" placeholder="Password" required v-model="password"/>
            <div class="submit">
                <button class="login-btn">Log In</button>
            </div>
            </form>
        </body>
    </div>
</template>


<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            error_text: "",
        }
    },

    methods: {
        login() {
            this.$store.dispatch('userLogin', {
                email: this.email,
                password: this.password,
            }).then(() => {
                this.$router.push({name: 'Game'})
            }).catch(error => {
                this.error_text = error.response.data.non_field_errors[0]
                console.log(error)
            })
        }
    }
}
</script>


<style scoped>
input{
	background: #e0dede;
	justify-content: center;
	display: flex;
	margin: 20px;
	padding: 10px;
	border: none;
	border-radius: 5px;
}

button {
    background-color: #28A484;
    border-radius: 8px;
    margin: 20px;
    padding: 10px;
    color: #FFF;
    display: flex;
    text-align: center;
}
</style>