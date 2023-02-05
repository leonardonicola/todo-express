import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('Main', () => {
  it('should GET task name correctly', async () => {
    const wrapper = mount(App)
    await flushPromises()
    const todoName = wrapper.find('p')
    expect(todoName.text()).toEqual('Aprender MSW')
  })

  it('should ADD task correctly', async () => {
    const wrapper = mount(App)
    //First flush to make a GET request and load data
    await flushPromises()
    const input = wrapper.find('input[type=text]')
    const button = wrapper.find('button')
    await input.setValue('new task in todo')
    await button.trigger('click')
    //Second flush to make a POST request
    await flushPromises()
    expect(wrapper.findAll('p')[1].text()).toEqual('new task in todo')
  })
})
