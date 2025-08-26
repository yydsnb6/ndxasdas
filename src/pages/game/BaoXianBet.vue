<script setup lang="ts">
import { useSocketStore } from '@/stores/mysocket';
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import { IOptItem } from '@/utils/interface';
import { showConfirmDialog } from 'vant';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  show: Boolean,
})


const emit = defineEmits(['onClose']);
const roomStore = useRoomStore()
const socketStore = useSocketStore()

const buyMoney = ref(10)
const router = useRouter()
const addBet = () => {
  if (Number(roomStore.roomUserInfo.remain_balance) < roomStore.baoxianMinAmount) {
    showConfirmDialog({
      width: '80%',
      title: '余额不足，是否前往请充值',
      confirmButtonText: '前往充值',
      cancelButtonText: '取消购买保险',
      message:
        '',
    })
      .then(() => {
        // on confirm
        router.replace('/home')
      })
      .catch(() => {
        emit('onClose')
        // on cancel
      });
  } else {
    socketStore.buyBaoXian((buyMoney.value).toString())
    emit('onClose')
    buyMoney.value = Number(roomStore.baoxianMinAmount)

  }

}

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute bottom-0 left-[5%] text-[12px] p-5 px-4 h-[60%] w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <van-slider bar-height="10px" class="w-[95%]! mr-[10px]" active-color="#e1bf65" v-model="buyMoney" :step="1"
          :min="Number(roomStore.baoxianMinAmount)" :max="Number(roomStore.baoxianMaxAmount)">
          <template #button>
            <img class="w-[30px] aspect-ratio-[266/201]" src="../../assets/imgae/chip_icon.png" alt="" srcset="">
            <!-- <div class="custom-button">{{ buyMoney }}</div> -->
          </template>
        </van-slider>
        <div
          class="flex flex-row justify-evenly items-center w-[95%] bg-[rgba(255,255,255,0.1)]  px-[10px] py-[2px] rounded-md">
          <van-field v-model="buyMoney" type="number" :min="Number(roomStore.baoxianMinAmount)" :max="Number(roomStore.baoxianMaxAmount)"
           input-align="center"  class="bg-red! text-amber! font-bold  text-center  text-[16px] w-4/5! bg-op-0!" />
        </div>
        <van-button v-ripple="{ class: `text-info` }" block @click="addBet" color="linear-gradient(to right, #638ccb, #f2c14b)">
          确认买入保险${{ buyMoney }}
        </van-button>
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
:deep(.van-field__control){
  color: var(--my-text) !important;
  font-size: 20px !important;
}

</style>
