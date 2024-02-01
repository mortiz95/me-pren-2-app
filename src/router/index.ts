import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
        meta: {
          requiresAuth: true
        }
      
      },
      {
        path: 'tab1',
        component: () => import('@/views/Games.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/CreateGame.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tab3',
        component: () => import('@/views/MyGames.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'tab4',
        component: () => import('@/views/Profile.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/tab1/:info',
        name: 'GameInfo',
        component: () => import('@/views/GameInfo.vue'),
        props: true ,
        meta: {
          requiresAuth: true,
        },
      },
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user)
       },
       reject
    );
  })
}

router.beforeEach(async (to,from,next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()){
      next()
    } else {
      next({ name: 'Auth'})
    }
  }
  else next();
}) 


export default router
