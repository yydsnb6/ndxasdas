<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { IOptItem, type ISeatInfo, type IUserInfo } from "@/utils/interface"
import { ESeatPos } from "@/utils/interface"
import { useRoomStore } from '@/stores/room';
import bus from '@/utils/bus';
import CountDown from './CountDown.vue'
import bet from '@/assets/sound/bet.mp3'
import { useSound } from '@vueuse/sound';
import { useSocketStore } from '@/stores/mysocket';
const doBet = useSound(bet, { volume: 1 })

const props = defineProps<{
  user: IUserInfo,
  pos: ESeatPos,
  seatInfo: ISeatInfo
}>()
const roomStore = useRoomStore()
const socketStore = useSocketStore()



let currentSeatId: string | number | null | undefined = null;



const cookFlyData = () => {
  // doBet.play()
}

onMounted(() => {
  if (props.seatInfo) {
    bus.on('Event1007' + props.seatInfo?.seat_id, cookFlyData);
    currentSeatId = props.seatInfo?.seat_id; // 更新当前存储的 seat_id

  }


})

watch(
  () => props.seatInfo?.seat_id, // 监听 seat_id 变化
  (newSeatId) => {
    // 清理之前的事件监听
    if (currentSeatId !== null) {
      bus.off('Event1007' + currentSeatId, cookFlyData);
    }

    // 设置新的监听
    if (newSeatId !== null) {
      bus.on('Event1007' + newSeatId, cookFlyData);
      currentSeatId = newSeatId; // 更新当前存储的 seat_id
    }
  },
  { immediate: true } // 初始挂载时立即执行
);

onUnmounted(() => {
  // 清理最后一次注册的监听
  if (currentSeatId !== null) {
    bus.off('Event1007' + currentSeatId, cookFlyData);
  }
});






const winData = computed(() => {
  let data = roomStore.winSeats.find((item) => {
    return item.win_seat_id == props.seatInfo.seat_id
  })
  if (data) {
    return data
  } else {
    return {
      win_amount: 0,
      win_card: [],
      win_card_type: 0,
      win_seat_id: -1,
    }
  }

})

const cardType = [
  ' 高牌',
  ' 一对',
  ' 两对',
  ' 三条',
  ' 顺子',
  ' 同花',
  ' 葫芦',
  ' 四条',
  ' 同花顺',
  ' 皇家同花顺',
]

