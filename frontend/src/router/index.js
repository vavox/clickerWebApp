import { createRouter, createWebHistory } from 'vue-router'
import GameView from '../views/GameView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'
import LogInView from '../views/LogInView.vue'
import LogOutView from '../views/LogOutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ProfileView from '../views/ProfileView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
    {
        path: '/game',
        alias: '/',
        name: 'Game',
        component: GameView,
    },
    {
        path: '/leaderboard',
        name: 'Leaderboard',
        component: LeaderboardView,
    },
    {
        path: '/login',
        name: 'LogIn',
        component: LogInView,
    },
    {
        path: '/logout',
        name: 'LogOut',
        component: LogOutView,
    },
    {
        path: '/registration',
        name: 'Registration',
        component: RegistrationView,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
    },
    {
        path: '/aboutapp',
        name: 'AboutApp',
        component: AboutView,
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundView,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router