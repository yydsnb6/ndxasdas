<script setup lang="ts">
import { useRoomStore } from '@/stores/room';

const roomStore = useRoomStore()
</script>

<template>
	<div
	 class="text-[12px]   w-[100%] h-[60px] items-center  flex flex-col pos-fixed top-[15%] border-rd-[15px]! z-999"
	    @click.stop>
	    <div class="text-[12px]   w-[50%] h-full  ml-2  flex flex-col relative border-rd-[15px]! z-999" @click.stop>
	      <div
	        class="bg-[rgb(29,29,29,0.3)] w-[97.8%] h-full rounded flex items-center justify-center text-[18px] font-bold text-white">
	        <p>玩家 <span class="text-[var(--my-accent)]!">{{ roomStore.win_seat_id }}</span> 胜利,盈利:<span class="text-[var(--my-accent)]!">{{
	          roomStore.win_amount }}11</span></p>
	      </div>
	      <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[100%]! left-2!"
	        :border-radius="10" />
	    </div>
	  </div>
</template>
