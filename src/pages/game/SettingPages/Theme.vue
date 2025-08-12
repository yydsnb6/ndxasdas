<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import bus from '@/utils/bus';
import LocalUtil from '@/utils/LocalUtil';
import { computed, ref } from 'vue';
defineProps({
  show: Boolean
})

const selectIndex = ref(0)
const tableIndex = ref(LocalUtil.floatForKey('tableIndex', 0))
const bgIndex = ref(LocalUtil.floatForKey('bgIndex', 0))
const pokerIndex = ref(LocalUtil.floatForKey('pokerIndex', 0))

const tableBg = [
  new URL('../../../assets/imgae/table/table0_bg.png', import.meta.url).href,
  new URL('../../../assets/imgae/table/table1_bg.png', import.meta.url).href,
  new URL('../../../assets/imgae/table/table2_bg.png', import.meta.url).href,
]

const table = [
  new URL('../../../assets/imgae/table/table0.png', import.meta.url).href,
  new URL('../../../assets/imgae/table/table1.png', import.meta.url).href,
  new URL('../../../assets/imgae/table/table2.png', import.meta.url).href,
]
const poker = [

  new URL('../../../assets/imgae/poker/poker_back.png', import.meta.url).href,
  new URL('../../../assets/imgae/poker/poker_back.png', import.meta.url).href,
]


const clickTable = (index: number) => {
  tableIndex.value = index
}

const clickBg = (index: number) => {
  bgIndex.value = index

}
const clickPoker = (index: number) => {
  pokerIndex.value = index

}


const saveTheme = () => {
  LocalUtil.setFloat(tableIndex.value, 'tableIndex')
  LocalUtil.setFloat(bgIndex.value, 'bgIndex')
  LocalUtil.setFloat(pokerIndex.value, 'pokerIndex')
  bus.emit('changeTheme')
  emit('onClose')
}


const emit = defineEmits(['onClose']);

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper-theme pos-relative ">
      <div
        class="pos-absolute bottom-0 left-[2.5%]  items-center text-[12px] mb-[5px] h-[85%]   w-[95%] bg-[rgb(29,29,29,0.8)]   flex flex-col  border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div
          class="mt-2  bg-[rgba(191,189,189,0.1)] text-[12px] font-bold text-[rgb(254,255,255)] flex flex-row items-center justify-center rounded-full w-[25%] h-[25px]! ">
          主题设置
        </div>
        <div class=" pos-relative h-[30%] w-full flex justify-center items-center my-5">
          <div class=" pos-absolute w-full h-full flex justify-center items-center">
            <img class="   h-full aspect-ratio-[0.618/1]" :src="tableBg[bgIndex]" alt="" srcset="">
          </div>
          <div class=" pos-absolute w-full h-full flex justify-center items-center">
            <img class="  h-full aspect-ratio-[1/2]" :src="table[tableIndex]" alt="" srcset="">
          </div>
          <!-- <img class=" pos-absolute w-full h-full aspect-ratio-[1/2]" :src="nowTableConfig.poker" alt="" srcset=""> -->
        </div>
        <div
          class=" font-500 flex flex-row justify-evenly bg-[rgba(60,59,59,0.5)] h-[40px] w-[98%] text-white items-center text-[14px]">
          <p @click="selectIndex = 0"
            :class="selectIndex == 0 ? 'font-bold   text-[#667cdf] border-[#667cdf]' : 'border-[rgb(102,124,223,0)]'"
            class="box-content  border-0 border-solid border-b-2 w-[30%] h-full flex  items-center justify-center">牌桌
          </p>
          <p @click="selectIndex = 1"
            :class="selectIndex == 1 ? 'font-bold   text-[#667cdf] border-[#667cdf]' : 'border-[rgb(102,124,223,0)]'"
            class="box-content  border-0 border-solid border-b-2 w-[30%] h-full flex  items-center justify-center">背景
          </p>
          <!-- <p @click="selectIndex = 2"
            :class="selectIndex == 2 ? 'font-bold   text-[#667cdf] border-[#667cdf]' : 'border-[rgb(102,124,223,0)]'"
            class="box-content  border-0 border-solid border-b-2 w-[30%] h-full flex  items-center justify-center">扑克
          </p> -->
        </div>


        <div v-if="selectIndex == 0" class="flex flex-row flex-1  w-[96%] my-[10px] justify-evenly items-center">
          <div v-for="(t, index) in table" :key="t" @click="clickTable(index)"
            :class="`${tableIndex == index ? ' border-[#667cdf]' : 'border-[rgba(0,0,0,0)]'}`"
            class="border-solid  border-2 rounded-md w-[100px] flex justify-center items-center pos-relative h-[80%]">
            <img class="w-[70%]  aspect-ratio-[1/2]" :src="t" alt="">
          </div>
        </div>


        <div v-if="selectIndex == 1" class="flex flex-row flex-1  w-[96%] my-[10px] justify-evenly  items-center">
          <div v-for="(b, index) in tableBg" :key="b" @click="clickBg(index)"
            :class="`${bgIndex == index ? ' border-[#667cdf]' : 'border-[rgba(0,0,0,0)]'}`"
            class="border-solid py-[5px] border-2 rounded-md w-[100px] flex justify-center items-center pos-relative  h-[80%]">
            <img class="w-[90%]  aspect-ratio-[2/3]" :src="b">
          </div>

        </div>

        <div v-if="selectIndex == 2" class="flex flex-row flex-1  w-[96%] my-[10px] justify-evenly  items-center">
          <div v-for="(p, index) in poker" :key="p" @click="clickPoker(index)"
            :class="`${pokerIndex == index ? ' border-[#667cdf]' : 'border-[rgba(0,0,0,0)]'}`"
            class="border-solid  border-2 rounded-md w-[100px] flex justify-center items-center pos-relative  h-[80%]">
            <img class="w-[70%]  aspect-ratio-[134/185]" :src="p">
          </div>

        </div>

        <van-button @click="saveTheme" class="w-[90%]! mb-[15px]! "  block
          color="linear-gradient(to right, #638ccb, #5dfc8f)">
          保存主题
        </van-button>
      </div>
    </div>
  </van-overlay>
</template>


<style scoped>
.wrapper-theme {
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
