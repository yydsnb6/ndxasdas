<script setup lang="ts">
import { ref } from 'vue';
import BuyPoint from './BuyPoint.vue';
import { useUserStore } from '@/stores/user';
import { showConfirmDialog } from 'vant';
import { useRoomStore } from '@/stores/room';
import { useRouter } from 'vue-router';
const props = defineProps({
  seat_id: Number
})

const userStore = useUserStore()
const roomStore = useRoomStore()
const router = useRouter()
const sitDown = () => {
  if (userStore.userInfo.balance < roomStore.sceneMsg.min_buy) {
    showConfirmDialog({
      width: '80%',
      title: '余额不足，请前往充值',
      confirmButtonText: '前往充值',
      cancelButtonText: '取消',
      message:
        '',
    })
      .then(() => {
        router.push('/wallet')
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  } else {
    showBuyPoint.value = !showBuyPoint.value
    if (showBuyPoint) {
      roomStore.showBtns = false
    } else {
      roomStore.showBtns = true
    }
  }

}
const showBuyPoint = ref(false)

</script>

<template>
  <!-- icon="plus" -->
  <div @click="sitDown" v-ripple="{ class: `text-info` }"
    class="border-0 border-solid rounded-full flex flex-col  text-[white] text-[12px] items-center mt-[2px]">
    <!-- <van-button round  type="primary"
    icon="plus"
      class="my-bg text-[16px]! !w-[3rem] !h-[3rem]  !bg-op-40 " /> -->
    <van-button round type="primary" class=" op-40 my-bg text-[18px]! !w-[3rem] !h-[3rem]  !bg-op-40"
      style="border-style: dashed !important;">
      <!-- <i class="fas fa-couch text-[24px] text-[var(--my-accent)] op-95"></i> -->
      <van-icon name="plus" size="16" />
    </van-button>
  </div>
  <BuyPoint :show="showBuyPoint" :seatid="props.seat_id" @on-close="showBuyPoint =!showBuyPoint" />

</template>

<style lang="css" scoped>
.my-bg {
  border-color: var(--my-accent) !important;
  background-color: rgb(30, 77, 63, 0.5);
  /* background-image: var(--my-primary);
   */


}
</style>
