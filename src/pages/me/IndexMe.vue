<script setup lang="ts">
import UserAvatr from '@/components/UserAvatr.vue';
import MePokerRule from './MePokerRule.vue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { openTelegramLink, shareURL } from '@telegram-apps/sdk-vue';
import { useUserStore } from '@/stores/user';
const router = useRouter()
const showPokerRule = ref(false)
const userStore = useUserStore()
onMounted(() => {
  userStore.get_customer_url()
  userStore.update_balance()

})



const menuList = [
  {
    name: '手牌回顾',
    icon: 'fas fa-history',
    click: () => {
      router.push('/hand')
    }
  },
  // {
  //     name: '消息',
  //     icon: new URL('../../assets/imgae/icon/mes.png', import.meta.url).href
  //   },
  {
    name: '玩法教程',
    icon: 'fas fa-gamepad',
    click: () => {
      showPokerRule.value = !showPokerRule.value
    }
  },
  {
    name: '余额变动',
    icon: 'fas fa-euro-sign',
    click: () => {
      router.push('/balacneRecord')
    }
  },
  {
    name: '账单统计',
    icon: 'fas fa-file-invoice-dollar',
    click: () => {
      router.push('/moneyRecord')
    }
  },
  {
    name: '联系我们',
    icon: 'fas fa-headset',
    click: () => {
      openTelegramLink(userStore.customer_url)
    }
  },
  // {
  //   name: '主题设置',
  //   icon: 'fas fa-palette',
  //   click: () => {
  //     router.push('/theme')
  //   }
  // },
]



</script>

<template>
  <div class="flex flex-col pos-relative items-center">
    <div class=" w-full h-[160px] absolute top-0 z-0 overflow-hidden">
      <div :border="false" style="background: rgba(92, 94, 97,0.6);"
        class="w-[200%] h-[300px]  rounded-b-[50%] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
    <div class="flex flex-col z-1 w-full px-3">

      <h3 class="w-full text-center mt-2 text-[var(--my-text)]">个人资料</h3>
      <div class="flex flex-row justify-between items-center">
        <UserAvatr class="ml-5 scale-120 my-5" />
        <UserBalance class="h-[40px] mr-5" />
      </div>
      <v-card style="background: var(--my-cardBg);">
        <div class="flex flex-col w-full ">
          <div @click="item.click" class="w-full" v-for="item in menuList" :key="item.name">
            <div class="  flex flex-row justify-between h-[65px] items-center px-2 " v-ripple="{ class: `text-info` }">
              <div class="flex flex-row justify-between items-center">
                <!-- <img :src="item.icon" class="w-[22px] h-[22px]" alt="" srcset=""> -->
                <i :class="item.icon" class="text-[var(--my-text)] text-[22px] w-[28px]"></i>
                <p class="text-[12px] font-bold ml-4 text-[var(--my-text)]">{{ item.name }}</p>
              </div>
              <van-icon name="arrow" class="text-[var(--my-text)]!" />
            </div>
            <van-divider
              :style="{ color: 'rgba(0,0,0,0.3)', borderColor: 'rgba(0,0,0,0.3)', padding: '0 0px', margin: '0px' }" />
          </div>
        </div>
      </v-card>

    </div>
  </div>
  <MePokerRule :show="showPokerRule" @on-close="showPokerRule = !showPokerRule" />

</template>


