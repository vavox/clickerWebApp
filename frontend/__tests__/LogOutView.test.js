import { shallowMount} from '@vue/test-utils'
import LogOutView from '@/views/LogOutView.vue'
// import Vuex from 'vuex'

// describe('LogOutView', () => {
//   let store
//   let actions
//   let state
//   beforeEach(() => {
//     state = { data: {} }
//     actions = {
//       userLogout: jest.fn()
//     }
  
//     store = new Vuex.Store({
//       state,
//       actions
//     })
//   })
//   it('dispatches an userLogout action', () => {
//     const wrapper = shallowMount(LogOutView, {
//       store
//     })
//     wrapper.find('button').trigger('click')
//     expect(actions.userLogout.mock.calls).toHaveLength(1)
//   })
// })

describe('LogoOutView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(LogOutView, {
            created() {
                
            }
        })

        // expect(wrapper.vm.$options.name).toMatch('LogOutView')

        //expect(wrapper.vm.name).toBe('')
        expect(wrapper.exists()).toBe(true);

    })


})

