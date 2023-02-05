import axios from 'axios'

interface ITask {
  name: string
  done: boolean
}

const fetchData = (): Promise<ITask[]> => {
  return axios.get('http://localhost:3000/tasks').then((res) => res.data)
}

const addTodo = <T extends ITask>(task: T): Promise<T> => {
  return axios
    .post('http://localhost:3000/add', task)
    .then((res) => res.data)
    .catch((error) => console.log(error))
}

export { fetchData, addTodo }
export type { ITask }
