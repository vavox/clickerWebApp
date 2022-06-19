<template>
    <body>
        <h1>Registration</h1>
        <form class="register-form" @submit.prevent="handleSubmit">
            <li v-for="(val, index) in errors" :key="val.id">
                {{index}}: {{ val[0] }} 
            </li>
            <input type="email" class="register-email" placeholder="Email" required v-model="email"/>
            <input type="username" class="register-username" placeholder="Username" required v-model="username"/>
            <input type="password" class="register-password" placeholder="Password" required v-model="password"/>
            <input type="fullname" class="register-fullname" placeholder="Full Name" required v-model="full_name"/>
            <label>Birth Date:<input type="date" class="register-birthdate" placeholder="Birth Date" required v-model="birth_date"/>
            </label>
            <select type="gender" class="register-select" required v-model="gender">
                <option disable value="">Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
            </select>
            <div class="submit">
                <button class="register-btn">Create Account</button>
            </div>
        </form>
    </body>
</template>


<script>
import {getAPI} from '../api'

export default {
    data() {
        return {
            email: "",
            username: "",
            password: "",
            full_name: "",
            birth_date: "",
            gender: "",
            errors: {},
        }
    },

    methods: {
        handleSubmit() {
            getAPI.post('/api/register/', {
                email: this.email,
                username: this.username,
                password: this.password,
                full_name: this.full_name,
                birth_date: this.birth_date,
                gender: this.gender,
            }).then(response => {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password,
                }).then(() => {
                    console.log(response.data);
                    getAPI.post('/scores/', {
                    },
                    { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    }
                    )
                    }).catch(error => {
                        this.errors = error.response.data
                        console.log(error)
                    })
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

label{
	margin: 20px;
	padding: 10px;
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