
import { createRouter, createWebHistory, type RouteLocation } from 'vue-router';
import IndexPage from '@/pages/IndexPage.vue'
import IndexHome from '@/pages/home/IndexHome.vue'
import IndexWallet from '@/pages/wallet/IndexWallet.vue'
import IndexAgent from '@/pages/agent/IndexAgent.vue'
import IndexMe from '@/pages/me/IndexMe.vue'
import GamePage from '@/pages/game/GamePage.vue' // 假设已定义
import CreateGame from '@/pages/home/CreateGame.vue'
import Withdraw from '@/pages/wallet/Withdraw.vue'
import Recharge from '@/pages/wallet/Recharge.vue'
import Transfer from '@/pages/wallet/Transfer.vue'
import MoreRecord from '@/pages/wallet/MoreRecord.vue'
import GameRoomList from '@/pages/home/GameRoomList.vue'
import InitDataPage from '@/pages/testDataPage/InitDataPage.vue'
import AgentMoney from '@/pages/agent/AgentMoney.vue'
import SetTheme from '@/pages/me/SetTheme.vue'
import Hand from '@/pages/me/Hand.vue'
import BalacneRecord from '@/pages/me/BalacneRecord.vue'
import MoneyRecord from '@/pages/me/MoneyRecord.vue'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    redirect: '/home',
    children: [
      { path: 'home', name: 'home', component: IndexHome },
      { path: 'wallet', component: IndexWallet },
      { path: 'agent', component: IndexAgent },
      { path: 'me', component: IndexMe }
    ]
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage,
    meta: { title: 'game' },
    props: (route: RouteLocation) => ({ query: route.query.roomId })
  },

  {
    path: '/create-game',
    name: 'create-game',
    component: CreateGame,
    meta: { title: 'create-game' }
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: Withdraw,
    meta: { title: 'withdraw' }
  },
  {
    path: '/recharge',
    name: 'recharge',
    component: Recharge,
    meta: { title: 'recharge' }
  },
  {
    path: '/transfer',
    name: 'transfer',
    component: Transfer,
    meta: { title: 'transfer' }
  },
  {
    path: '/gameRoomList',
    name: 'gameRoomList',
    component: GameRoomList,
    meta: { title: 'gameRoomList' }
  },
  {
    path: '/init-data',
    name: 'init-data',
    component: InitDataPage,
    meta: { title: 'Init Data' }
  },
  {
    path: '/agentMoney',
    name: 'agentMoney',
    component: AgentMoney,
    meta: { title: 'AgentMoney' }
  },
  {
    path: '/theme',
    name: 'theme',
    component: SetTheme,
    meta: { title: 'theme' }
  },
  {
    path: '/moreRecord',
    name: 'moreRecord',
    component: MoreRecord,
    meta: { title: 'moreRecord' }
  },
  {
    path: '/hand',
    name: 'hand',
    component: Hand,
    meta: { title: 'Hand' }
  },
  {
    path: '/balacneRecord',
    name: 'balacneRecord',
    component: BalacneRecord,
    meta: { title: 'BalacneRecord' }
  },
  {
    path: '/moneyRecord',
    name: 'moneyRecord',
    component: MoneyRecord,
    meta: { title: 'MoneyRecord' }
  }

];

const router = createRouter({
  history: createWebHistory(), // 需服务端配合
  // history: createWebHashHistory(), // 兼容模式（无需服务端配置）
  routes
});


// http://192.168.1.8:5173/#tgWebAppData=user%3D%257B%2522id%2522%253A7737857205%252C%2522first_name%2522%253A%2522%25E5%2593%2588%25E5%25A1%259E%25E7%25BB%2599%2522%252C%2522last_name%2522%253A%2522%2522%252C%2522username%2522%253A%2522yasuo9643%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252Fou9PClGc28Cp3oSZVNtZM7PiMFKTf7x5AD7Dg5TbGDDCzprEjtRBp_WxF9DaWWh5.svg%2522%257D%26chat_instance%3D-3850096721065286755%26chat_type%3Dprivate%26auth_date%3D1751278907%26signature%3Dj2oOtveiauBzjtQUGFaxcQ_fSGLnrL1lNlBTgDfkBzH0Zd6SSaJDWjpkPxsBy1iRhguyQe9TBUiaAfBIjik2Cg%26hash%3D16508cb1515c8981c5ad1907a393d98c78cef337c466e6317b01fa92d076a256&tgWebAppVersion=9.0&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D

export default router;
