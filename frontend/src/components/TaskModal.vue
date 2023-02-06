<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

defineEmits(['closeModal'])
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="props.open"
        class="modal"
        @mousedown.self="$emit('closeModal')"
      >
        <section class="modal__section">
          <h1 class="modal__title">Edit task</h1>
          <slot></slot>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal {
  color: #000;
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #212121cc;
}

.modal__section {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 350px;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #fff;
}

.modal__title {
  margin-bottom: 1.5rem;
}

.modal__input {
  width: 100%;
  padding: 0.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.modal__actions {
  display: flex;
  justify-content: space-between;
}

.modal__task-name {
  padding: 10px;
  border-radius: 0.5rem;
  transition: all 0.5s ease-out;
  cursor: pointer;
}

.modal__task-name:hover {
  background-color: #dddddda6;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
