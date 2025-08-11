<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { IOptItem, type IOutHandCard } from '@/utils/interface';
import { onMounted, ref } from 'vue';
import Poker from '../game/Poker.vue';
onMounted(() => {
  get_hand_card_list()
})


const dataList = ref<IOutHandCard[]>([

])

const get_hand_card_list = async () => {
  dataList.value = []
  const { data } = await api.get_hand_card_list()
  dataList.value = data
}




const btns = [
  {
    type: 0,
    text: '上一局'
  },
  {
    type: 1,
    text: '第二局'
  },
  {
    type: 2,
    text: '第三局'
  },
  {
    type: 3,
    text: '第四局'
  },
  {
    type: 4,
    text: '第五局'
  },
]
const selectType = ref(0)



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

const cardType = [
  ' 高牌',
  ' 一对',
  ' 两对',
  ' 三条',
  ' 顺子',
  ' 同花',
  ' 葫芦',
  ' 四条',
  ' 同花顺',
  ' 皇家同花顺',
]

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
</script>

<template>
  <div class="flex flex-row justify-between items-center px-2">
    <v-btn v-for="item in btns" :key="item.type" @click="selectType = item.type"
      :style="selectType == item.type ? 'background:var(--my-buttonPrimaryBg) ' : 'background:var(--my-buttonSecondaryBg);border:var(--my-buttonSecondaryBorder)'"
      class="my-2 mx-1 w-[50px]" height="25" min-width="20">
      <p :class="selectType == item.type ? 'text-[var(--my-buttonPrimaryText)]' : 'text-[var(--my-buttonSecondaryText)]'"
        class="text-[12px] font-bold ">{{ item.text }}</p>
    </v-btn>
  </div>
  <div class="h-[calc(100svh-70px)]  w-full">
    <div
      class=" items-center text-[10px] flex flex-row justify-between w-full  text-white bg-[#151f23]  border-solid border-b-0 border-1 border-[rgba(255,255,255,0.1)]">
      <p class="w-[10%] text-center  ">玩家</p>
       <div class="w-[20%]">
        <p class=" text-center text-nowrap">手牌</p>
        <p class=" text-center text-nowrap">牌型</p>
      </div>
       <div class="w-[10%]">
        <p class=" text-center text-nowrap">操作</p>
        <p class=" text-center text-nowrap">金额</p>
      </div>
      <p class="w-[35%] text-center">公共牌</p>
      <div class="w-[15%]">
        <p class=" text-center">输赢</p>
        <p class=" text-center">总下注</p>
      </div>
    </div>
    <v-virtual-scroll class="h-full w-full" :items="dataList[selectType]">
      <template v-slot:default="{ item }">
        <v-card class="my-1 py-2 " style="background: var(--my-cardBg);">
          <div class=" flex flex-row justify-between w-full items-center text-[var(--my-text)] text-[10px] font-bold">

            <div class="w-[10%] flex flex-col justify-center items-center pos-relative">
              <p class="  text-[8px]">{{ seatType[item.seat_type] }}</p>
              <van-image round width="1.5rem" height="1.5rem" :src="item.head_url" />
              <p class="   ">{{ item.username }}</p>
            </div>
            <div class="w-[20%] flex flex-col justify-center items-center">
              <div class="flex items-center justify-evenly  text-center">
                <Poker v-for="p in item.cards" :point="p" class="w-[20px]! " />
              </div>
              <p>{{ cardType[item.card_type] }}</p>
            </div>
            <div class="w-[10%] flex flex-col justify-center items-center">
              <p class=" text-center  ">{{ getActionText(item.opt_item) }}</p>
              <p class="   ">{{ item.bet_amount }}</p>
            </div>
            <div class="flex items-center justify-evenly w-[35%] text-center">
              <Poker v-for="p in item.public_card" :point="p" class="w-[25px]! " />
            </div>


            <div class="w-[15%] flex flex-col justify-center items-center">
              <p class=" text-center  ">{{ item.win_amount }}</p>
              <p class=" text-center text-nowrap" v-if="item.bet_all_amount">总:{{ item.bet_all_amount }}</p>
            </div>



          </div>

        </v-card>
      </template>
    </v-virtual-scroll>
  </div>
</template>
