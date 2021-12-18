import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const Router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default Router
