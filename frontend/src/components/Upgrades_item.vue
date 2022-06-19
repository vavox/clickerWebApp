<template>
    <div class="upgrades_item">
     <div 
     v-for="(upgrade, index) in upgrades_item"
     :key="index" 
     class="upgrade"
     >
      <button :class="`button ${upgrade.disabled ? 'disabled' : ''}`" @click="() => buyUpgrade(index)">
            {{ upgrade.name }} {{ upgrade.disabled ? `(lvl: ${upgrade.unlocksAt})` : '' }}
      </button>
      <div class="details">
        <div class="cost">Cost: {{ upgrade.cost }} </div>
        <div class="quantity">Quantity: {{ upgrade.quantity }} </div>
      </div>
     </div>
    </div>
</template>

<script>
export default {
    name: 'upgrades_item',
    computed: {
        upgrades_item () {
            return this.$store.getters.availableUpgrades;
        }
    },
    methods: {
        buyUpgrade (index) {
            this.$store.commit('buyUpgrade', {
                index,
                amount: 1
            });
        }
    }
}
</script>

<style lang="scss">
 .upgrades_item {
    background-color: #222;
    padding: 25px;

    .upgrade {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px -15px 15px;
        

        .button,
        .cost,
        .quantity {
            color: #FFF;
            margin: 0px 15px;
        }

        .button {
            appearance: none;
            border: none;
            outline: none;
            background: none;
            
            display: inline-block;
            min-width: 250px;
            padding: 15px 25px;
            background-color: #28A484;

            border-radius: 10px;

            color: #FFF;
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            text-transform: uppercase;

            cursor: pointer;

            &.disabled {
                color: #222;
                background-color: #CCC;
                pointer-events: none;
            }
        }
    }
 }   
</style>