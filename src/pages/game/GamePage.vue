<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import Poker from './Poker.vue';
import Seat from './Seat.vue';
import { useSocketStore } from '@/stores/mysocket'
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoomStore } from '@/stores/room';
import { ESeatPos, IOptItem } from '@/utils/interface';
import SnowfallBg from '@/components/SnowfallBg.vue';
import Setting from './Setting.vue'
import HandRecord from './HandRecord.vue'
import BlindRecord from './BlindRecord.vue'
import TopPokers from './TopPokers.vue'
import UserBtns from './UserBtns.vue'
import PublicPoker from './PublicPoker.vue'
import { createTimeline, utils } from 'animejs';
import bus from '@/utils/bus';
import { useUserStore } from '@/stores/user';
import BalanceBet from './BalanceBet.vue';
import BaoXianBet from './BaoXianBet.vue';
import EnterBuy from './EnterBuy.vue';
import CheMa from './CheMa.vue';
import HomeCountDown from './HomeCountDown.vue';
import GameUserInfo from './GameUserInfo.vue';
import Chat from './Chat.vue';
import { useRoute } from 'vue-router';
import LocalUtil from '@/utils/LocalUtil';

import { useSignal, initData, useLaunchParams } from '@telegram-apps/sdk-vue';
import { decode } from 'js-base64';


const lp = useLaunchParams()

// import Test from './Test.vue'



const userStore = useUserStore()
const socketStore = useSocketStore()
const roomStore = useRoomStore()
const route = useRoute()

onUnmounted(() => {
  socketStore.disconnect()
})

const showSetting = ref(false)
const showHandRecord = ref(false)
const showBlindRecord = ref(false)
const showChat = ref(false)

const initDataRef = useSignal(initData.state);
const user = ref({
  firstName: initDataRef.value?.user?.firstName || '',//  LocalUtil.stringForKey('first_name', initDataRef.value?.user?.firstName),
  photoUrl: initDataRef.value?.user?.photoUrl || '',// LocalUtil.stringForKey('head_url', initDataRef.value?.user?.photoUrl),
  id: initDataRef.value?.user?.id.toString() || '', // LocalUtil.stringForKey('tgid', initDataRef.value?.user?.id.toString()),
  username: initDataRef.value?.user?.username || '',//LocalUtil.stringForKey('username', initDataRef.value?.user?.username),
  lastName: '',//LocalUtil.stringForKey('lastName', 'lastName'),
})

const showBaoxian = ref(false)

onMounted(() => {
  let roomId = route.query.roomId

  console.log(roomId);

  roomStore.roomId = roomId as string
  // LocalUtil.setString(roomId as string, 'roomId')
  // userStore.getUserInfo(true)
  bus.on('EventFlyMe', flyMyPoker)
  bus.on('clearTable', clearTable)
  bus.on('changeTheme', changeTheme)
  bus.on('showBaoxian',()=>{
    showBaoxian.value = true
    setTimeout(()=>{
      showBaoxian.value = false
    },2000)
  })
  bus.on('neterror', () => {
    showSetting.value = false
    showHandRecord.value = false
    showBlindRecord.value = false
    showChat.value = false
  })
  login()
})





const login = () => {
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
      }, true).finally(() => {
      })
    } else {
      userStore.login({
        first_name: user.value?.firstName,
        head_url: user.value?.photoUrl,
        last_name: user.value?.lastName,
        tgid: Number(user.value?.id),
        user_name: user.value?.username,
      }, true).finally(() => {
      })
    }
  } else {
    userStore.login({
      first_name: user.value?.firstName,
      head_url: user.value?.photoUrl,
      last_name: user.value?.lastName,
      tgid: Number(user.value?.id),
      user_name: user.value?.username,
    }, true).finally(() => {
    })
  }
}

onUnmounted(() => {
  bus.off('EventFlyMe')
  bus.off('clearTable')
  bus.off('changeTheme')
  bus.off('neterror')
})

