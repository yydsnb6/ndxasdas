<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import { ref } from 'vue';
const props = defineProps({
  show: Boolean
})

const roomStore = useRoomStore()
const selectIndex = ref(0)
const emit = defineEmits(['onClose']);

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper-poker pos-relative">
      <div
        class="pos-absolute bottom-0 left-[7.5%] items-center text-[12px] mb-[5px] h-[60%]  p-2 px-4 w-[85%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div
          class="mt-2 bg-[#15181c] text-[14px] font-bold text-[#6f757a] flex flex-row justify-center rounded-full w-[80%] h-[30px] ">
          <div @click="selectIndex = 0" :class="`${selectIndex == 0 ? 'my-active' : ''}`"
            class="rounded-full h-[30px] flex flex-1 justify-center items-center">
            规则
          </div>
          <div @click="selectIndex = 1" :class="`${selectIndex == 1 ? 'my-active' : ''}`"
            class=" rounded-full h-[30px] flex flex-1 justify-center items-center">
            赔付
          </div>
        </div>


        <div v-if="selectIndex == 0" v-html="roomStore.configBaoXianDes?.tutorial"
          class="mt-2 overflow-y-scroll text-white w-full">
        </div>
        <div v-if="selectIndex == 1" class="flex flex-col w-[80%]  bg-op-10 mt-2">
          <div class="flex flex-row justify-between w-full text-[14px] text-white bg-[#151f23]">
            <p class="w-1/2 text-center">Outs</p>
            <p class="w-1/2 text-center">赔付</p>
          </div>
          <div class="h-[320px]  overflow-y-scroll text-white w-full  border border-solid  border-1 border-[rgba(255,255,255,0.1)]">
            <div :key="item.outs" v-for="item in roomStore.configBaoXianBet?.insurance_odds" class="

            border border-solid border-t-0 border-1 border-[rgba(255,255,255,0.1)]
            h-[28px]! flex flex-row justify-between w-full">
              <p class="flex items-center justify-center w-1/2 text-center">{{ item.outs }}</p>
              <p class="flex items-center justify-center w-1/2 text-center text-amber">{{ item.odds }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style scoped>
.wrapper-poker {
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}

.van-floating-panel__header {
  background: rgba(0, 0, 0, 0) !important;
}

.my-active {
  background-color: #27353e;
  color: white;
}
</style>
