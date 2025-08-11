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

  }

}
const showBuyPoint = ref(false)

</script>

<template>
  <!-- icon="plus" -->
  <div @click="sitDown"
    class="border-0 border-solid rounded-full flex flex-col  text-[white] text-[12px] items-center mt-[2px]">
    <!-- <van-button round  type="primary"
    icon="plus"
      class="my-bg text-[16px]! !w-[3rem] !h-[3rem]  !bg-op-40 " /> -->


       <van-button round  type="primary"
      class="my-bg text-[16px]! !w-[3rem] !h-[3rem]  !bg-op-40 ">
      <i class="fas fa-couch text-[24px] text-[var(--my-accent)] op-95"></i>
              </van-button>

  </div>
  <BuyPoint :show="showBuyPoint" :seatid="props.seat_id" @on-close="sitDown" />

</template>

<style>
.my-bg {
  border-color: var(--my-accent) !important;
  background-color: rgb(228, 228, 226, 0.3);
  background-image: var(--my-primary);
}
</style>
