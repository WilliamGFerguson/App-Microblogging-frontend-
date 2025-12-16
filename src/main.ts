import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './utils/i18n'
import useUserStore from './stores/userStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

const userStore = useUserStore()
watch(
  () => userStore.lang, (newLang) => {i18n.global.locale.value = newLang}, 
  {immediate: true}) //applique direct au démarrage
  
userStore.loadFromToken() //si mon user est authentifié, ajoute la persistence

app.mount('#app')