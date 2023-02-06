import axios from 'axios'

interface ITask {
  id?: string
  name: string
  done: boolean
}

interface TaskUpdate {
  name?: string
  done?: boolean
}

const fetchTasks = (): Promise<ITask[]> => {
  return axios.get('http://localhost:3000/').then((res) => res.data)
}

const postTask = <T extends ITask>(task: T): Promise<T> => {
  return axios
    .post('http://localhost:3000/', task)
    .then((res) => res.data)
    .catch((error) => console.log(error))
}

const removeTask = (id: string): void => {
  axios
    .delete(`http://localhost:3000/${id}`)
    .catch((error) => console.log(error))
}

const changeTask = (id: string, newTaskInfos: TaskUpdate): Promise<ITask> => {
  return axios
    .put(`http://localhost:3000/${id}`, newTaskInfos)
    .then((res) => res.data)
    .catch((error) => console.log(error))
}

export { fetchTasks, postTask, removeTask, changeTask }
export type { ITask, TaskUpdate }
