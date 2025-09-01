<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useUserStore } from './stores/user';

import { themes } from '@/utils/theme'
import { useSignal, initData, useLaunchParams } from '@telegram-apps/sdk-vue';
import { useBackButton } from '@/composables/useBackButton'
import LoadPoker from './LoadPoker.vue'
useBackButton()
const lp = useLaunchParams()
// import LocalUtil from './utils/LocalUtil';
import xipai from '@/assets/sound/xipai.mp3'
import bet from '@/assets/sound/bet.mp3'
import allin from '@/assets/sound/allin.mp3'
import allin2 from '@/assets/sound/allin2.mp3'
import gaopai from '@/assets/sound/gaopai.mp3'
import genzhu from '@/assets/sound/genzhu.mp3'
import guopai from '@/assets/sound/guopai.mp3'
import huangjia from '@/assets/sound/huangjia.mp3'
import huanyin from '@/assets/sound/huanyin.mp3'
import hulu from '@/assets/sound/hulu.mp3'
import jiazhu from '@/assets/sound/jiazhu.mp3'
import jinru from '@/assets/sound/jinru.mp3'
import liangdui from '@/assets/sound/liangdui.mp3'
import likai from '@/assets/sound/likai.mp3'
import qipai from '@/assets/sound/qipai.mp3'
import santiao from '@/assets/sound/santiao.mp3'
import shunzi from '@/assets/sound/shunzi.mp3'
import sitiao from '@/assets/sound/sitiao.mp3'
import tonghua from '@/assets/sound/tonghua.mp3'
import tonghuashun from '@/assets/sound/tonghuashun.mp3'
import touzhu from '@/assets/sound/touzhu.mp3'
import xiazhu from '@/assets/sound/xiazhu.mp3'
import yidui from '@/assets/sound/yidui.mp3'
import zuoxia from '@/assets/sound/zuoxia.mp3'
import xipaizhong from '@/assets/sound/xipaizhong.mp3'
import wangluo from '@/assets/sound/wangluo.mp3'
import start from '@/assets/sound/start.mp3'
import mairu from '@/assets/sound/mairu.mp3'
import maibaoxian from '@/assets/sound/maibaoxian.mp3'
import likaizuowei from '@/assets/sound/likaizuowei.mp3'
import fapai from '@/assets/sound/fapai.mp3'
import { encode, decode } from 'js-base64';

import { useSound } from '@vueuse/sound';
import bus from './utils/bus';
const doXipai = useSound(xipai, { volume: 1 })
const dobet = useSound(bet, { volume: 1 })
const doallin2 = useSound(allin2, { volume: 1 })
const dogaopai = useSound(gaopai, { volume: 1 })
const dohuangjia = useSound(huangjia, { volume: 1 })
const dohulu = useSound(hulu, { volume: 1 })
const dojinru = useSound(jinru, { volume: 1 })
const doliangdui = useSound(liangdui, { volume: 1 })
const dosantiao = useSound(santiao, { volume: 1 })
const doshunzi = useSound(shunzi, { volume: 1 })
const dositiao = useSound(sitiao, { volume: 1 })
const dotonghua = useSound(tonghua, { volume: 1 })
const dotonghuashun = useSound(tonghuashun, { volume: 1 })
const dotouzhu = useSound(touzhu, { volume: 1 })
const doyidui = useSound(yidui, { volume: 1 })
const dohuanyin = useSound(huanyin, { volume: 1 })
const dojiazhu = useSound(jiazhu, { volume: 1 })
const dolikai = useSound(likai, { volume: 1 })
const doqipai = useSound(qipai, { volume: 1 })
const doxiazhu = useSound(xiazhu, { volume: 1 })
const dogenzhu = useSound(genzhu, { volume: 1 })
const doallin = useSound(allin, { volume: 1 })
const doguopai = useSound(guopai, { volume: 1 })
const dozuoxia = useSound(zuoxia, { volume: 1 })
const doxipaizhong = useSound(xipaizhong, { volume: 1 })
const dowangluo = useSound(wangluo, { volume: 1 })
const dostart = useSound(start, { volume: 1 })
const domairu = useSound(mairu, { volume: 1 })
const domaibaoxian = useSound(maibaoxian, { volume: 1 })
const dolikaizuowei = useSound(likaizuowei, { volume: 1 })
const dofapai = useSound(fapai, { volume: 1 })
const userStore = useUserStore()
onMounted(() => {
  bus.on('playSound', playMySound)
  login()

})

