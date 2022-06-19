import { shallowMount } from '@vue/test-utils'
import LeaderboardView from '@/views/LeaderboardView.vue'

describe('LeaderboardView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(LeaderboardView, {   
            table: {
                default: 'LeaderboardNameLevelTotal BytesBytes'
            }  
        })

       // expect(wrapper.text()).toContain('Profile')
        expect(wrapper.text()).toContain('LeaderboardNameLevelTotal BytesBytes')
        expect(wrapper.exists()).toBe(true);
    })
    

})