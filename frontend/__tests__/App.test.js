import { shallowMount } from '@vue/test-utils'
import App from '@/views/AboutView.vue'


describe('App.vue', () => {
    it('renders li for each item in props.items', () => {
      const items = []
      const wrapper = shallowMount(App, {
        propsData: { items }
      })
      expect(wrapper.findAll('li')).toHaveLength(items.length)
    })
  
    it('matches snapshot', () => {
      const items = ['item 1', 'item 2']
      const wrapper = shallowMount(App, {
        propsData: { items }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
