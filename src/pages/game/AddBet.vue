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
  if (Number(userStore.userInfo?.balance) < roomStore.sceneMsg.max_buy) {
    if (userStore.userInfo.balance < roomStore.sceneMsg.min_buy) {
      return roomStore.sceneMsg.max_buy
    } else {
      return Number(userStore.userInfo?.balance)
    }
  } else {
    return roomStore.sceneMsg.max_buy
  }
})
const buyMoney = ref((Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.33).toFixed(2))
const addBet = () => {
  socketStore.doSomething(IOptItem.OptItemRaise, Number(buyMoney.value))
  emit('onClose')

}

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%] text-[12px] p-5 px-4 h-[40%] w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <!-- <van-slider bar-height="10px" class="w-[95%]! mr-[10px]" active-color="#e1bf65" v-model="buyMoney" :step="5"
          :min="Number(roomStore.sceneMsg.max_bet_amount)" :max="roomStore.roomUserInfo.balance">
          <template #button>
            <img class="w-[30px] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
          </template>
        </van-slider>
        <div class="flex flex-row justify-evenly items-center w-[95%] bg-white bg-op-10 px-[10px] py-[2px] rounded-md">
          <van-field v-model="buyMoney" type="digit"
            class="bg-red! text-amber! font-bold  text-center  text-[16px] w-[80px]! bg-op-0!" />
        </div> -->
        <div class="flex flex-row justify-evenly flex-wrap">
         <button class="image-button my-2">
          <div @click="buyMoney = (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.33).toFixed(2)"
            class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
            <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_blue.png" />
            <p class="z-10 text-white font-bold text-[15px]">{{  (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.33).toFixed(2)   }}</p>
          </div>
        </button>
        <button class="image-button">
          <div @click="buyMoney = (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.5).toFixed(2)"
            class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
            <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_green.png" />
            <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.5).toFixed(2) }}</p>
          </div>
        </button>
        <button class="image-button my-2">
          <div @click="buyMoney = (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.66).toFixed(2)"
            class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
            <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
            <p class="z-10 text-white font-bold text-[15px]">{{ (Number(roomStore.sceneMsg.max_bet_amount) + (roomStore.roomUserInfo.balance -  Number(roomStore.sceneMsg.max_bet_amount)) * 0.66).toFixed(2) }}</p>
          </div>
        </button>

        <button class="image-button my-2">
          <div @click="buyMoney = ((roomStore.roomUserInfo.balance )).toFixed(2) "
            class=" pos-relative flex justify-center items-center w-[100px] aspect-ratio-[14/5]">
            <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
            <p class="z-10 text-white font-bold text-[15px]">{{ roomStore.roomUserInfo.balance }}</p>
          </div>
        </button>
       </div>
        <van-button block @click="addBet" color="linear-gradient(to right, #638ccb, #f2c14b)">
          确认加注${{ buyMoney }}
        </van-button>
      </div>
    </div>
  </van-overlay>
</template>


<style>
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

.van-field__control {
  font-size: 20px;
  color: #ebbb32 !important;
}
</style>
