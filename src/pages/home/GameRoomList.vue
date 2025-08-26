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
const roomStore = useRoomStore()

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
      <v-virtual-scroll class="h-full " :items="recordStore.roomList">
        <template v-slot:default="{ item }">
          <v-card v-if="selectType == item.room_type || selectType == 0"
            style="background: var(--my-buttonSecondaryBg);" v-ripple="{ class: `text-info` }"
            class="mt-[4px]  px-[5%]! py-2 ">
            <div class="flex flex-row justify-between items-center" @click="toRoom(item)">
              <div class="flex flex-col">

                <van-circle layer-color="rgba(0,0,0,0.2)" color="#70ed96" stroke-width="100" :current-rate="(item.sit_num / item.seat_num) * 100" :rate="100"
                  :text="`${item.sit_num}/${item.seat_num}`" size="50px" />
              </div>


              <div class="flex flex-col items-start justify-start flex-1 pl-[5%] text-[14px]"  >
                <div class="flex flex-row items-center justify-center text-[rgba(0,0,0,0.6)] font-500">
                  <svg t="1753531549045" class="icon" viewBox="0 0 1024 1024" version="1.1"
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
                  </svg>
                  {{ item.room_name }}({{ item.room_type == 1 ? '长牌' : '短牌' }})<span>{{ item.room_id }}</span>
                </div>

                <div class="flex flex-row items-center justify-center font-bold ">
                  <svg t="1751986220889" class="icon" viewBox="0 0 1025 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="5573" width="20" height="20">
                    <path
                      d="M522.686907 518.314991m-485.282732 0a485.282732 485.282732 0 1 0 970.565464 0 485.282732 485.282732 0 1 0-970.565464 0Z"
                      fill="#D9B142" p-id="5574"></path>
                    <path
                      d="M522.686907 518.314991m-431.362429 0a431.362429 431.362429 0 1 0 862.724858 0 431.362429 431.362429 0 1 0-862.724858 0Z"
                      fill="#FDD158" p-id="5575"></path>
                    <path
                      d="M643.643264 407.559772m-66.064516 0a66.064516 66.064516 0 1 0 132.129032 0 66.064516 66.064516 0 1 0-132.129032 0Z"
                      fill="#FBE6A3" p-id="5576"></path>
                    <path d="M466.337761 773.343454h113.184061v22.345351H466.337761z" fill="" p-id="5577"></path>
                    <path
                      d="M511.79112 840.816698v-113.18406h22.345351v113.18406zM186.535104 508.113852h113.184061v22.345351H186.535104z"
                      fill="" p-id="5578"></path>
                    <path d="M231.653283 575.698824v-113.184061h22.345351v113.184061z" fill="" p-id="5579"></path>
                    <path d="M412.417457 407.559772h221.024668v221.024668H412.417457z" fill="#F5D894" p-id="5580">
                    </path>
                    <path d="M466.337761 233.16888h113.184061v22.345351H466.337761z" fill="" p-id="5581"></path>
                    <path d="M511.961139 300.476964v-113.184061h22.345351v113.184061z" fill="" p-id="5582"></path>
                    <path d="M460.02277 455.165085h126.299811v126.299811h-126.299811z" fill="#E1AD4A" p-id="5583">
                    </path>
                    <path
                      d="M522.686907 32.54649c-268.144213 0-485.282732 217.13852-485.282732 485.282732s217.13852 485.282732 485.282732 485.282732 485.282732-217.13852 485.282732-485.282732-217.13852-485.282732-485.282732-485.282732z m0 953.563567c-258.914611 0-468.280835-209.851992-468.280835-468.280835s209.851992-468.280835 468.280835-468.280835S990.967742 259.40038 990.967742 517.829222 781.601518 986.110057 522.686907 986.110057z"
                      fill="" p-id="5584"></path>
                    <path d="M737.882353 508.113852h113.184061v22.345351h-113.184061z" fill="" p-id="5585"></path>
                    <path d="M783.000531 575.698824v-113.184061h22.345351v113.184061z" fill="" p-id="5586"></path>
                    <path
                      d="M522.686907 77.237192c-244.341556 0-442.535104 198.193548-442.535104 442.049336 0 244.341556 198.193548 442.535104 442.535104 442.535104s442.049336-198.193548 442.049336-442.535104c0.485769-244.341556-197.70778-442.049336-442.049336-442.049336z m0 869.039848c-235.597723 0-426.990512-190.907021-426.990512-426.990512S287.089184 92.296015 522.686907 92.296015c235.597723 0 426.990512 190.907021 426.990512 426.990513s-191.392789 426.990512-426.990512 426.990512z"
                      fill="" p-id="5587"></path>
                    <path
                      d="M412.417457 407.559772v221.024668h221.024668V407.559772H412.417457z m210.82353 210.82353H422.132827V417.275142h201.10816v201.10816z"
                      fill="" p-id="5588"></path>
                    <path
                      d="M455.165085 455.165085v135.043644h135.043644V455.165085H455.165085z m129.214422 128.728653H461.480076V460.994307h122.899431v122.899431z"
                      fill="" p-id="5589"></path>
                  </svg>

                  {{ item.little_blind }}/{{ item.big_blind }}<span v-if="item.straddle_blind  > 0">({{ item.straddle_blind }})</span>

                </div>
              </div>

              <div class="flex flex-col">
                <p class="text-[12px] text-[rgba(0,0,0,0.4)] font-500">最小买入</p>
                <div class="flex flex-1 items-center justify-center text-[20px]">
                  <img src="../../assets/imgae/m_icon.png" class="w-[20px] h-[20px] " alt="" srcset="">
                  {{ item.min_buy }}
                </div>
              </div>
            </div>
          </v-card>
        </template>
      </v-virtual-scroll>
    </div>

  </AppPage>
</template>
