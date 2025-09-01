<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import UserBalance from '@/components/UserBalance.vue';
import router from '@/router';
import { useRecordStore } from '@/stores/record';
import { useRoomStore } from '@/stores/room';
import type { PokerRoomConfig } from '@/utils/interface';
import LocalUtil from '@/utils/LocalUtil';
import { ref } from 'vue';
const onClickLeft = () => history.back();
const recordStore = useRecordStore()
recordStore.getRoomList()

const toRoom = (game: PokerRoomConfig) => {
  console.log('进入游戏');
  router.replace({
    path: '/game',
    query: {
      roomId: game.room_id
    }
  })
}


const btns = [
  {
    type: 0,
    text: '全部'
  },
  {
    type: 1,
    text: 'NLH'
  },
  {
    type: 2,
    text: '6+'
  },
]

const selectType = ref(0)
const clickBtn = (type: number) => {
  selectType.value = type
}
</script>

<template>
  <AppPage class=" h-svh">
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="游戏大厅" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
        <!-- <UserBalance /> -->
      </template>
    </van-nav-bar>

    <div class="h-[calc(100%-100px)] px-[5px]">
      <div class="flex flex-row justify-start items-center px-2">
        <v-btn v-for="item in btns" :key="item.type" @click="clickBtn(item.type)"
          :style="selectType == item.type ? 'background:var(--my-buttonPrimaryBg); border:var(--my-buttonSecondaryBorder)' : 'background:var(--my-buttonSecondaryBg);border:var(--my-buttonSecondaryBorder)'"
          class="m-2" height="25" min-width="50">
          <p :class="selectType == item.type ? 'text-[var(--my-buttonPrimaryText)]' : 'text-[var(--my-buttonSecondaryText)]'"
            class="text-[12px] font-bold ">{{ item.text }}</p>
        </v-btn>
      </div>
      <v-virtual-scroll class="h-full bg-[#2a3035]" :items="recordStore.roomList">
        <template v-slot:default="{ item }">
          <div v-if="selectType == item.room_type || selectType == 0" style="background: #15181c;"
            v-ripple="{ class: `text-info` }" class="mt-[2px]  px-[5%]! py-2 ">
            <div class="flex flex-row justify-between items-center" @click="toRoom(item)">
              <div class="flex flex-col">
                <van-circle layer-color="#46515b" color="#75fb92" stroke-width="120"
                  :current-rate="(item.sit_num / item.seat_num) * 100" :rate="100"
                  :text="`${item.sit_num}/${item.seat_num}`" size="50px" />
              </div>
              <div class="flex flex-col items-start justify-start flex-1 pl-[5%] text-[12px] text-[#fff]">
                <div class="flex flex-row items-center justify-center text-[#fff]  font-500">
                  <!-- <svg t="1753531549045" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="1820" width="20" height="20">
                    <path
                      d="M332.712 762.172c-26.957-15.193-71.548-6.692-133.775 25.503-46.521 27.064-90.653 30.833-132.396 11.308 12.934 35.907 34.34 59.218 64.22 69.933-0.593 0.916-14.774 48.007-59.261 51.717 22.491 11.857 64.141 41.819 196.606-11.718 88.31-35.692 118.635-45.541 90.974-29.549l-26.368-117.194zM661 898c21.917 19.987 67.458 24.293 136.624 12.92 52.635-11.345 95.792-1.319 129.47 30.08-1.2-38.065-14.36-66.788-39.476-86.168 0.848-0.686 28.906-41.008 72.382-30.815-17.733-18.186-48.096-59.46-190.694-49.483-95.065 6.651-126.965 6.651-95.7 0L661 898z"
                      fill="#E87237" p-id="1821"></path>
                    <path
                      d="M536.5 112.454l303.267 175.092a57 57 0 0 1 28.5 49.363v350.182a57 57 0 0 1-28.5 49.363L536.5 911.546a57 57 0 0 1-57 0L176.233 736.454a57 57 0 0 1-28.5-49.363V336.909a57 57 0 0 1 28.5-49.363L479.5 112.454a57 57 0 0 1 57 0z"
                      fill="#FEE5D2" p-id="1822"></path>
                    <path
                      d="M536.5 170.454l253.037 146.092a57 57 0 0 1 28.5 49.363v292.182a57 57 0 0 1-28.5 49.363L536.5 853.546a57 57 0 0 1-57 0L226.463 707.454a57 57 0 0 1-28.5-49.363V365.909a57 57 0 0 1 28.5-49.363L479.5 170.454a57 57 0 0 1 57 0z"
                      fill="#BD6C45" p-id="1823"></path>
                    <path
                      d="M536.5 206.454l221.86 128.092a57 57 0 0 1 28.5 49.363v256.182a57 57 0 0 1-28.5 49.363L536.5 817.546a57 57 0 0 1-57 0L257.64 689.454a57 57 0 0 1-28.5-49.363V383.909a57 57 0 0 1 28.5-49.363L479.5 206.454a57 57 0 0 1 57 0z"
                      fill="#DC996E" p-id="1824"></path>
                    <path
                      d="M209 764.84c-1.954-15.378 14.266-18.966 48.662-10.765 34.395 8.202 64.508 11.79 90.338 10.764V811l-139-46.16zM665.819 804.98L661 898c6.848-25.763 21.367-36.678 43.557-32.744 17.132 2.893 35.427 14.362 43.1 17.937 22.451 10.46 38.565 10.46 48.343 0V778l-130.181 26.98z"
                      fill="#BF4800" p-id="1825"></path>
                    <path
                      d="M209 760.89c20.687 23.197 106.793 15.357 258.318-23.52C621.836 703.856 743.73 711.696 833 760.89l-36.934 122.33c-30.042-52.548-127.51-61.488-292.404-26.822-242.67 65.794-268.439 36.178-281.369 26.822-2.725-16.058-7.156-56.834-13.293-122.33z"
                      fill="#FF7612" p-id="1826"></path>
                    <path
                      d="M331.914 594.762L304.07 608.484h216.93l7.98-13.722zM362.082 461l-19.22 6.861h219.533l5.515-6.861z"
                      fill="#D98158" p-id="1827"></path>
                    <path d="M331.176 392.816l5.892 5.045h213.465l5.516-6.861z" fill="#D98158" p-id="1828"></path>
                    <path d="M667.688 341.496l7.875 28.563-40.641 284.09-15.035 11.038z" fill="#C2683E" p-id="1829">
                    </path>
                  </svg> -->
                  {{ item.room_name }}({{ item.room_type == 1 ? '长牌' : '短牌' }})<span>#{{ item.room_id }}</span>
                </div>
                <div class="flex flex-row items-center justify-start font-bold w-full pos-relative">
                  {{ item.little_blind }}/{{ item.big_blind }}<span v-if="item.straddle_blind > 0">({{
                    item.straddle_blind }})</span>
                  <van-count-down class="ml-2 " :time="item.end_time * 1000" />
                </div>
                <svg v-if="item.is_open_insurance" t="1756224008997" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="4599" width="20" height="20">
                  <path
                    d="M441.6 306.8L403 288.6c-3.3-1.6-7.3 0.2-8.4 3.7-17.5 58.5-45.2 110.1-82.2 153.6-1.3 1.6-1.8 3.7-1.2 5.6l13.2 43.5c1.3 4.4 7 5.7 10.2 2.4 7.7-8.1 15.4-16.9 23.1-26V656c0 4.4 3.6 8 8 8H403c4.4 0 8-3.6 8-8V393.1c13.8-25.1 25.1-51.7 33.6-79 1-2.9-0.3-6-3-7.3z m26.8 9.2v127.2c0 4.4 3.6 8 8 8h65.9v18.6h-94.9c-4.4 0-8 3.6-8 8v35.6c0 4.4 3.6 8 8 8h55.1c-19.1 30.8-42.4 55.7-71 76-2.6 1.8-3.3 5.4-1.6 8.1l22.8 36.5c1.9 3.1 6.2 3.8 8.9 1.4 31.6-26.8 58.7-62.9 80.6-107.6v120c0 4.4 3.6 8 8 8h36.2c4.4 0 8-3.6 8-8V536c21.3 41.7 47.5 77.5 78.1 106.9 2.6 2.5 6.8 2.1 8.9-0.7l26.3-35.3c2-2.7 1.4-6.5-1.2-8.4-30.5-22.6-54.2-47.8-72.3-76.9h59c4.4 0 8-3.6 8-8V478c0-4.4-3.6-8-8-8h-98.8v-18.6h66.7c4.4 0 8-3.6 8-8V316c0-4.4-3.6-8-8-8H476.4c-4.4 0-8 3.6-8 8z m51.5 42.8h97.9v41.6h-97.9v-41.6z"
                    p-id="4600" fill="#404a56"></path>
                  <path
                    d="M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 0.7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c0.2-8.8-6.6-18.3-14.9-21.2zM810 654.3L512 886.5 214 654.3V226.7l298-101.6 298 101.6v427.6z"
                    p-id="4601" fill="#404a56"></path>
                </svg>

              </div>
              <div class="flex flex-col justify-between items-end">
                <p class=" w-[50px] text-center text-[12px] text-[#171a1e] font-500 bg-[#46515b]  py-[2px] rounded">{{ item.room_type == 1 ?'德州':'6+' }}</p>
                <p class="text-[12px] text-[#414654] font-500">最小买入</p>
                <div class="flex flex-1 items-center justify-center text-[20px] text-[#fff] font-bold">
                  <img src="../../assets/imgae/m_icon.png" class="w-[20px] h-[20px] " alt="" srcset="">
                  {{ item.min_buy }}
                </div>
              </div>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>

  </AppPage>
</template>
<style lang="css" scoped>
:deep(.van-circle__text) {
  color: #fff !important
}

:deep(.van-count-down) {
  color: #677481 !important;
  font-size: 12px;
}
</style>
