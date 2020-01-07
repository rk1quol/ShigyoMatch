import Vue from 'vue'
import VueRouter from 'vue-router'

// import page component
import Top from '@/pages/Top.vue'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'
import Customers from '@/pages/Customers.vue'
import CustomerDetail from '@/pages/CustomerDetail.vue'
import Greeting from '@/pages/Greeting.vue'
import Works from '@/pages/Works.vue'
import WorkDetail from '@/pages/WorkDetail.vue'

// mypage
import MyPage from '@/pages/mypage/MyPage.vue'
import Base from '@/pages/mypage/Base.vue'
import Home from '@/pages/mypage/Home.vue'
import Applies from '@/pages/mypage/Applies.vue'
import Chats from '@/pages/mypage/Chats.vue'
import Favorites from '@/pages/mypage/Favorites.vue'
import Matches from '@/pages/mypage/Matches.vue'
import Messages from '@/pages/mypage/Messages.vue'
import Profile from '@/pages/mypage/Profile.vue'
import Scouts from '@/pages/mypage/Scouts.vue'

// errors
import ServerError from '@/pages/errors/ServerError.vue'
import NotFound from '@/pages/errors/NotFound.vue'
import store from '@/store'

import AssetRegister from '@/pages/AssetRegister.vue'


// VueRouterの使用
Vue.use(VueRouter)

// パスと、パスにマッピングするコンポーネントの定義
const routes = [
  {
    path: '/',
    component: Top,
  },
  {
    path: '/greeting',
    component: Greeting,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/login',
    component: Login,
    beforeEnter (to, from, next) {
      if (store.getters['auth/isLogin']) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/works',
    component: Works,
    children: [
      {
        path: ':id',
        component: WorkDetail,
        props: route => ({
          id: Number(route.params.id)
        }),
      }
    ]
  },
  {
    path: '/customers',
    component: Customers,
    children: [
      {
        path: ':id',
        component: CustomerDetail,
        props: route => ({
          id: Number(route.params.id)
        }),
      }
    ]
  },
  {
    path: '/mypage',
    component: MyPage,
    children: [
      {
        path: ':id',
        component: Base,
        props: route => ({
          id: String(route.params.id)
        }),
        beforeEnter (to, from, next) {
          if (!store.getters['auth/isLogin']) {
            next('/')
          } else {
            next()
          }
        },
        children: [
          {
            path: '/',
            component: Home,
          },
          {
            path: 'applies',
            component: Applies,
          },
          {
            path: 'chats',
            component: Chats,
          },
          {
            path: 'favorites',
            component: Favorites,
          },
          {
            path: 'matches',
            component: Matches,
          },
          {
            path: 'messages',
            component: Messages,
          },
          {
            path: 'profile',
            component: Profile,
          },
          {
            path: 'scouts',
            component: Scouts,
          },
        ]
      },

    ],
  },
  {
    path: '/asset/register',
    component: AssetRegister,
  },
  {
    path: '/500',
    component: ServerError,
  },
  {
    path: '/*',
    component: NotFound,
  },
]

// VueRouterのインスタンスをrouterとして定義
const router = new VueRouter({
  mode: 'history',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes,
})

// routerをapp.jsでインポートするためにエクスポート
export default router
