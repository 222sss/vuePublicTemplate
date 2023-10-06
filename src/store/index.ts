import { createPinia } from 'pinia'
export * from './modules/filter'
const pinia = createPinia()
import persist from 'pinia-plugin-persistedstate'

export default pinia
pinia.use(persist)
