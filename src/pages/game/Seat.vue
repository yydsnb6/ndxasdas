<script setup lang="ts">
import type { ISeatInfo, ESeatPos } from '@/utils/interface'
import User from './User.vue';
import Chair from './Chair.vue';
import { useRoomStore } from '@/stores/room';
import bus from '@/utils/bus';
import { onMounted, onUnmounted, watch } from 'vue';
import Poker from './Poker.vue';

import { animate, utils } from 'animejs';
const roomStore = useRoomStore()
const props = defineProps<{
  seatPos: ESeatPos
  seatInfo?: ISeatInfo,
}>()

const posArr = [
  [-15, 40],
  [55, 5],
  [40, -10],
  [-15, -10]
]
let currentSeatId: string | number | null | undefined = null;


const cookFlyData = (data: any) => {
  if (props.seatInfo?.seat_id != roomStore.sceneMsg.self_seat_id) {
    console.log("这个座位" + props.seatInfo?.seat_id + "收到消息：", data);
    flyMyPoker()
  }
}




const flyMyPoker = () => {
  // const vector2D = { x: 360, y: 0 };
  // animate(vector2D, {
  //   x: (document.getElementById(`poker_pos${props.seatInfo?.seat_id}`)?.getBoundingClientRect().x || 0) + (props.pos == ESeatPos.Left ? 35 : 5),
  //   y: (document.getElementById(`poker_pos${props.seatInfo?.seat_id}`)?.getBoundingClientRect().y || 0) + 15,
  //   modifier: utils.round(0),
  //   onUpdate: () => {
  //     const dom = document.getElementById(`poker${props.seatInfo?.seat_id}`)
  //     if (dom) {
  //       dom.style.left = `${vector2D.x}px`
  //       dom.style.top = `${vector2D.y}px`
  //     }
  //   }
  // });
}

onMounted(() => {
  if (props.seatInfo) {
    bus.on('Event1006' + props.seatInfo?.seat_id, cookFlyData);
    currentSeatId = props.seatInfo?.seat_id; // 更新当前存储的 seat_id
  }
})


watch(
  () => props.seatInfo?.seat_id, // 监听 seat_id 变化
  (newSeatId) => {
    // 清理之前的事件监听
    if (currentSeatId !== null) {
      bus.off('Event1006' + currentSeatId, cookFlyData);
    }

    // 设置新的监听
    if (newSeatId !== null) {
      bus.on('Event1006' + newSeatId, cookFlyData);
      currentSeatId = newSeatId; // 更新当前存储的 seat_id
    }
  },
  { immediate: true } // 初始挂载时立即执行
);

onUnmounted(() => {
  // 清理最后一次注册的监听
  if (currentSeatId !== null) {
    bus.off('Event1006' + currentSeatId, cookFlyData);
  }
});



</script>

<template>


  <div class="pos-relative h-[90px]"  :id="`poker_pos${props.seatInfo?.seat_id}`">
    <img v-if="roomStore.win_seat_id == props.seatInfo?.seat_id" src="../../assets/imgae/winbg.png"
      class="w-[8rem] h-[8rem]  rotating-bg" alt="" srcset="">
    <User :seat-info="props.seatInfo" v-if="props.seatInfo?.user" :pos="props.seatPos" :user="props.seatInfo.user" />
    <Chair :seat_id="props.seatInfo?.seat_id" v-else />
    <!--  -->
    <div  v-if="roomStore.sceneMsg.button == props.seatInfo?.seat_id"
      :style="`right:${posArr[props.seatPos][0]}px; top:${posArr[props.seatPos][1]}px`"
      class="pos-absolute   bg-[var(--my-accent)] bg-op-80 rounded-full flex justify-center items-center w-[20px] h-[20px]">
      <p class="text-[12px] font-black text-[var(--my-text)]">D</p>
    </div>
    <!--  -->
    <div :id="`poker${props.seatInfo?.seat_id}`"
      v-if="props.seatInfo?.user && props.seatInfo.seat_id != roomStore.sceneMsg.self_seat_id && props.seatInfo?.user.hand_cards.length > 1"
      class="z-9999 w-[40px] flex flex-row items-start justify-start absolute top-0 right-5 ">
      <Poker class="w-[20px] z-1 mr-[-10px] rotate-[-10deg]  aspect-ratio-[134/185]"
        :id="`poker${props.seatInfo?.seat_id}_1`" :point="props.seatInfo.user.hand_cards[0]" />
      <Poker class="w-[20px] z-2 rotate-[5deg]   aspect-ratio-[134/185] ml-[2px]"
        :id="`poker${props.seatInfo?.seat_id}_2`" :point="props.seatInfo.user.hand_cards[1]" />
    </div>
  </div>
</template>
