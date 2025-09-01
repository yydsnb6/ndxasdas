<script setup lang="ts">
import { useSocketStore } from '@/stores/mysocket';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { showConfirmDialog, showNotify } from 'vant';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const onClickLeft = () => history.back();
const props = defineProps({
  show: Boolean,
  seatid: Number
})


const emit = defineEmits(['onClose']);
const roomStore = useRoomStore()
const socketStore = useSocketStore()
const userStore = useUserStore()
const max_buy = computed(() => {




  if (Number(userStore.userInfo.balance) < roomStore.sceneMsg.max_buy) {
    return Number(userStore.userInfo.balance)
  } else {
    return roomStore.sceneMsg.max_buy
  }
})
const buyMoney = ref(10)
const buyAndSitDown = () => {
  console.log('需要坐下的桌子id', props.seatid);
  socketStore.sitDown(props.seatid!, buyMoney.value)
  emit('onClose')
}

</script>

<template>

  <van-overlay z-index="20000" :show="show" @click="emit('onClose')" class="bg-op-20! ">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%]  text-[12px] p-5 px-4 h-[40%] w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <van-slider bar-height="10px" class="w-[95%]! mr-[10px]" active-color="#e1bf65" v-model="buyMoney" :step="5"
          :min="roomStore.sceneMsg.min_buy" :max="max_buy">
          <template #button>
            <img class="w-[30px] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
          </template>
        </van-slider>
        <div
          class="flex flex-row justify-evenly items-center w-[95%] bg-[rgba(255,255,255,0.1)] px-[10px] py-[2px] rounded-md">
          <van-field v-model="buyMoney" type="number" :min="0" input-align="center"
            class="bg-[rgba(0,0,0,0)]! text-amber! font-bold  text-center  text-[16px] w-4/5! " />
        </div>
        <van-button class="w-[95%]" @click="buyAndSitDown" color="linear-gradient(to right, #638ccb, #f2c14b)">
          确认买入${{ buyMoney }}并坐下
        </van-button>
        <div
          class=" w-[95%] flex flex-row items-center border-2 border-solid rounded px-2 py-2 justify-between border-[var(--my-text)]">
          <svg  t="1756224806632" class="icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="5721" width="20" height="20">
            <path
              d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737"
              fill="#1BA27A" p-id="5722"></path>
            <path
              d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z"
              fill="#FFFFFF" p-id="5723"></path>
            <path
              d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159"
              fill="#FFFFFF" p-id="5724"></path>
          </svg>
          <p  class=" text-[var(--my-text)] mx-1">{{ userStore.userInfo?.balance }}</p>
          <van-loading v-if="userStore.balanceLoading" color="#fff" size="20" />
          <van-icon class=" rotate-[18deg]!" v-else name="replay" size="20" color="#fff"
            @click="userStore.update_balance" />
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

:deep(.van-field__control) {
  color: var(--my-text) !important;
  font-size: 20px !important;
}
</style>
