import {mount} from '@vue/test-utils'
import Calculator from '../components/Calculator'

describe('Keyboard', () => {
    it('Test keyboard display', async () => {
        const wrapper = mount(Calculator)

        const keyboardToggle = wrapper.find('#keyboardToggle')
        keyboardToggle.setChecked(false)

        expect(wrapper.vm.showKeyboard).toBe(false)
    })

    it('Test delete button', async () => {
        const wrapper = mount(Calculator)

        const button_1 = wrapper.find('#button_1')
        const button_delete = wrapper.find('#button_del')

        button_1.trigger('click')
        expect(wrapper.vm.operand1).toBe(1)

        button_delete.trigger('click')
        expect(wrapper.vm.operand1).toBe('')
    })
})

describe('Inputs', () => {
    it('Test operand inputs', async () => {
        const wrapper = mount(Calculator)

        await wrapper.setData({showKeyboard: false})

        const operand1Input = wrapper.find('#operand_1__input')
        operand1Input.setValue('1')
        const operand2Input = wrapper.find('#operand_2__input')
        operand2Input.setValue('2')

        expect(wrapper.vm.operand1).toBe('1')
        expect(wrapper.vm.operand2).toBe('2')
    })
})

describe('Math operations', () => {
    it.each`
    operation   | a     | b     | result     
    ${'sum'}    | ${2}  | ${3}  | ${5}    
    ${'diff'}   | ${3}  | ${1}  | ${2} 
    ${'mult'}   | ${2}  | ${3}  | ${6}  
    ${'div'}    | ${6}  | ${3}  | ${2} 
    ${'mod'}    | ${7}  | ${3}  | ${2}  
    ${'pow'}    | ${2}  | ${3}  | ${8}  
  `("Test '$operation' operation", async ({operation, a, b, result}) => {
        const wrapper = mount(Calculator)

        await wrapper.setData({
            operand1: a,
            operand2: b,
            operator: operation,
        })

        expect(wrapper.vm.calc()).toBe(result)
    })
})