import './assets/index.css'
import 'virtual:uno.css'
import 'vant/lib/index.css';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { retrieveLaunchParams } from '@telegram-apps/sdk-vue'
// import { errorHandler } from './errorHandler'
import { init } from './init'
// import { TonConnectUIPlugin } from './tonconnect'
// import { publicUrl } from './helperts/publicUrl'
import pinia from './stores/pinia'

import vuetify from '@/plugins/vuetify'
const app = createApp(App)


// Mock the environment in case, we are outside Telegram.
// Configure all application dependencies.
import './mockEnv'
import { config } from './utils/config';
init( retrieveLaunchParams().startParam === 'debug' || true) //import.meta.env.DEV
// app.config.errorHandler = errorHandler
// app.use(TonConnectUIPlugin, { manifestUrl: publicUrl('tonconnect-manifest.json') })
if (true) {
  config.devWsUrl  = config.proWsUrl
  config.devBaseURL  = config.proBaseURL
}


app.use(vuetify)
app.use(pinia)
app.use(router)
app.mount('#app')


