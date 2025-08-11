<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import { useUserStore } from '@/stores/user';
import Poker from './Poker.vue';
import { IOptItem } from '@/utils/interface';



const onClickLeft = () => history.back();
defineProps({
  show: Boolean
})

const roomStore = useRoomStore()

const emit = defineEmits(['onClose']);
const userStore = useUserStore()

const getActionText = (action: IOptItem) => {
  let str = ''
  switch (action) {
    case IOptItem.OptItemAllIn:
      str = 'ALL-IN'
      break;
    case IOptItem.OptItemBet:
      str = '跟注'
      break;
    case IOptItem.OptItemFold:
      str = '弃牌'
      break;
    case IOptItem.OptItemPass:
      str = '过牌'
      break;

    case IOptItem.OptItemRaise:
      str = '加注'
      break;
    case IOptItem.OptItemFirstBet:
      str = '下注'
      break;

    default:
      break;
  }

  return str
}


const seatType = [
  'BTN',
  'BTN',
  'SB',
  'BB',
  'SBB',
  'UTG',
  'UTG_1',
  'UTG_2',
  'LJ',
  'HJ',
  'CO',
]
</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper">
      <div
        class="text-[12px] p-2 px-4 h-[calc(100%-70px)] w-[260px] bg-[rgb(29,29,29,0.8)]   flex flex-col pos-relative  border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="h-full w-full flex flex-col justify-start items-center">
          <div class="  flex flex-col w-full   bg-op-10 mt-2 items-center" v-if="roomStore.handRecored.length > 0">
            <div
              class="h-[20px] w-[100%] flex flex-row justify-between w-full text-[12px] text-white bg-[#151f23] border border-solid border-b-0 border-1 border-[rgba(255,255,255,0.1)]">
              <p class="w-1/4 text-left  ">玩家</p>
              <p class="w-1/4 text-center  ">位置</p>
              <p class="w-1/4 text-center">手牌</p>
              <p class="w-1/4 text-right  ">操作</p>
            </div>


            <v-virtual-scroll class="h-[calc(100%-70px)] w-full " :items="roomStore.handRecored">
              <template v-slot:default="{ item }">
                <div class="w-[10%] items-center flex flex-col text-white w-full
            border border-solid border-t-0 border-1 border-[rgba(255,255,255,0.1)]
            h-[28px]! flex flex-row justify-between w-full my-[2px] items-center">

                  <p class="w-1/4 text-left  ">{{ item.name }}</p>
                  <p class="w-1/4 text-center  ">{{
                    seatType[item.seat_type] }}</p>
                  <div class="flex items-center justify-evenly w-1/4 text-center">
                    <Poker :point="0" class="h-[25px]!" />
                    <Poker :point="0" class="h-[25px]!" />
                  </div>
                  <p class="w-1/4 text-right  ">{{ getActionText(item.opt_item) }}</p>

                </div>
              </template>
            </v-virtual-scroll>

           
          </div>
          <NoRecord :size="60" v-else />
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