const flyMyPoker = () => {
  createTimeline({
    defaults: { duration: 500, delay: 1000 },
    loop: 0,
    onComplete: () => { }
  })

    // bottom-[180px] right-[38%]
    // right-[calc(40%+50px)]
    .add('.poker1', {
      bottom: {
        to: '180px', // From 0px to 16rem
        ease: 'outCubic',
      },
      right: {
        to: '35%', // From 0px to 16rem
        ease: 'outCubic',
      },
      opacity: {
        to: '1'
      },

      rotate: {
        to: '1turn', // From 0turn to .75turn
        ease: 'outCubic'
      },
    })
    .add('.poker2', {
      bottom: {
        to: '180px', // From 0px to 16rem
        ease: 'outCubic',
      },
      right: {
        to: '50%', // From 0px to 16rem
        ease: 'outCubic',
      },
      opacity: {
        to: '1'
      },
      rotate: {
        to: '1turn', // From 0turn to .75turn
        ease: 'outCubic'
      },
    })
}





const clearTable = () => {
  let userPoker = ['.poker1', '.poker2']
  for (let index = 0; index < userPoker.length; index++) {
    createTimeline({
      defaults: { duration: 2000, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(userPoker[index], {
        bottom: {
          to: '92%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '0', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '0'
        },

        rotate: {
          to: '1turn', // From 0turn to .75turn
          ease: 'outCubic'
        },
      })

  }
}

const getRoomStatusText = (status: number) => {
  switch (status) {
    case 1:
      return '等待开局'
    case 2:
      return '游戏中'
    case 3:
      return '结算中'
    default:
      break;
  }
}



const themeImg = new Map([
  ['../../assets/imgae/table/table0_bg.png', new URL('../../assets/imgae/table/table0_bg.png', import.meta.url).href],
  ['../../assets/imgae/table/table1_bg.png', new URL('../../assets/imgae/table/table1_bg.png', import.meta.url).href],
  ['../../assets/imgae/table/table2_bg.png', new URL('../../assets/imgae/table/table2_bg.png', import.meta.url).href],
  ['../../assets/imgae/table/table0.png', new URL('../../assets/imgae/table/table0.png', import.meta.url).href],
  ['../../assets/imgae/table/table1.png', new URL('../../assets/imgae/table/table1.png', import.meta.url).href],
  ['../../assets/imgae/table/table2.png', new URL('../../assets/imgae/table/table2.png', import.meta.url).href],
  ['../../assets/imgae/table/poker_back.png', new URL('../../assets/imgae/poker/poker_back.png', import.meta.url).href],
  ['../../assets/imgae/table/poker_back.png', new URL('../../assets/imgae/poker/poker_back.png', import.meta.url).href]
])



const tableIndex = ref(LocalUtil.floatForKey('tableIndex', 0))
const bgIndex = ref(LocalUtil.floatForKey('bgIndex', 0))
const pokerIndex = ref(LocalUtil.floatForKey('pokerIndex', 0))
const changeTheme = () => {
  tableIndex.value = LocalUtil.floatForKey('tableIndex', 0)
  bgIndex.value = LocalUtil.floatForKey('bgIndex', 0)
  pokerIndex.value = LocalUtil.floatForKey('pokerIndex', 0)
}
const getImg = (path: string) => {
  const img = themeImg.get(path)
  if (img) {
    return img
  }
}

</script>

<template>

  <AppPage class=" pos-fixed top-0 left-0 right-0 bottom-0  ">
    <div class="w-full h-full pos-relative flex justify-center items-center">
      <!-- <img :src="getImg(`../../assets/imgae/table/table${bgIndex}_bg.png`)" alt="" srcset=""
        class="w-full h-full absolute top-0"> -->
      <div class="w-[100%] h-[100%] flex! flex-row  justify-center items-center pos-relative ">
        <img :src="getImg(`../../assets/imgae/table/table${tableIndex}.png`)" class="pos-absolute  w-full bottom-0" />
        <div class="flex flex-col w-[55%]  pos-absolute justify-start items-center text-white top-[100px]">
          <div class=" bg-op-10 rounded-3xl p-[2px] flex flex-row items-center px-[10px] justify-center">
            <p class="text-[#c1b75c]   font-bold  text-center w-full text-[14px]">{{
              getRoomStatusText(roomStore.sceneMsg?.room_status) }}</p>
          </div>
          <!-- <div
            class=" mb-2 bg-op-10 rounded-3xl p-[2px] flex flex-row items-center px-[10px] justify-center text-nowrap!">
            <HomeCountDown v-if="(roomStore.sceneMsg.end_time - new Date().getTime()) / 1000 > 0"
              class=" text-[10px] text-[var(--my-accent)]! op-70 font-bold!  mt-[1px] ml-[9px] text-nowrap!"
              :duration="(roomStore.sceneMsg.end_time - new Date().getTime()) / 1000" progress-color="#3498db"
              auto-start progressColorBg="rgba(0,0,0,0.5)" @completed="() => { }" />
          </div> -->

          <div class="bg-[#000] bg-op-10 rounded-full w-[72px] h-[72px] flex justify-center items-center pos-relative">
            <img class="w-[40px] aspect-ratio-[266/201] op-50" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <div
              class=" pos-absolute  bottom-[-4px] h-[18px] bg-[#000]  bg-op-10! rounded-3xl p-[2px] flex flex-row items-center px-[4px]">
              <p class="text-[#c1b75c]  font-bold  text-center w-full text-[18px] ">${{
                Number(roomStore.sceneMsg?.pot_amount).toFixed(2) }}</p>
            </div>
          </div>
          <p class=" op-60 text-[11px] mt-2">{{ roomStore.sceneMsg.room_name }}#{{ roomStore.sceneMsg?.room_id }}</p>
          <p class=" op-60 text-[11px] mb-1">盲注:{{ roomStore.sceneMsg?.little_blind }}<span>/{{
            roomStore.sceneMsg?.big_blind }}</span><span v-if="Number(roomStore.sceneMsg.straddle_blind) > 0">/{{
                roomStore.sceneMsg?.straddle_blind }}</span> </p>
        </div>
        <div class=" z-[999] flex flex-col justify-between items-center h-[92%] w-[95%] pb-[0px]">
          <Seat v-for="seat in roomStore.seats.topSeats" :key="seat.seat_id" :seat-info="seat"
            :seat-pos="ESeatPos.Top" />
          <div class="w-full flex flex-row justify-between items-center flex-1">
            <div class="bg- h-full flex flex-1 flex-col justify-evenly items-start">
              <Seat v-for="seat in roomStore.seats.leftSeats" :key="seat.seat_id" :seat-info="seat"
                :seat-pos="ESeatPos.Left" />
            </div>

            <div class="bg-  h-full flex flex-1 flex-col  justify-evenly items-end">
              <Seat v-for="seat in roomStore.seats.rightSeats" :key="seat.seat_id" :seat-info="seat"
                :seat-pos="ESeatPos.Right" />
            </div>
          </div>
          <Seat class="bottom-[20px]" v-for="seat in roomStore.seats.bottomSeats" :key="seat.seat_id" :seat-info="seat"
            :seat-pos="ESeatPos.Bottom" />

          <div v-ripple="{ class: `text-info` }" @click=" showSetting = !showSetting;"
            class="pos-fixed! top-1 left-1 z-[999] w-[40px] h-[40px] flex items-center justify-center bg-[#1a1c23] bg-op-50 op-60 rounded-full">
            <van-icon name="wap-nav" color="#fff" size="24" />
          </div>
          <div v-ripple="{ class: `text-info` }" @click=" showBlindRecord = !showBlindRecord; socketStore.getBlind()"
            class="pos-fixed! bottom-[50px] left-1 z-[999] w-[40px] h-[40px] flex items-center justify-center bg-[#1a1c23] bg-op-50 op-60 rounded-full">
            <van-icon name="todo-list" color="#fff" size="24" />
          </div>
          <div v-ripple="{ class: `text-info` }" @click=" showChat = !showChat;"
            class="pos-fixed! bottom-[50px] left-12 z-[999] w-[40px] h-[40px] flex items-center justify-center bg-[#1a1c23] bg-op-50 op-60 rounded-full">
            <van-icon name="chat-o" color="#fff" size="24" />
          </div>
        </div>

      </div>
    </div>
    <PublicPoker />
    <!--  -->
    <Poker :isuser="true" v-if="roomStore.roomUserInfo?.hand_cards.length > 0 && roomStore.roomUserInfo?.hand_cards[0]"
      class=" mx-1 z-[9] h-[70px]! poker1 w-[52px]!    absolute bottom-[180px] right-[35%]"
      :point="roomStore.roomUserInfo?.hand_cards[0]" />
    <Poker :isuser="true" v-if="roomStore.roomUserInfo?.hand_cards.length > 0 && roomStore.roomUserInfo.hand_cards[1]"
      class=" mx-1 z-[9] h-[70px]! poker2 w-[52px]!  absolute bottom-[180px] right-[50%]"
      :point="roomStore.roomUserInfo.hand_cards[1]" />


  </AppPage>
  <!-- 扑克牌  -->
  <!-- 操作按钮 v-if="roomStore.action_seat_id == roomStore.sceneMsg.self_seat_id && roomStore.action_second > 0"-->
  <UserBtns />
  <Setting :show="showSetting" @onClose="showSetting = !showSetting" />
  <TopPokers class="z-999999" />
  <BlindRecord class="z-999999!" :show="showBlindRecord" @onClose="showBlindRecord = !showBlindRecord" />
  <HandRecord class="z-999999!" :show="showHandRecord" @onClose="showHandRecord = !showHandRecord" />
  <BalanceBet :show="roomStore.buySeatIds.includes(roomStore.sceneMsg.self_seat_id) && roomStore.buyWaitTime > 0" />
  <BaoXianBet
    :show="roomStore.baoxianSeatIds.includes(roomStore.sceneMsg.self_seat_id) && roomStore.baoxianSecond > 0" />
  <Chat class="z-999999!" :show="showChat" @onClose="showChat = !showChat" />
  <GameUserInfo class="z-999999!" :show="roomStore.showUser" @onClose="roomStore.showUser = !roomStore.showUser" />
  <EnterBuy v-if="userStore.userInfo.tgid != 0" class="z-999999!" :show="roomStore.showBuyEnter"
    @onClose="roomStore.showBuyEnter = !roomStore.showBuyEnter" />
  <CheMa v-if="userStore.userInfo.tgid != 0" class="z-999999!" :show="roomStore.showCheMa"
    @onClose="roomStore.showCheMa = !roomStore.showCheMa" />

  <div v-if="showBaoxian" style="top: 30%;" class="pos-fixed top-[30%] w-[70%] left-[15%] h-[60px] z-999 ">
    <div class="h-full pos-relative ml-2">
      <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[90%]! " :border-radius="10" />
      <div class="bg-[rgba(0,0,0,0.6)] w-[98%]! h-[96%] border-rd-[0.5rem] flex justify-center items-center ">
        <svg t="1756224008997" class="icon mr-2" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="4599" width="40" height="40">
          <path
            d="M441.6 306.8L403 288.6c-3.3-1.6-7.3 0.2-8.4 3.7-17.5 58.5-45.2 110.1-82.2 153.6-1.3 1.6-1.8 3.7-1.2 5.6l13.2 43.5c1.3 4.4 7 5.7 10.2 2.4 7.7-8.1 15.4-16.9 23.1-26V656c0 4.4 3.6 8 8 8H403c4.4 0 8-3.6 8-8V393.1c13.8-25.1 25.1-51.7 33.6-79 1-2.9-0.3-6-3-7.3z m26.8 9.2v127.2c0 4.4 3.6 8 8 8h65.9v18.6h-94.9c-4.4 0-8 3.6-8 8v35.6c0 4.4 3.6 8 8 8h55.1c-19.1 30.8-42.4 55.7-71 76-2.6 1.8-3.3 5.4-1.6 8.1l22.8 36.5c1.9 3.1 6.2 3.8 8.9 1.4 31.6-26.8 58.7-62.9 80.6-107.6v120c0 4.4 3.6 8 8 8h36.2c4.4 0 8-3.6 8-8V536c21.3 41.7 47.5 77.5 78.1 106.9 2.6 2.5 6.8 2.1 8.9-0.7l26.3-35.3c2-2.7 1.4-6.5-1.2-8.4-30.5-22.6-54.2-47.8-72.3-76.9h59c4.4 0 8-3.6 8-8V478c0-4.4-3.6-8-8-8h-98.8v-18.6h66.7c4.4 0 8-3.6 8-8V316c0-4.4-3.6-8-8-8H476.4c-4.4 0-8 3.6-8 8z m51.5 42.8h97.9v41.6h-97.9v-41.6z"
            p-id="4600" fill="#ffffff"></path>
          <path
            d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 0.7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c0.2-8.8-6.6-18.3-14.9-21.2zM810 654.3L512 886.5 214 654.3V226.7l298-101.6 298 101.6v427.6z"
            p-id="4601" fill="#ffffff"></path>
        </svg>
        <p class="text-[18px] font-bold text-white">保险已开启</p>
      </div>
    </div>
  </div>
</template>
