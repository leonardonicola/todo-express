<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { fetchData, addTodo } from './utils/FetchData'
import type { ITask } from './utils/FetchData'

const tasks = ref<ITask[]>([])
const newTask = ref<string>('')

const addNewTask = async (): Promise<void> => {
  if (newTask.value !== '') {
    const task = { name: newTask.value, done: false }
    tasks.value.push(await addTodo(task))
    newTask.value = ''
  }
}

onBeforeMount(async () => {
  tasks.value = await fetchData()
})
</script>

<template>
  <main>
    <input type="text" v-model.trim="newTask" />
    <button @click="addNewTask()">ADD</button>
    <div v-if="tasks.length > 0">
      <p v-for="(task, index) in tasks" :key="index">
        <input type="checkbox" name="taskCheck" :checked="task.done" />
        {{ task.name }}
      </p>
    </div>
  </main>
</template>

<style scoped></style>
