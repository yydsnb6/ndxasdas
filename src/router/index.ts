
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


// http://192.168.1.2:5173/home#tgWebAppPlatform=macos&tgWebAppThemeParams=%7B%22section_bg_color%22%3A%22%23ffffff%22%2C%22bottom_bar_bg_color%22%3A%22%23e4e4e4%22%2C%22secondary_bg_color%22%3A%22%23efeff3%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%236d6d71%22%2C%22section_separator_color%22%3A%22%23eaeaea%22%2C%22text_color%22%3A%22%23000000%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22link_color%22%3A%22%232481cc%22%2C%22accent_text_color%22%3A%22%232481cc%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22hint_color%22%3A%22%23999999%22%2C%22button_color%22%3A%22%232481cc%22%2C%22header_bg_color%22%3A%22%23efeff3%22%2C%22destructive_text_color%22%3A%22%23ff3b30%22%7D&tgWebAppVersion=9.1&tgWebAppData=user%3D%257B%2522id%2522%253A666666%252C%2522first_name%2522%253A666666%252C%2522last_name%2522%253A%2522%25E7%25B4%25A2%2522%252C%2522username%2522%253A%2522yasuo9643%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252Fou9PClGc28Cp3oSZVNtZM7PiMFKTf7x5AD7Dg5TbGDDCzprEjtRBp_WxF9DaWWh5.svg%2522%257D%26chat_instance%3D-8324147510323253756%26chat_type%3Dsender%26auth_date%3D1756124983%26signature%3DmgLj-0vQ8FG_LPeunITeKSwztJC1kV_YmQUihtgyFW9z70zljbaZFEq3KiIqkyImlrJUIW0vyTzVLCz86LzeAA%26hash%3Db866525946776e46db8e729b240486a1ba3846c179b6f25ead32f214e51cda19


// Key	Value
// tapps/launchParams	"tgWebAppPlatform=macos&tgWebAppThemeParams=%7B%22section_bg_color%22%3A%22%23ffffff%22%2C%22bottom_bar_bg_color%22%3A%22%23e4e4e4%22%2C%22secondary_bg_color%22%3A%22%23efeff3%22%2C%22bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%236d6d71%22%2C%22section_separator_color%22%3A%22%23eaeaea%22%2C%22text_color%22%3A%22%23000000%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22link_color%22%3A%22%232481cc%22%2C%22accent_text_color%22%3A%22%232481cc%22%2C%22subtitle_text_color%22%3A%22%23999999%22%2C%22hint_color%22%3A%22%23999999%22%2C%22button_color%22%3A%22%232481cc%22%2C%22header_bg_color%22%3A%22%23efeff3%22%2C%22destructive_text_color%22%3A%22%23ff3b30%22%7D&tgWebAppVersion=9.1&tgWebAppData=user%3D%257B%2522id%2522%253A666666%252C%2522first_name%2522%253A%2522%25E4%25BA%259A%2522%252C%2522last_name%2522%253A%2522%25E7%25B4%25A2%2522%252C%2522username%2522%253A%2522yasuo9643%2522%252C%2522language_code%2522%253A%2522zh-hans%2522%252C%2522allows_write_to_pm%2522%253Atrue%252C%2522photo_url%2522%253A%2522https%253A%255C%252F%255C%252Ft.me%255C%252Fi%255C%252Fuserpic%255C%252F320%255C%252Fou9PClGc28Cp3oSZVNtZM7PiMFKTf7x5AD7Dg5TbGDDCzprEjtRBp_WxF9DaWWh5.svg%2522%257D%26chat_instance%3D-8324147510323253756%26chat_type%3Dsender%26auth_date%3D1756124983%26signature%3DmgLj-0vQ8FG_LPeunITeKSwztJC1kV_YmQUihtgyFW9z70zljbaZFEq3KiIqkyImlrJUIW0vyTzVLCz86LzeAA%26hash%3Db866525946776e46db8e729b240486a1ba3846c179b6f25ead32f214e51cda19"
export default router;
