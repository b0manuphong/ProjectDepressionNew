import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Profile from "../views/Profile.vue";
import Question2 from "../views/Question2.vue";
import Question9 from "../views/Question9.vue";
import History from "../views/History.vue";
import Contact from "../views/Contact.vue";
import little2 from "../views/little2.vue";
import medium3 from "../views/medium3.vue";
import severe4 from "../views/severe4.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import AdminHome from "../views/Adminview/AdminHome.vue";
import ManageUser from "../views/Adminview/ManageUser.vue";
import ProfileAdmin from "../views/Adminview/ProfileAdmin.vue";
import Setting from '../views/Adminview/Setting.vue';
import News from "../views/News.vue";
import Manageactive from "../views/Adminview/Manageactive.vue";
import ManageAdmin from "../views/Adminview/ManageAdmin.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/History",
    name: "History",
    component: History,
  },
  {
    path: "/Question2",
    name: "Question2",
    component: Question2,
  },
  {
    path: "/Question9",
    name: "Question9",
    component: Question9,
  },
  {
    path: "/Signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/AdminHome",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/ManageUser",
    name: "ManageUser",
    component: ManageUser,
  },
  {
    path: "/ProfileAdmin",
    name: "ProfileAdmin",
    component: ProfileAdmin,
  },
  {
    path: "/Setting",
    name: "Setting",
    component: Setting,
  }
  ,
  {
    path: "/News",
    name: "News",
    component: News,
  },
  {
    path: "/ManageAdmin",
    name: "ManageAdmin",
    component: ManageAdmin,
  },
  {
    path: "/Manageactive",
    name: "Manageactive",
    component: Manageactive,
  },
  {
    path: "/Contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/little2",
    name: "little2",
    component:little2,
  },
  {
    path: "/medium3",
    name: "medium3",
    component:medium3,
  },
  {
    path: "/severe4",
    name: "severe4",
    component:severe4,
  },
  
 

];

export const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  routes,
});
