import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Drag from "./views/Drag.vue";
import Video from "./views/Video.vue";
import Canvas from "./views/Canvas.vue";
import Puzzle from "./views/Puzzle.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/app'
    },
    {
      path: "/app",
      name: "home",
      component: Home,
      children: [
        {
          path: 'about',
          component: About
        },
        {
          path: 'drag',
          component: Drag
        },
        {
          path: 'video',
          component: Video
        },
        {
          path: 'canvas',
          component: Canvas
        },
        {
          path: 'puzzle',
          component: Puzzle
        }
      ]
    }
  ]
});
