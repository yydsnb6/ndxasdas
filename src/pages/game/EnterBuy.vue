<script setup lang="ts">
import api from '@/api/api';
import { useSocketStore } from '@/stores/mysocket';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { showNotify, showToast } from 'vant';
import { onMounted, ref } from 'vue';

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['onClose']);
const socketStore = useSocketStore()
const userStore = useUserStore()
const buyMoney = ref(10)


const buyAndSitDown = async () => {
  emit('onClose')
  socketStore.sendBuMa(buyMoney.value)
}

</script>

<template>

  <van-overlay z-index="20000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%]  text-[12px] p-5 px-4 h-[40%] w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="flex flex-row justify-between w-full items-center px-5">
          <p class="text-[16px] text-[var(--my-text)]">补码金额</p>
          <div
            class="flex flex-row justify-evenly items-center w-[100px]  bg-[rgba(255,255,255,0.5)] bg-op-10 rounded-md ml-2">
            <van-field v-model="buyMoney" type="number" :min="0" input-align="center"
              class="bg-[rgba(0,0,0,0)]! text-amber! font-bold  text-center h-[40px]  text-[20px]! w-4/5! bg-op-0!" />
          </div>
          <!-- <p class="text-[16px] text-[var(--my-text)]">补码</p> -->
          <p class="text-[16px] text-[var(--my-text)]">余额:{{ userStore.userInfo.balance }}</p>
        </div>

        <div class="flex flex-row justify-between w-full">
          <van-button v-ripple="{ class: `text-info` }" block @click="buyAndSitDown" class="mx-5" color="linear-gradient(to right, #638ccb, #f2c14b)">
            设置
          </van-button>
          <van-button v-ripple="{ class: `text-info` }" block @click="emit('onClose')" class="mx-5" color="#303030">
            取消
          </van-button>
        </div>
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

:deep(.van-switch--on) {
  background: var(--my-accent);
}

:deep(.van-checkbox__icon--checked .van-icon) {
  background: var(--my-primary) !important;
  border-color: var(--my-accent);
}

:deep(.van-checkbox__label) {
  color: var(--my-text)
}

:deep(.van-field__control) {
  color: var(--my-text) !important;
  font-size: 20px !important;
}
</style>
