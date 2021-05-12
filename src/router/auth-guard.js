
import store from "../store/index.js";
export default (to, from, next) => {
  if (store.getters.user || store.getters.token || localStorage.getItem("token")) {
    next()
  } else {
    next('/signin')
  }
}
