import Vue from "vue";
import VueRouter from "vue-router";
import Arrange from "@/pages/Arrange"
import Login from "@/pages/Login"
import Home from "@/pages/Home"

Vue.use(VueRouter)

// // 保存原有的push方法
// const routerPush = VueRouter.prototype.push;
// // 重写push方法，捕获错误并忽略
// VueRouter.prototype.push = function (location) {
//   return routerPush.call(this, location).catch(err => { });
// };

export default new VueRouter({
  routes: [
    {
      path: '/arrange',
      component: Arrange
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})