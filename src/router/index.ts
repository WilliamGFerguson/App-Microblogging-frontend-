import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Messages from "../views/Messages.vue";
import Notifications from "../views/Notifications.vue";
import Activities from "../views/Activities.vue";
import Following from "../views/Following.vue";
import Profile from "../views/Profile.vue";
import Users from "../views/Users.vue"
import useUserStore from "../stores/userStore";
import { confirmDialog } from "../utils/notify";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      meta: { requiresAuth: true }
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: Notifications,
      meta: { requiresAuth: true }
    },
    {
      path: '/activities',
      name: 'activities',
      component: Activities,
      meta: { requiresAuth: true }
    },
    {
      path: '/following',
      name: 'following',
      component: Following,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Home
    }
  ]
});

router.beforeEach(async (to, _from, next) => {
  const userStore = useUserStore();

  if (to.name === "logout") {
    const confirmed = await confirmDialog('Confirm logout?')
    if (confirmed) {
      userStore.logout();
      router.push("/")
    } else {
      return next(false)
    }
  }
  
  if (to.meta.requiresAuth && !userStore.currentUser) {
    return next("/")
  }

  next()
});

export default router