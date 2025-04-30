import Vue from "vue";
import VueRouter from "vue-router";
import ManualArrange from "@/pages/ManualArrange"
import AutoArrange from "@/pages/AutoArrange"
import Schedule from "@/pages/Schedule"
import Course from "@/pages/Course"
import Flow from "@/pages/Flow"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import Usage from "@/pages/Analysis/Usage"
import Quantity from "@/pages/Analysis/Quantity"
import Teacher from "@/pages/Teacher"
import Classroom from "@/pages/Classroom"
import Class from "@/pages/Class"
import MyTable from "@/pages/MyTable"

Vue.use(VueRouter)


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
      path: '/class',
      component: Class
    },
    {
      path: '/schedule',
      component: Schedule
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
      path: '/mytable',
      component: MyTable
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/analysis/usage',
      component: Usage
    },
    {
      path: '/analysis/quantity',
      component: Quantity
    },
    {
      path: '/teacher',
      component: Teacher
    },
  ]
})