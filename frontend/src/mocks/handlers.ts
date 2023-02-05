// @ts-nocheck
import { rest } from 'msw'
export const handlers = [
  rest.get('http://localhost:3000/tasks', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: 'Aprender MSW',
          done: false,
        },
      ])
    )
  }),
  rest.post('http://localhost:3000/add', (req, res, ctx) => {
    return res(ctx.body(req.json()))
  }),
]
