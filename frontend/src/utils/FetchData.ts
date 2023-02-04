interface ITask {
  name: string
  done: boolean
}

const fetchData = async (): Promise<ITask[]> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tasks`)
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

const addTodo = async (taskName: string): Promise<ITask> => {
  const task: ITask = { name: taskName, done: false }
  const res = await fetch(`${import.meta.env.VITE_BASE_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
  })

  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export { fetchData, addTodo }
export type { ITask }
