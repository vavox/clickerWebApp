import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'

describe('AboutView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = mount(AboutView, {
                
            
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.text()).toContain('About')
        expect(wrapper.text()).toContain('кліккер')
        expect(wrapper.text()).toContain('кнопки')
        expect(wrapper.text()).toContain('необхідно бути авторизованим')

    })
    
})