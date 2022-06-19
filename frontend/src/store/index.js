import { createStore } from 'vuex'
import {getAPI} from '../api'

export default createStore({
  state: {
    refreshToken: null,
    accessToken: null,
    score_id: null,
    bytes: 0,
    totalBytes: 0,
    bps: 0,
    bpk: 1,
    player: {
      name: "",
      level: 0,
      nextLevel: 100,
      increase: 3
    },
    power_ups: [],
    upgrades: [
      {
        name: "Intern",
        cost: 50,
        increase: 1.15,
        bps: 0.1,
        quantity: 0,
        unlocksAt: 0
      },
      {
        name: "Junior Developer",
        cost: 100,
        increase: 1.2,
        bps: 0.5,
        quantity: 0,
        unlocksAt: 1
      },
      {
        name: "Middle Developer",
        cost: 300,
        increase: 1.4,
        bps: 0.7,
        quantity: 0,
        unlocksAt: 2
      },
      {
        name: "Senior Developer",
        cost: 500,
        increase: 1.6,
        bps: 1,
        quantity: 0,
        unlocksAt: 3
      },

    ]
  },
  getters: {
    authorized (state) {
      return state.accessToken != null
    },
    bytesUntilLevelUp: state => {
      return Math.round(state.player.nextLevel - state.totalBytes);
    },
    availableUpgrades: state => {
      return state.upgrades.filter(upgrade => {
        if(upgrade.unlocksAt <= state.player.level) {
          upgrade.disabled = false;
          return upgrade;
        } else if (upgrade.unlocksAt - 1 == state.player.level) {
          upgrade.disabled = true;
          return upgrade;
        }
      });
    }
  },
  mutations: {
    updateStorage (state, {access, refresh, score_id}) {
      state.accessToken = access
      state.refreshToken = refresh
      state.score_id = score_id
    },
    updateScores (state, score) {
      state.bytes = score.bytes
      state.totalBytes = score.total_bytes
      state.level = score.level
      state.upgrades[0].quantity = score.intern_quantity
      state.upgrades[2].quantity = score.middle_quantity
      state.upgrades[1].quantity = score.junior_quantity
      state.upgrades[3].quantity = score.senior_quantity
    },
    destroyToken (state) {
        state.accessToken = null
        state.refreshToken = null
    },
    incrementBytes: (state, increment) => {
      state.bytes += increment;
      state.totalBytes += increment;
    },
    levelUp: state => {
      state.player.level++;
      state.player.nextLevel *= state.player.increase;
    },
    buyUpgrade: (state, {index, amount}) => {
      if (state.bytes >= state.upgrades[index].cost)
      {
        state.bytes -= state.upgrades[index].cost;
        state.upgrades[index].quantity += amount; 
        state.upgrades[index].cost = Math.round(state.upgrades[index].cost * 
          state.upgrades[index].increase);
      } else {
        alert('You need more Bytes');
      }
    },
    bytesPerSecond: state => {
      state.bps = 0;
      state.upgrades.forEach(upgrade => {
        state.bps += (upgrade.bps * upgrade.quantity);
        state.bytes += (upgrade.bps * upgrade.quantity) / 60;
      state.totalBytes += (upgrade.bps * upgrade.quantity) / 60;
      })
    }
  },
  actions: {
    userLogin (context, usercredentials) {
        return new Promise((resolve, reject) => {
            getAPI.post('/api/login/', {
                email: usercredentials.email,
                password: usercredentials.password,
            }).then(response => {
                context.commit('updateStorage',{ access: response.data.tokens.access, refresh: response.data.tokens.refresh, score_id: response.data.score }) 
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    userLogout (context) {
        if (context.getters.authorized) {
            context.commit('destroyToken')
        } 
    }
  }
})
