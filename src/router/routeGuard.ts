import router from './index'

router.beforeEach(async (to, from, next) => {
  // if (to.path !== '/login') {
  //   if (
  //     !localStorage.getItem('token') ||
  //     !JSON.parse(localStorage.getItem('token')).token ||
  //     new Date().getTime() >
  //     JSON.parse(localStorage.getItem('token')).createAt + 28800000
  //   ) {
  //     next({ path: '/login' })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
  next()
})
