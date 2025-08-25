<script setup lang="ts">
import { useSocketStore } from '@/stores/mysocket';
import { IOptItem } from '@/utils/interface';
import AddBet from './AddBet.vue';
import FirstBet from './FirstBet.vue';
import { ref } from 'vue';
import { useRoomStore } from '@/stores/room';

const socketStore = useSocketStore()
const showAddBet = ref(false)
const showFirstBet = ref(false)
const roomStore = useRoomStore()
</script>

<template>
	<div v-if="roomStore.action_seat_id == roomStore.sceneMsg.self_seat_id && roomStore.action_second > 0"
	    class="fixed bottom-[15px] w-full  flex flex-row justify-evenly   z-[1999]">
	    <button v-ripple="{ class: `text-info` }"  class="image-button" v-if="roomStore.opt_items.includes(2)">
	      <div @click="socketStore.doSomething(IOptItem.OptItemPass)"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_blue.png" />
	        <p class="z-10 text-white font-bold text-[15px]">过牌</p>
	      </div>
	    </button>
	    <button v-ripple="{ class: `text-info` }" class="image-button" v-if="roomStore.opt_items.includes(5)">
	      <div @click="socketStore.doSomething(IOptItem.OptItemFold)"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_green.png" />
	        <p class="z-10 text-white font-bold text-[15px]">弃牌</p>
	      </div>
	    </button>
	    <button v-ripple="{ class: `text-info` }" class="image-button" v-if="roomStore.opt_items.includes(3)">
	      <div @click="socketStore.doSomething(IOptItem.OptItemBet)"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
	        <p class="z-10 text-white font-bold text-[15px]">跟注</p>
	      </div>
	    </button>
	    <button v-ripple="{ class: `text-info` }" class="image-button" v-if="roomStore.opt_items.includes(4)">
	      <div @click="showAddBet =!showAddBet"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
	        <p class="z-10 text-white font-bold text-[15px]">加注</p>
	      </div>
	    </button>
	    <button v-ripple="{ class: `text-info` }" class="image-button" v-if="roomStore.opt_items.includes(6)">
	      <div @click="socketStore.doSomething(IOptItem.OptItemAllIn)"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
	        <p class="z-10 text-white font-bold text-[15px]">All-IN</p>
	      </div>
	    </button>

       <button v-ripple="{ class: `text-info` }" class="image-button" v-if="roomStore.opt_items.includes(7)">
	      <div @click="showFirstBet = !showFirstBet"
	        class=" pos-relative flex justify-center items-center w-[70px] aspect-ratio-[14/5]">
	        <img class="absolute top-0 left-0 w-full  " src="../../assets/imgae/gamebtn/btn_yellow.png" />
	        <p class="z-10 text-white font-bold text-[15px]">下注</p>
	      </div>
	    </button>


	  </div>

    <AddBet :show="showAddBet"  @on-close="showAddBet = !showAddBet"/>
    <FirstBet :show="showFirstBet"  @on-close="showFirstBet = !showFirstBet"/>

</template>

<style lang="css" scoped>


.image-button {
  border: none;
  /* 移除边框 */
  background: none;
  /* 移除背景色 */
  padding: 0;
  /* 移除内边距 */
  cursor: pointer;
  /* 鼠标悬停时显示指针 */
  outline: none;
  /* 移除点击时的轮廓 */
  transition: transform 0.3s;

}

.image-button:active {
  transform: scale(1.1);
}
</style>