onUnmounted(() => {
  bus.off('playSound')
})

const playMySound = (name: string) => {
  console.log(name);

  switch (name) {
    case 'doXipai': doXipai.play(); break;
    case 'dobet': dobet.play(); break;
    case 'doallin2': doallin2.play(); break;
    case 'dogaopai': dogaopai.play(); break;
    case 'dohuangjia': dohuangjia.play(); break;
    case 'dohulu': dohulu.play(); break;
    case 'dojinru': dojinru.play(); break;
    case 'doliangdui': doliangdui.play(); break;
    case 'dosantiao': dosantiao.play(); break;
    case 'doshunzi': doshunzi.play(); break;
    case 'dositiao': dositiao.play(); break;
    case 'dotonghua': dotonghua.play(); break;
    case 'dotonghuashun': dotonghuashun.play(); break;
    case 'dotouzhu': dotouzhu.play(); break;
    case 'doyidui': doyidui.play(); break;
    case 'dohuanyin': dohuanyin.play(); break;
    case 'dojiazhu': dojiazhu.play(); break;
    case 'dolikai': dolikai.play(); break;
    case 'doqipai': doqipai.play(); break;
    case 'doxiazhu': doxiazhu.play(); break;
    case 'dogenzhu': dogenzhu.play(); break;
    case 'doallin': doallin.play(); break;
    case 'doguopai': doguopai.play(); break;
    case 'dozuoxia': dozuoxia.play(); break;
    case 'doxipaizhong': doxipaizhong.play(); break;
    case 'dowangluo': dowangluo.play(); break;
    case 'dostart': dostart.play(); break;
    case 'domairu': domairu.play(); break;
    case 'domaibaoxian': domaibaoxian.play(); break;
    case 'dolikaizuowei': dolikaizuowei.play(); break;
    case 'dofapai': dofapai.play(); break;
    default: console.warn(`未定义音效: ${name}`);
  }
}

const selectedTheme = ref(themes[0]);

// Load from localStorage
// if (localStorage.getItem('themeColor')) {
//   const saved = JSON.parse(localStorage.getItem('themeColor'));
//   const found = themes.find(t => t.name === saved.name);
//   if (found) selectedTheme.value = found;
// }

watch(selectedTheme, (val) => {
  document.documentElement.style.setProperty('--my-primary', val.primary);
  document.documentElement.style.setProperty('--my-text', val.text);
  document.documentElement.style.setProperty('--my-accent', val.accent);
  document.documentElement.style.setProperty('--my-bg', val.bg);
  document.documentElement.style.setProperty('--my-cardBg', val.cardBg);
  document.documentElement.style.setProperty('--my-cardText', val.cardText);
  document.documentElement.style.setProperty('--my-cardSubText', val.cardSubText);
  document.documentElement.style.setProperty('--my-cardShadow', val.cardShadow);
  document.documentElement.style.setProperty('--my-buttonPrimaryBg', val.buttonPrimaryBg);
  document.documentElement.style.setProperty('--my-buttonPrimaryText', val.buttonPrimaryText);
  document.documentElement.style.setProperty('--my-buttonPrimaryBorder', val.buttonPrimaryBorder);
  document.documentElement.style.setProperty('--my-buttonSecondaryBg', val.buttonSecondaryBg);
  document.documentElement.style.setProperty('--my-buttonSecondaryText', val.buttonSecondaryText);
  document.documentElement.style.setProperty('--my-buttonSecondaryBorder', val.buttonSecondaryBorder);
  document.body.style.background = val.bg;
}, { immediate: true });



import router from './router';
import { useRoute } from 'vue-router';

const route = useRoute()
const show = ref(false)
const initDataRef = useSignal(initData.state);
const user = ref({
  firstName: initDataRef.value?.user?.firstName || '',//  LocalUtil.stringForKey('first_name', initDataRef.value?.user?.firstName),
  photoUrl: initDataRef.value?.user?.photoUrl || '',// LocalUtil.stringForKey('head_url', initDataRef.value?.user?.photoUrl),
  id: initDataRef.value?.user?.id.toString() || '', // LocalUtil.stringForKey('tgid', initDataRef.value?.user?.id.toString()),
  username: initDataRef.value?.user?.username || '',//LocalUtil.stringForKey('username', initDataRef.value?.user?.username),
  lastName: '',//LocalUtil.stringForKey('lastName', 'lastName'),
})


