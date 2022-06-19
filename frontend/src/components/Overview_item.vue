<template>
    <div class="overview_item">
        <h3>Current Bytes</h3>
        <button class="inc-bytes" @click="this.$store.commit('incrementBytes', this.$store.state.bpk)">{{ bytes }}</button>
        <div class="bps">Bytes Per Second: {{ bps}}</div>
        <div class="level">Current Level: {{ level }}</div>
        <div class="next-level">Bytes Until Next Level: {{ bytesUntilLevelUp }}</div>
        <button class="bytes" @click="saveScore">Save</button>
    </div>
</template>

<script>
import {getAPI} from '../api'

    export default {
        name: 'overview_item',
        methods: {
            saveScore() {
                getAPI.post('/scores/', {
                    bytes: Math.floor(this.$store.state.bytes),
                    total_bytes: Math.floor(this.$store.state.totalBytes),
                    level: this.$store.state.player.level,
                    intern_quantity : this.$store.state.upgrades[0].quantity,
                    junior_quantity : this.$store.state.upgrades[1].quantity,
                    middle_quantity : this.$store.state.upgrades[2].quantity,
                    senior_quantity : this.$store.state.upgrades[3].quantity,
                },
                { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        computed: {
            bytes () {
                return Math.round(this.$store.state.bytes);
            },
            bps () {
                return (this.$store.state.bps).toFixed(1);
            },
            level () {
                return this.$store.state.player.level;
            },
            bytesUntilLevelUp () {
                return this.$store.getters.bytesUntilLevelUp;
            }
        }
    }
</script>

<style lang="scss">
.overview_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;

    h3 {
        color: #222;
        font-size: 24px;
        font-weight: 400;
        margin-bottom: 15px;
    }

    .bytes {
        width: 100%;
        min-width: 200px;
        max-width: fit-content;
        padding: 15px 25px;
        background-color: #28A484;
        border-radius: 10px;

        color: #FFF;
        font-size: 48px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 30px; 

        cursor: pointer;
    }

    .inc-bytes {
        width: 100%;
        min-width: 200px;
        max-width: fit-content;
        padding: 15px 25px;
        background-color: #28A484;
        border-radius: 10px;

        color: #FFF;
        font-size: 48px;
        font-weight: 900;
        text-align: center;
        margin-bottom: 30px; 

        cursor: pointer;
    }

    .bps,
    .level,
    .next-level {
        margin-bottom: 15px;

        color: #222;
        font-size: 18px;
        font-weight: 500;
        text-align: center;
    }
    
}
</style>