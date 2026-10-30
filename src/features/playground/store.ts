import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHomePlaygroundStore = defineStore(
  'home-playground',
  () => {
    const count = ref(2)
    const enabled = ref(true)
    const note = ref('Smoke test ready')

    function increment() {
      count.value += 1
    }

    function decrement() {
      count.value -= 1
    }

    function toggleEnabled() {
      enabled.value = !enabled.value
    }

    function setNote(value: string) {
      note.value = value
    }

    function reset() {
      count.value = 2
      enabled.value = true
      note.value = 'Smoke test ready'
    }

    return {
      count,
      enabled,
      note,
      increment,
      decrement,
      toggleEnabled,
      setNote,
      reset,
    }
  },
  {
    persist: {
      enabled: true,
    },
  },
)
