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




  if (Number(userStore.userInfo?.balance) < roomStore.sceneMsg.max_buy) {
    return Number(userStore.userInfo?.balance)
  } else {
    return roomStore.sceneMsg.max_buy
  }
})
const buyMoney = ref(10)
const router = useRouter()
const buyAndSitDown = () => {
  console.log('需要坐下的桌子id', props.seatid);


  socketStore.sitDown(props.seatid, buyMoney.value)

  emit('onClose')

}

</script>

<template>

  <van-overlay z-index="20000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%]  text-[12px] p-5 px-4 h-[60%] w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <van-slider bar-height="10px" class="w-[95%]! mr-[10px]" active-color="#e1bf65" v-model="buyMoney" :step="5"
          :min="roomStore.sceneMsg.min_buy" :max="max_buy">
          <template #button>
            <img class="w-[30px] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <!-- <div class="custom-button">{{ buyMoney }}</div> -->
          </template>
        </van-slider>
        <div class="flex flex-row justify-evenly items-center w-[95%] bg-white bg-op-10 px-[10px] py-[2px] rounded-md">
          <van-field v-model="buyMoney" type="digit"
            class="bg-red! text-amber! font-bold  text-center  text-[16px] w-[80px]! bg-op-0!" />
        </div>
        <van-button size="26" block @click="buyAndSitDown" color="linear-gradient(to right, #638ccb, #f2c14b)">
          确认买入${{ buyMoney }}并坐在座位 {{ props.seatid }} 上面
        </van-button>
      </div>
    </div>
  </van-overlay>
</template>


<style>
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

.van-field__control {
  font-size: 20px;
  color: #ebbb32 !important;
}
</style>