const login = () => {
  // LocalUtil.setString(user.value?.firstName, 'first_name')
  // LocalUtil.setString(user.value?.photoUrl, 'head_url')
  // LocalUtil.setString(user.value?.id, 'tgid')
  // LocalUtil.setString(user.value?.username, 'username')
  // LocalUtil.setString(user.value?.lastName, 'lastName')
  if (lp.startParam && lp.startParam != 'ABC') {
    let startParam = JSON.parse(decode(lp.startParam))
    if (startParam.roomId) {
      router.replace({
        path: '/game',
        query: {
          roomId: startParam.roomId
        }
      })
      return
    }
  }


  let roomId = route.query.roomId
  if (roomId) {
    return
  }

  if (lp.startParam && lp.startParam != 'ABC') {
    let startParam = JSON.parse(decode(lp.startParam))
    if (startParam.agentId) {
      userStore.login({
        first_name: user.value?.firstName,
        head_url: user.value?.photoUrl,
        last_name: user.value?.lastName,
        tgid: Number(user.value?.id),
        user_name: user.value?.username,
        agent_id: startParam.agentId
      }, false).finally(() => {
      })


    } else {
      userStore.login({
        first_name: user.value?.firstName,
        head_url: user.value?.photoUrl,
        last_name: user.value?.lastName,
        tgid: Number(user.value?.id),
        user_name: user.value?.username,
      }, false).finally(() => {
      })
    }

    if (startParam.roomId) {

      router.replace({
        path: '/game',
        query: {
          roomId: startParam.roomId
        }
      })
    }
  } else {
    userStore.login({
      first_name: user.value?.firstName,
      head_url: user.value?.photoUrl,
      last_name: user.value?.lastName,
      tgid: Number(user.value?.id),
      user_name: user.value?.username,
    }, false).finally(() => {
    })
  }
}


</script>

<template>
  <RouterView />

  <!-- <van-floating-bubble axis="xy" magnetic="x" @click="show = !show" teleport="body">
    测试
  </van-floating-bubble>
  <TestLogin :show="show" @on-close="show = !show" /> -->
  <div class="pos-fixed top-0 left-0 bg-[rgba(0,0,0,0.5)] w-full h-full z-999999" v-if="userStore.showLoading">
    <div class="w-full h-full items-center flex justify-center">
      <van-loading size="24px">
        <p class="text-[white]">{{ userStore.loadingText }}</p>
      </van-loading>
    </div>
  </div>

  <LoadPoker />
</template>





<style scoped>
:deep(.van-icon-arrow-left) {
  color: var(--my-text) !important;
  font-size: 24px !important;
}

.van-nav-bar__text {
  color: var(--my-text) !important;
}

:deep(.van-nav-bar__title) {
  color: var(--my-text) !important;
}

:deep(.v-card-title) {
  color: var(--my-cardText) !important;
}

:deep(.v-card-subtitle) {
  color: var(--my-cardSubText) !important;
}

:deep(.van-image__loading) {
  background: var(--my-primary) !important;
}

:deep(.v-card--variant-elevated) {
  box-shadow: var(--my-cardShadow) !important
}

:deep(.v-otp-input__field) {}

:deep(.v-slider-thumb__surface) {
  background: var(--my-accent);
}

:deep(.v-slider-track__fill) {
  background: var(--my-accent);
}

:deep(.van-switch--on) {
  background: var(--my-accent);
}

:deep(.van-checkbox__icon--checked .van-icon) {
  background: var(--my-primary) !important;
  border-color: var(--my-accent);
}

:deep(.van-checkbox__label) {
  color: var(--my-text)
}




:deep(.van-radio__icon--checked .van-icon) {
  color: var(--my-text) !important;
  background: var(--my-primary) !important;
  border-color: var(--my-accent);
}

:deep(.van-field__label) {
  color: var(--my-text) !important;
}

.van-field__control {
  /* font-size: 15px !important; */
  color: var(--my-text) !important;
}
</style>
