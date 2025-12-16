import { defineStore } from "pinia";
import { ref } from "vue";

const useSessionStore = defineStore('session', () => {
  const token = ref<string | null>(localStorage.getItem('gazouille_token'))
  const auth = ref<Record<string, string>>({ Authorization: `Bearer ${token.value}` })
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(5)
  const totalItems = ref<number>(10)

  const changePage = (dir: string) => {
    if(dir == 'up') {
      pageUp()
    } else {
      pageDown()
    }
  }

  const pageUp = () => {
    if (totalPages.value > currentPage.value) {
      currentPage.value++
    }
  }

  const pageDown = () => {
    if (currentPage.value !== 1) {
      currentPage.value--
    }
  }

  return {
    auth,
    currentPage,
    totalPages,
    totalItems,
    changePage
  }
})

export default useSessionStore