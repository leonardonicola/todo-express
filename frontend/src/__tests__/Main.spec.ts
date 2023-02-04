import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import App from '@/App.vue'

const server = setupServer(
  rest.get('http://localhost:3000/tasks', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Aprender MSW',
          done: false,
        },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Main', () => {
  it('should GET task name correctly', async () => {
    const wrapper = mount(App)
    await flushPromises()
    const todoName = wrapper.find('p')
    expect(todoName.text()).toEqual('Aprender MSW')
  })
})
