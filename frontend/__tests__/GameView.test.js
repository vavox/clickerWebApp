import { shallowMount, mount, localVue } from '@vue/test-utils'
import GameView from '@/views/GameView.vue'
import Vuex from 'vuex'


describe('GameView.vue Test', () => {
    let wrapper = null

     let actions
     let store
  
    // beforeEach(() => {
    //   actions = {
    //     incrementBytes: jest.fn()
    //   }
    // })

    it('вызывает "actionInput", когда значение события — "input"', () => {
        
        // const wrapper = mount(GameView, { 
        //     store, 
        //     localVue
        // })

        
        // // const wrapper = shallowMount(GameView, { mocks: {
        // //     $store: store,
        // //   } })
        // // const input = wrapper.find('input')
        // // input.element.value = 'input'
        // // input.trigger('input')
        // // expect(actions.actionInput).toHaveBeenCalled()
        // expect(wrapper.exists()).toBe(true);
    })


    it('initializes with correct elements', () => {
    //     wrapper = shallowMount(GameView, {   
            
    //     })

    //    // expect(wrapper.text()).toContain('Profile')
    //     expect(wrapper.exists()).toBe(true);
    })
    

})