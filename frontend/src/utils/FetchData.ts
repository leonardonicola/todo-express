import axios from 'axios'

interface ITask {
  name: string
  done: boolean
}

const fetchData = async (): Promise<ITask[]> => {
  return axios.get('http://localhost:3000/tasks').then((res) => res.data)
}

const addTodo = async (taskName: string): Promise<ITask> => {
  const task: ITask = { name: taskName, done: false }
  const res = await fetch(`http://localhost:3000/add`, {
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
