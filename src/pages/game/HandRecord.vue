<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import MyHandRecord from '../me/MyHandRecord.vue'

defineProps({
  show: Boolean
})

const roomStore = useRoomStore()
const emit = defineEmits(['onClose']);
</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper pos-relative">
      <div
        class="pos-absolute bottom-0 text-[12px] p-2 px-4 h-[calc(100%-70px)] w-[80%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="h-full w-full flex flex-col justify-start items-center">
          <MyHandRecord />
        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style>
.wrapper {
  display: flex;
  align-items: start;
  justify-content: start;
  padding-top: 10px;
  padding-right: 10px;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}
</style>
