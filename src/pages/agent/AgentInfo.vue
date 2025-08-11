<script setup lang="ts">
import type { Reward } from '@/utils/interface';


defineProps<{
  data?: Reward
  show: boolean,
  seIndex:number
}>()

const emit = defineEmits(['onClose']);


</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper-poker">
      <div
        class=" items-center text-[12px] mb-[-5px] h-[50%]   w-[100%]   bg-[var(--my-cardBg)]   flex flex-col pos-relative  border-rd-t-[15px]!"
        @click.stop>

        <h2 class=" text-[var(--my-text)] bg-[var(--my-cardBg)] w-full text-center py-2 border-rd-t-[15px] font-500">{{ seIndex ==0?'直属返佣':'二级返佣' }}</h2>
        <div class="flex flex-col w-full px-5 items-center mb-6 ">
          <div class="w-full  bg-[var(--my-cardBg)] h-[60px] flex flex-row items-center justify-evenly rounded-md">
            <div class="flex flex-col items-center">
              <div class="flex flex-row items-center">
                <img src="../../assets/imgae/usdt.png" class="w-[20px] h-[20px] mr-1" alt="" srcset="">
                <h1 class="text-[var(--my-cardSubText)]">0</h1>
              </div>
              <p class=" text-[var(--my-cardText)] font-500">直接邀请</p>
            </div>
            <div class="w-[1px] h-[50%] bg-[var(--my-text)]">

            </div>
            <div class="flex flex-col items-center">
              <div class="flex flex-row items-center">
                <img src="../../assets/imgae/usdt.png" class="w-[20px] h-[20px] mr-1" alt="" srcset="">
                <h1 class="text-[var(--my-cardSubText)]">0</h1>
              </div>
              <p class=" text-[var(--my-cardText)] font-500">直接奖励</p>
            </div>
          </div>
          <div class="w-full text-[var(--my-cardText)] font-550 my-4 ml-2">
            <p>1.在邀請系統中，用戶可獲得其直接邀請玩家產生的抽水分成比例。</p>
            <p class="mt-2">2.抽水比例取決於直接邀請的用戶數量。</p>
          </div>
          <div class="w-full ">
            <div style="background: var(--my-primary);"
              class=" border-[var(--my-accent)] border-solid border-1 flex flex-row justify-between px-4   py-1 text-[12px] text-[var(--my-cardText)]">
              <p class="flex flex-1 justify-center text-center">级别</p>
              <p class="flex flex-1 justify-center text-center">直接邀请</p>
              <p class="flex flex-1 justify-center text-center">直接奖励</p>
            </div>
            <div v-for="item in 3"
            style="background: var(--my-primary);"
              class=" border-[var(--my-accent)] border-solid border-1 border-t-0 flex flex-row justify-between px-4   py-1 font-500 text-[14px] text-[#000]">
              <p class="flex items-end justify-center text-[var(--my-text)] text-center flex-1 text-[12px]">Lv<span class="text-[16px]">{{ item }}</span></p>
              <p class="flex items-end justify-center text-[var(--my-text)] text-center flex-1" >{{ item }}</p>
              <p class="flex items-end justify-center text-[var(--my-text)] text-center flex-1 "  >{{ item }}</p>
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
