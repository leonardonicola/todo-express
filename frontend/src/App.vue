<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchTasks, postTask, removeTask, changeTask } from './utils/Methods'
import type { ITask, TaskUpdate } from './utils/Methods'
import TaskModal from './components/TaskModal.vue'

const tasks = ref<ITask[]>([])
const newTask = ref<string>('')
const editTask = ref<string>('')
const openModal = ref<boolean>(false)
const taskUuid = ref<string>('')

const addNewTask = async (): Promise<void> => {
  // Only add task if value isn't blank
  if (newTask.value !== '') {
    const task = { name: newTask.value, done: false }
    tasks.value.push(await postTask(task))
    newTask.value = ''
  }
}

const deleteTask = async (uuid: string): Promise<void> => {
  // Use uuid to remove from database and use index to remove locally
  await removeTask(uuid)
  const localTaskIndex = tasks.value.findIndex(
    (task) => task.id === taskUuid.value
  )
  tasks.value.splice(localTaskIndex, 1)
  taskUuid.value = ''
  openModal.value = false
}

const putNewTask = async (uuid: string, newTask: TaskUpdate): Promise<void> => {
  const result = await changeTask(uuid, newTask)
  const localTaskIndex = tasks.value.findIndex(
    (task) => task.id === taskUuid.value
  )
  tasks.value[localTaskIndex] = await result
  taskUuid.value = ''
  openModal.value = false
}

const updateTaskName = (uuid: string) => {
  const newName = { name: editTask.value }
  putNewTask(uuid, newName)
}

const updateTaskStatus = (uuid: string, status: boolean) => {
  const newStatus = { done: !status }
  putNewTask(uuid, newStatus)
}

const openModalFn = (uuid: string, name: string) => {
  taskUuid.value = uuid
  editTask.value = name
  openModal.value = true
}

onBeforeMount(async () => {
  tasks.value = await fetchTasks()
  console.log(tasks.value)
})
</script>

<template>
  <main>
    <!-- Header -->
    <header class="header">
      <h1 class="header__title">Todo List</h1>
    </header>

    <!-- Form -->
    <div class="form">
      <input
        type="text"
        v-model.trim="newTask"
        class="form__input"
        @keydown.enter="addNewTask"
      />
      <button @click="addNewTask" class="button button--blue">ADD</button>
    </div>

    <!-- List -->
    <div v-if="tasks.length > 0" class="todo-list">
      <TransitionGroup name="task" tag="div">
        <div
          v-for="task in tasks"
          :key="task.id"
          class="todo-list__task"
          @click.self="openModalFn(task.id as string, task.name)"
        >
          <input
            class="todo-list__checkbox"
            type="checkbox"
            name="taskCheck"
            :checked="task.done"
            @change="updateTaskStatus(task.id as string, task.done)"
          />
          <p>{{ task.name }}</p>
        </div>
      </TransitionGroup>
    </div>

    <h3 v-else class="todo-list__no-tasks">
      <i>No tasks on database, add some!</i>
    </h3>

    <!-- Modal with task infos to edit or delete -->
    <TaskModal :open="openModal" @close-modal="openModal = false">
      <input type="text" v-model="editTask" class="modal__input" />
      <div class="modal__actions">
        <button class="button button--blue" @click="updateTaskName(taskUuid)">
          SAVE
        </button>
        <button class="button button--red" @click="deleteTask(taskUuid)">
          EXCLUDE
        </button>
      </div>
    </TaskModal>
  </main>
</template>

<style scoped>
.header__title {
  margin-bottom: 4rem;
}

.form {
  display: flex;
  gap: 1rem;
}
.form__input {
  width: 50%;
  padding: 0.6rem;
}

.todo-list {
  margin-top: 4rem;
  border: 1px solid #ddddddb9;
}
.todo-list__task {
  background-color: #363636;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  cursor: pointer;
  border-bottom: 1px solid #ddddddb9;
}

.todo-list__no-tasks {
  margin-top: 3rem;
}

.todo-list__checkbox {
  width: 2rem;
}

.todo-list:last-child {
  border-bottom: none;
}

.task-enter-active {
  transition: all 0.5s ease-out;
}
.task-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>
