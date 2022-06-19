import { mount, shallowMount } from '@vue/test-utils'
import RegistrationView from '@/views/RegistrationView.vue'

describe('RegistrationView.vue Test.', () => {

    let wrapper = null

    it('initializes with correct elements', () => {
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                    email: '',
                    username: '',
                    password: '',
                    full_name: '',
                    birth_date: '',
                    gender: '',
                    errors: '',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        expect(wrapper.vm.email).toBe('')
        expect(wrapper.vm.username).toBe('')
        expect(wrapper.vm.password).toBe('')
        expect(wrapper.vm.full_name).toBe('')
        expect(wrapper.vm.birth_date).toBe('')
        expect(wrapper.vm.gender).toBe('')
        expect(wrapper.vm.errors).toBe('')
    })

    it('initializes with error message', () => {
        // render the component
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                email: 'user@mail.com',
                username: 'user',
                password: 'notuserpassword',
                full_name: 'user',
                birth_date: 'xxxxx',
                gender: 'K',
                errors: 'error1',
                }
            }
        })

        expect(wrapper.exists()).toBe(true);

        // check that each element of the user
        expect(wrapper.vm.email).toBe('user@mail.com')
        expect(wrapper.vm.username).toBe('user')
        expect(wrapper.vm.password).toBe('notuserpassword')
        expect(wrapper.vm.full_name).toBe('user')
        expect(wrapper.vm.birth_date).toBe('xxxxx')
        expect(wrapper.vm.gender).toBe('K')
        expect(wrapper.vm.errors).toBe('error1')
    })


    it('initializes with success message', () => {
    // render the component
    wrapper = shallowMount(RegistrationView, {
        data() {
            return{
            email: 'user@mail.com',
            username: 'user',
            password: 'notuserpassword',
            full_name: 'user',
            birth_date: '2005-02-04',
            gender: 'M',
            errors: '',
            }
        }
    })

    expect(wrapper.exists()).toBe(true);

    // check that each element of the user
    expect(wrapper.vm.email).toBe('user@mail.com')
    expect(wrapper.vm.username).toBe('user')
    expect(wrapper.vm.password).toBe('notuserpassword')
    expect(wrapper.vm.full_name).toBe('user')
    expect(wrapper.vm.birth_date).toBe('2005-02-04')
    expect(wrapper.vm.gender).toBe('M')
    expect(wrapper.vm.errors).toBe('')
    })


    it('emits an event when the button is clicked y', () => {
        // render the component
        wrapper = shallowMount(RegistrationView, {
            data() {
                return{
                    email: 'user@mail.com',
                    username: 'user',
                    password: 'notuserpassword',
                    full_name: 'user',
                    birth_date: '15.02.04',
                    gender: 'M',
                    errors: {},
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
        expect(wrapper.findAll('h1').at(0).text()).toMatch('Registration')

        // check that 1 label is created
        expect(wrapper.findAll('label').length).toEqual(1)
        expect(wrapper.findAll('label').at(0).text()).toMatch('Birth Date:')

        expect(wrapper.findAll('button').length).toEqual(1)
        expect(wrapper.findAll('button').at(0).text()).toMatch('Create Account')
        expect(wrapper.findAll('button').at(0).element.disabled).toBeFalsy()
    })

    test('Registration input test.', async() => {
        const wrapper = mount(RegistrationView)

        expect(wrapper.exists()).toBe(true)

        
        const email = wrapper.find('input')
        await email.setValue('test@mail.com')
        expect(email.element.value).toBe('test@mail.com')


        
        const password = wrapper.find('input')
        await password.setValue("password")
        expect(password.element.value).toBe("password")

        const fullname = wrapper.find('input')
        await fullname.setValue("fullname")
        expect(fullname.element.value).toBe("fullname")

        const birthdate = wrapper.find('input')
        await birthdate.setValue("2018-07-22")
        expect(birthdate.element.value).toBe("2018-07-22")

        const gender = wrapper.find('input')
        await gender.setValue("M")
        expect(gender.element.value).toBe("M")


        const username =  wrapper.find('input')
        await username.setValue("username")
        expect(username.element.value).toBe("username")
    })
    


    
})