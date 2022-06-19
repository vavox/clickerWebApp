import { shallowMount, mount } from '@vue/test-utils'
import LogInView from '@/views/LogInView.vue'

describe('LogInView.vue Test', () => {
    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(LogInView, {
            data() {
                return{
                email: '',
                password: '',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.password).toBe('')
        expect(wrapper.vm.error_text).toBe('')
    })

    it('initializes with error message', () => {
        // render the component
        wrapper = shallowMount(LogInView, {
            data() {
                return{
                email: 'user@mail.com',
                password: 'notuserpassword',
                error_text: 'wrong password'
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // check that each element of the user
        expect(wrapper.vm.email).toMatch('user@mail.com')
        expect(wrapper.vm.password).toMatch('notuserpassword')
        expect(wrapper.vm.error_text).toMatch('wrong password')
    })


    it('initializes with success message', () => {
    // render the component
        wrapper = shallowMount(LogInView, {
            data() {
                return{
                email: 'user2@yahoo.com',
                password: 'user2password',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // check that each element of the user is initialized to empty strings
        expect(wrapper.vm.email).toMatch('user2@yahoo.com')
        expect(wrapper.vm.password).toMatch('user2password')
        expect(wrapper.vm.error_text).toMatch('')
    })


    it('emits an event when the button is clicked y', () => {
        // render the component
        wrapper = shallowMount(LogInView, {
            data() {
                return{
                email: 'user2@yahoo.com',
                password: 'user2password',
                error_text: ''
                }
            }
        })

        expect(wrapper.exists()).toBe(true);
    
        // trigger an event when the button is clicked
        wrapper.find('button').trigger('click')
    
        // check that 1 occurrence of the event has been emitted
        expect(wrapper.emitted('submit')).toBeTruthy
    })


    it('initializes with correct element', () => {

        expect(wrapper.exists()).toBe(true);
        expect(wrapper.findAll('h1').length).toEqual(1)
        expect(wrapper.findAll('h1').at(0).text()).toMatch('Log In')


        expect(wrapper.findAll('button').length).toEqual(1)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Log In')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    })

    
    test('Login input test.', async() => {
        const wrapper = mount(LogInView)

        expect(wrapper.exists()).toBe(true)

        const email = wrapper.find('input')    
        await email.setValue('test@mail.com')
        expect(email.element.value).toBe('test@mail.com')

        const password = wrapper.find('input')
        await password.setValue('password')
        expect(password.element.value).toBe('password')
    })
})