</script>
<template>


  <div class=" pos-relative " @click="roomStore.getShowUserInfo(props.user.user_id)">
    <div v-if="props.pos == ESeatPos.Left" class="flex flex-row  text-[var(--my-text)] text-[12px]">
      <div class="flex-col flex justify-center items-center pos-relative">
        <div class="w-[3rem] h-[3rem] pos-relative bg-amber rounded-full "
          :class="`${Number(winData.win_amount) > 0 ? 'avatar-shadow' : ''}`">
          <img v-if="Number(winData.win_amount) > 0" src="../../assets/imgae/winbg.png"
            class="w-[8rem] h-[8rem]  rotating-bg" alt="" srcset="">
          <van-image class=" !pos-absolute bottom-0 " round width="3rem" height="3rem" :src="props.user.head_url" />
          <div
            class=" pos-absolute left-[3rem] top-[0px] h-[15px] bg-[#000] bg-op-30 rounded-3xl p-[2px] flex flex-row items-center px-[4px]">
            <img class="h-[80%] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <p class="text-[10px] text-amber font-bold ml-[2px]">{{ Number(props.user.total_bet_amount).toFixed(2) }}
            </p>
          </div>

        </div>
        <div class="flex flex-col bg-[#000] bg-op-20  w-[55px] h-[35px] text-center rounded-lg px-1 mt-2 relative">
          <p class="p-0 m-0 mt-[2px] text-[10px] text-ellipsis! w-[50px] overflow-hidden whitespace-nowrap">{{
            user.first_name }}</p>
          <van-divider dashed hairline class="m-0! !border-[rgba(255,255,255,0.5)]" />
          <p class="text-amber font-bold border-t text-[10px] border-t-blue">$:{{ Number(props.user.balance).toFixed(2)
          }}</p>
          <p v-if="winData.win_seat_id != -1" :class="`${Number(winData.win_amount) > 0 ? 'text-green!' : ''}`"
            class="px-[8px] py-0 absolute  left-[80%] font-bold  bottom-[-1px] rounded  text-[16px] text-[var(--my-text)]">
            {{ `${Number(winData.win_amount) > 0 ? '+' + Number(winData.win_amount).toFixed(2) :
              Number(winData.win_amount).toFixed(2)}` }}</p>
        </div>

      </div>
    </div>

    <div v-if="props.pos == ESeatPos.Right" class="flex flex-row  text-[var(--my-text)] text-[12px]">
      <div class="flex-col flex justify-center items-center pos-relative">
        <div class="w-[3rem] h-[3rem] pos-relative bg-amber rounded-full "
          :class="`${Number(winData.win_amount) > 0 ? 'avatar-shadow' : ''}`">
          <img v-if="Number(winData.win_amount) > 0" src="../../assets/imgae/winbg.png"
            class="w-[8rem] h-[8rem]  rotating-bg" alt="" srcset="">
          <van-image class=" !pos-absolute bottom-0" round width="3rem" height="3rem" :src="props.user.head_url" />
          <div
            class=" pos-absolute right-[3.5rem] top-[0px] h-[15px] bg-[#000] bg-op-30 rounded-3xl p-[2px] flex flex-row items-center px-[4px]">
            <img class="h-[80%] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <p class="text-[10px] text-amber font-bold ml-[2px]">{{ Number(props.user.total_bet_amount).toFixed(2) }}
            </p>
          </div>
        </div>
        <div class="flex flex-col bg-[#000] bg-op-20  w-[55px] h-[35px] text-center rounded-lg px-1 mt-2 relative">
          <p class="p-0 m-0 mt-[2px] text-[10px] text-ellipsis! w-[50px] overflow-hidden whitespace-nowrap">{{
            user.first_name }}</p>
          <van-divider dashed hairline class="m-0! !border-[rgba(255,255,255,0.5)]" />
          <p class="text-amber font-bold border-t text-[10px] border-t-blue">$:{{ Number(props.user.balance).toFixed(2)
          }}</p>
          <p v-if="winData.win_seat_id != -1" :class="`${Number(winData.win_amount) > 0 ? 'text-green!' : ''}`"
            class=" text-right px-[8px] py-0 absolute  right-[80%]  font-bold  bottom-[-1px] rounded  text-[16px] text-[var(--my-text)]">
            {{ `${Number(winData.win_amount) > 0 ? '+' + Number(winData.win_amount).toFixed(2) :
              Number(winData.win_amount).toFixed(2)}` }}</p>
        </div>


      </div>
    </div>

    <div v-if="props.pos == ESeatPos.Top" class="flex flex-col  text-[var(--my-text)] text-[10px] items-center  ">
      <div class="flex-col flex justify-center items-center pos-relative ">
        <div class="w-[3rem] h-[3rem] pos-relative bg-amber rounded-full "
          :class="`${Number(winData.win_amount) > 0 ? 'avatar-shadow' : ''}`">
          <img v-if="Number(winData.win_amount) > 0" src="../../assets/imgae/winbg.png"
            class="w-[8rem] h-[8rem]  rotating-bg" alt="" srcset="">
          <div
            class=" pos-absolute left-[50px] top-[15px] h-[15px] bg-[#000] bg-op-30 rounded-3xl p-[2px] flex flex-row items-center px-[4px]">
            <img class="h-[80%] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <p class="text-[10px] text-amber font-bold ml-[2px]">{{ Number(props.user.total_bet_amount).toFixed(2) }}
            </p>
          </div>
          <van-image class=" !pos-absolute bottom-0" round width="3rem" height="3rem" :src="props.user.head_url" />
        </div>
        <div class=" op-0  flex flex-col bg-[#000] bg-op-20  w-[55px] h-[35px] text-center rounded-lg px-1 mt-1">

        </div>
        <div
          class=" pos-absolute  bottom-10 flex flex-col bg-[#000] bg-op-20  w-[55px] h-[35px] text-center rounded-lg px-1 mt-1 relative">
          <p class="p-0 m-0 mt-[2px] text-[10px] text-ellipsis! w-[50px] overflow-hidden whitespace-nowrap">{{
            user.first_name }}</p>
          <van-divider dashed hairline class="m-0! !border-[rgba(255,255,255,0.5)]" />
          <p class="text-amber font-bold border-t text-[10px] border-t-blue">$:{{ Number(props.user.balance).toFixed(2)
          }}</p>
          <p v-if="winData.win_seat_id != -1" :class="`${Number(winData.win_amount) > 0 ? 'text-green!' : ''}`"
            class="px-[8px] py-0 absolute  left-[200%] font-bold  top-[-60px] rounded  text-[16px] text-[var(--my-text)]">
            {{ `${Number(winData.win_amount) > 0 ? '+' + Number(winData.win_amount).toFixed(2) :
              Number(winData.win_amount).toFixed(2)}` }}</p>
        </div>

      </div>

    </div>

    <div v-if="props.pos == ESeatPos.Bottom" class="flex flex-col  text-[var(--my-text)] text-[12px] items-center  ">
      <div class="flex-col flex justify-center items-center pos-relative ">
        <div class="w-[3rem] h-[3rem] pos-relative bg-amber rounded-full "
          :class="`${Number(winData.win_amount) > 0 ? 'avatar-shadow' : ''}`">
          <img v-if="Number(winData.win_amount) > 0" src="../../assets/imgae/winbg.png"
            class="w-[8rem] h-[8rem]  rotating-bg" alt="" srcset="">

          <div
            class=" pos-absolute left-[50px] top-[15px] h-[15px] bg-[#000] bg-op-30 rounded-3xl p-[2px] flex flex-row items-center px-[4px]">
            <img class="h-[80%] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <p class="text-[10px] text-amber font-bold ml-[2px]">{{ Number(props.user.total_bet_amount).toFixed(2) }}
            </p>
          </div>
          <van-image class=" !pos-absolute bottom-0" round width="3rem" height="3rem" :src="props.user.head_url" />
        </div>
        <div class="flex flex-col bg-[#000] bg-op-20  w-[55px] h-[35px] text-center rounded-lg px-1 mt-1 relative">
          <p class="p-0 m-0 mt-[2px] text-[10px] text-ellipsis! w-[50px] overflow-hidden whitespace-nowrap">{{
            user.first_name }}</p>
          <van-divider dashed hairline class="m-0! !border-[rgba(255,255,255,0.5)]" />
          <p class="text-amber font-bold border-t text-[10px] border-t-blue">$:{{ Number(props.user.balance).toFixed(2)
          }}</p>
          <p v-if="winData.win_seat_id != -1" :class="`${Number(winData.win_amount) > 0 ? 'text-green!' : ''}`"
            class="px-[8px] py-0 absolute  left-[80%] font-bold  bottom-[-1px] rounded  text-[16px] text-[var(--my-text)]">
            {{ `${Number(winData.win_amount) > 0 ? '+' + Number(winData.win_amount).toFixed(2) :
              Number(winData.win_amount).toFixed(2)}` }}</p>
        </div>




      </div>
    </div>

    <div v-if="winData.win_seat_id != -1 && winData.win_card_type != -1"
      class="absolute  top-[28px] left-[-5px]  text-[12px] text-[white] font-bold  px-1 rounded bg-[#000] bg-op-50 flex justify-center items-center">
      {{ cardType[winData.win_card_type] }}
    </div>
    <CountDown v-if="roomStore.action_second > 0 && roomStore.action_seat_id == props.seatInfo.seat_id"
      class="!pos-absolute top-[-1px] left-[3.2px] w-[3.2rem]! h-[3.2rem]! z-[9999] bg-[#000] bg-op-50 rounded-full"
      :duration="roomStore.action_second" progress-color="#3498db" auto-start progressColorBg="rgba(0,0,0,0.5)"
      :pos-y="roomStore.sceneMsg.self_seat_id == props.seatInfo.seat_id ? 60 : 80"
      @completed="() => { roomStore.action_second = 0 }" />
    <CountDown v-if="roomStore.buyWaitTime > 0 && roomStore.buySeatIds.includes(props.seatInfo.seat_id)"
      class="!pos-absolute top-[-1px] left-[3.2px] w-[3.2rem]! h-[3.2rem]! z-[9999] bg-[#000] bg-op-50 rounded-full"
      :duration="roomStore.buyWaitTime" progress-color="#3498db" auto-start progressColorBg="rgba(0,0,0,0.5)"
      @completed="() => { roomStore.buyWaitTime = 0 }"
      :pos-y="roomStore.sceneMsg.self_seat_id == props.seatInfo.seat_id ? 60 : 80" />
    <CountDown v-if="roomStore.baoxianSecond > 0 && roomStore.baoxianSeatIds.includes(props.seatInfo.seat_id)"
      class="!pos-absolute top-[-1px] left-[3.2px] w-[3.2rem]! h-[3.2rem]! z-[9999] bg-[#000] bg-op-50 rounded-full"
      :duration="roomStore.baoxianSecond" progress-color="#3498db" auto-start progressColorBg="rgba(0,0,0,0.5)"
      @completed="() => { roomStore.baoxianSecond = 0 }"
      :pos-y="roomStore.sceneMsg.self_seat_id == props.seatInfo.seat_id ? 60 : 80" />

    <v-btn v-if="roomStore.can_look_card_seat_ids.includes(roomStore.sceneMsg.self_seat_id) && props.pos == ESeatPos.Bottom"   class="right-[-80px] w-[3rem] h-[3rem] op-80 pos-absolute bottom-[35px]  z-[90]"
      @click.stop="socketStore.lookCard()"
      style="background:var(--my-buttonPrimaryBg); border:var(--my-buttonSecondaryBorder)" height="25" min-width="50">
      <p class="text-[var(--my-buttonPrimaryText)] text-[10px] font-bold">偷偷看</p>
      <div
        class="h-[20px] pos-absolute bottom-[-24px] flex flex-row bg-[rgba(0,0,0,0.4)] w-[80%] rounded items-center justify-center">
        <img src="../../assets/imgae/m_icon.png" class="w-[12px] h-[12px] " alt="" srcset="">
        <p class=" text-[var(--my-text)] mx-1 text-[10px]">{{ roomStore.look_card_amount }}</p>
      </div>
    </v-btn>

  </div>

</template>

<style lang="css" scoped>
:deep(.van-circle__text) {
  color: rgb(29, 214, 69) !important;
  font-size: 20px;
  font-weight: bolder;
}


.rotating-bg {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: rotate-bg 3.5s linear infinite;
}

@keyframes rotate-bg {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.avatar-shadow {
  box-shadow: 0 0 24px 6px #ffe066cc, 0 0 0 4px #fffbe6;
}
</style>
