import { createPinia } from 'pinia'
export * from './modules/system'
export * from './modules/user'
const pinia = createPinia()
import persist from 'pinia-plugin-persistedstate'

export default pinia
pinia.use(persist)
