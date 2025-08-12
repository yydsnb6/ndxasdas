<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { IOptItem, type IOutHandCard } from '@/utils/interface';
import { onMounted, ref } from 'vue';
import Poker from '../game/Poker.vue';
import { useRecordStore } from '@/stores/record';
onMounted(() => {
  recordStore.get_hand_card_list()
})



const recordStore = useRecordStore()



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
const selectType = ref(1)



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

const left = () => {
  selectType.value--
}

const right = () => {
  selectType.value++
}
</script>

<template>
  <!-- <div class="flex flex-row justify-between items-center px-2">
    <v-btn v-for="item in btns" :key="item.type" @click="selectType = item.type"
      :style="selectType == item.type ? 'background:var(--my-buttonPrimaryBg) ' : 'background:var(--my-buttonSecondaryBg);border:var(--my-buttonSecondaryBorder)'"
      class="my-2 mx-1 w-[50px]" height="25" min-width="20">
      <p :class="selectType == item.type ? 'text-[var(--my-buttonPrimaryText)]' : 'text-[var(--my-buttonSecondaryText)]'"
        class="text-[12px] font-bold ">{{ item.text }}</p>
    </v-btn>
  </div> -->
  <div class="h-[calc(100svh-50px)]  w-full">
    <v-virtual-scroll class="h-[calc(100%-50px)] w-full" :items="selectType - 1 < recordStore.handList.length  ? recordStore.handList[selectType - 1] : []">
      <template v-slot:default="{ item }">
        <v-card class="mt-2 p-2 px-2 " style="background: var(--my-cardBg);">
          <div class=" flex flex-col justify-between w-full items-center text-[var(--my-text)] text-[12px] font-bold">

            <div class="flex flex-row justify-between w-full items-center">
              <div class="flex flex-row justify-between items-center">
                <p class="  text-[8px] border border-solid text-center p-[2px] rounded bg-[rgba(255,255,255,0.5)] mr-1">{{ seatType[item.seat_type] }}</p>
                <p>{{ item.first_name}}</p>
                <p class=" text-center ml-1" :class="Number(item.win_amount) >=0 ?'text-[green]':'text-[red]'">{{ Number(item.win_amount).toFixed(2) }}</p>
              </div>
              <p class=" text-center  ">{{ getActionText(item.action) }}</p>
            </div>
            <div class="flex flex-row justify-between w-full mt-1">
              <div class="flex items-center justify-evenly  text-center">
                <Poker v-for="p in item.hand_card" :point="p" class="w-[25px]! mx-1" />
              </div>
              <div class="flex items-center justify-evenly  text-center">
                <Poker v-for="p in item.public_cards" :point="p" class="w-[25px]! mx-1" />
              </div>

            </div>

            <!-- <div class="w-[10%] flex flex-col justify-center items-center pos-relative">
              <van-image round width="1.5rem" height="1.5rem" :src="item.head_url" />
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
            </div> -->
          </div>
        </v-card>
      </template>
    </v-virtual-scroll>
    <div class="flex flex-row justify-center items-center  ">
      <van-button v-if="selectType > 1" @click="left" icon="arrow-double-left"
        style="background: var(--my-buttonPrimaryBg);"
        class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]! text-[20px]! " />
      <div v-else class=" w-[30px]!  h-[30px]!">

      </div>
      <p class="text-[var(--my-text)] mx-2 w-[30px] text-center text-[18px] font-bold">{{ selectType }}/{{ recordStore.handList.length }}</p>
      <van-button v-if="selectType < recordStore.handList.length" @click="right" icon="arrow-double-right"
        style="background: var(--my-buttonPrimaryBg);"
        class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]!  text-[20px]!" />
      <div v-else class=" w-[30px]!  h-[30px]!">

      </div>
    </div>

  </div>
</template>
