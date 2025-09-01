<script setup lang="ts">
import { useSocketStore } from '@/stores/mysocket';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { IOptItem } from '@/utils/interface';
import { computed, ref } from 'vue';

const props = defineProps({
  show: Boolean,
})


const emit = defineEmits(['onClose']);
const roomStore = useRoomStore()
const socketStore = useSocketStore()
const userStore = useUserStore()
const max_buy = computed(() => {
  if (Number(roomStore.roomUserInfo.balance) < roomStore.sceneMsg.max_buy) {
    if (userStore.userInfo.balance < roomStore.sceneMsg.min_buy) {
      return roomStore.sceneMsg.max_buy
    } else {
      return Number(roomStore.roomUserInfo.balance)
    }
  } else {
    return roomStore.sceneMsg.max_buy
  }
})
const buyMoney = ref(roomStore.roomUserInfo.balance)
const addBet = () => {
  emit('onClose')

  if (Number(buyMoney.value) == Number(roomStore.roomUserInfo.balance)) {
    socketStore.doSomething(IOptItem.OptItemAllIn)
  } else {
    socketStore.doSomething(IOptItem.OptItemFirstBet, Number(buyMoney.value))
  }
  buyMoney.value =  Number(roomStore.sceneMsg.pot_amount)
}

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%] text-[12px] p-5 px-4  w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col  border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="flex flex-row justify-evenly flex-wrap">
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 0.33).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 0.33 && Number(roomStore.sceneMsg.pot_amount) * 0.33 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_green.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{
                (Number(roomStore.sceneMsg.pot_amount) * 0.33).toFixed(2) }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 0.5).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 0.5 && Number(roomStore.sceneMsg.pot_amount) * 0.5 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) *
                0.5).toFixed(2)
                }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 1).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 1 && Number(roomStore.sceneMsg.pot_amount) * 1 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_blue.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) * 1).toFixed(2)
              }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 1.5).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 1.5 && Number(roomStore.sceneMsg.pot_amount) * 1.5 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_green.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) *
                1.5).toFixed(2)
                }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 2).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 2 && Number(roomStore.sceneMsg.pot_amount) * 2 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) * 2).toFixed(2)
              }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 5).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 5 && Number(roomStore.sceneMsg.pot_amount) * 5 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_blue.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) * 5).toFixed(2)
              }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 10).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 10 && Number(roomStore.sceneMsg.pot_amount) * 10 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_green.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) *
                10).toFixed(2)
                }}</p>
            </div>
          </button>
          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="buyMoney = (Number(roomStore.sceneMsg.pot_amount) * 20).toFixed(2)"
              v-if="roomStore.roomUserInfo.balance > Number(roomStore.sceneMsg.pot_amount) * 20 && Number(roomStore.sceneMsg.pot_amount) * 20 > Number(roomStore.sceneMsg.max_bet_amount)"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
              <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.pot_amount) *
                20).toFixed(2)
                }}</p>
            </div>
          </button>

          <button v-ripple="{ class: `text-info` }"class="image-button my-2">
            <div @click="socketStore.doSomething(IOptItem.OptItemAllIn); emit('onClose')"
              class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
              <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
              <p class="z-10 text-white font-bold text-[15px]">ALL-IN</p>
            </div>
          </button>
          <div class="image-button my-2 pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
            <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
            <van-field type="number"
              class="bg-[rgba(255,255,255,0)]!  p-0! m-0!  font-bold! w-[70%]! text-[15px]! text-amber!" :border="false"
              v-model="buyMoney" input-align="center" placeholder="自定义" label-align="top"
              :max="roomStore.roomUserInfo.balance" :min="Number(roomStore.sceneMsg.pot_amount) * 0.33" />
          </div>
        </div>

        <van-button block @click="addBet" class="h-[40px]" color="linear-gradient(to right, #638ccb, #f2c14b)">
          确认下注${{ buyMoney }}
        </van-button>
      </div>
    </div>
  </van-overlay>
</template>


<style lang="css" scoped>
.wrapper2 {
  display: flex;
  align-items: end;
  justify-content: center;
  padding-bottom: 140px;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}

:deep(.van-field__control) {
  color: var(--my-text) !important;
  font-size: 20px !important;
}
</style>
