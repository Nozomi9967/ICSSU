import Vue from "vue";
import VueRouter from "vue-router";
import ManualArrange from "@/pages/ManualArrange"
import AutoArrange from "@/pages/AutoArrange"
import Schedule from "@/pages/Schedule"
import Course from "@/pages/Course"
import Input from "@/pages/Input"
import Flow from "@/pages/Flow"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Classroom from "@/pages/Classroom"

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
      path: '/manual-arrange',
      component: ManualArrange
    },
    {
      path: '/auto-arrange',
      component: AutoArrange
    },
    {
      path: '/course',
      component: Course
    },
    {
      path: '/classroom',
      component: Classroom
    },
    {
      path: '/schedule',
      component: Schedule
    },
    {
      path: '/input',
      component: Input
    },
    {
      path: '/flow',
      component: Flow
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