import { mount } from '@vue/test-utils'
import NotFoundView from '@/views/NotFoundView.vue'

describe('NotFoundView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = mount(NotFoundView, {     
        })

        expect(wrapper.text()).toContain('404 Page not found')
        expect(wrapper.exists()).toBe(true);
    })
    
    it("html test", () => {
        wrapper = mount(NotFoundView, {
        });
    
        expect(wrapper.html()).toBe('<h1>404 Page not found</h1>');
      });
})