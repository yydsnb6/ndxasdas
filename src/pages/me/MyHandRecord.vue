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
    text: '账单'
  },
  {
    type: 1,
    text: '保险'
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

        case IOptItem.Mang:
      str = '盲注'
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

const titleType = ref(0)
const clickBtn = (type) => {
  titleType.value = type
}


</script>

<template>
  <div class="flex flex-row justify-start items-center px-2">

    <v-btn v-for="item in btns" :key="item.type" @click="clickBtn(item.type)"
      :style="titleType == item.type ? 'background:var(--my-buttonPrimaryBg); border:var(--my-buttonSecondaryBorder)' : 'background:var(--my-buttonSecondaryBg);border:var(--my-buttonSecondaryBorder)'"
      class="m-2" height="25" min-width="50">
      <p :class="titleType == item.type ? 'text-[var(--my-buttonPrimaryText)]' : 'text-[var(--my-buttonSecondaryText)]'"
        class="text-[12px] font-bold ">{{ item.text }}</p>
    </v-btn>
  </div>

  <div class="h-[calc(100vh-100px)]  w-full pos-relative">
    <div v-if="titleType == 1"
      class=" bg-[#374047]  py-2 px-2 mx-2 mr-2 text-coolgray flex flex-row justify-between items-center text-[var(--my-text)] text-[10px] font-bold">
      <p class="w-[20%] text-center">昵称</p>
      <p class="w-[40%] text-center">行动</p>
      <p class="w-[20%] text-center">投保</p>
      <p class="w-[20%] text-center">赔付</p>
    </div>
    <v-virtual-scroll v-if="recordStore.handList.length > 0" class="h-[calc(100%-50px)] w-full"
      :items="(selectType - 1 < recordStore.handList.length) ? recordStore.handList[selectType - 1] : []">
      <template v-slot:default="{ item }">
        <v-card v-if="titleType == 0" class="mt-2 p-2 px-2 " style="background: var(--my-cardBg);">
          <div class=" flex flex-col justify-between w-full items-center text-[var(--my-text)] text-[10px] font-bold">
            <div class="flex flex-row justify-between w-full items-center">
              <div class="flex flex-row justify-between items-center">
                <p class="  text-[8px] border border-solid text-center p-[2px] rounded bg-[rgba(255,255,255,0.5)] mr-1">
                  {{ seatType[item.seat_type] }}</p>
                <p>{{ item.first_name }}</p>
                <p class=" text-center ml-1" :class="Number(item.win_amount) >= 0 ? 'text-[green]' : 'text-[red]'">{{
                  Number(item.win_amount) > 0 ? '+' + Number(item.win_amount).toFixed(2) :
                    Number(item.win_amount).toFixed(2)
                }}</p>

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
          </div>
        </v-card>
        <v-card v-else class=" p-2 px-2  " style="background: var(--my-cardBg);">
          <div class="bg-[#26292b] py-2 px-2 flex flex-row justify-between w-full items-center text-[var(--my-text)] text-[12px] font-bold">
            <p class="w-[20%] text-center ">{{ item.first_name }}</p>
            <p class="w-[40%] text-center ">{{ getActionText(item.action) }}</p>
            <p class="w-[20%] text-center ">{{
                      Number(item.buy_insurance_amount).toFixed(2) }}</p>
            <p class="w-[20%] text-center text-[green]">{{
                      Number(item.insurance_compensation_amount).toFixed(2) }}</p>

          </div>
        </v-card>
      </template>
    </v-virtual-scroll>



    <div class="flex flex-row justify-between items-center  w-full pos-absolute bottom-[5px]">
      <div class="flex flex-row flex-1">
        <van-button :disabled="selectType <= 1" @click="selectType = 1" icon="arrow-double-left"
          style="background: var(--my-buttonPrimaryBg);"
          class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]! text-[12px]! mx-1" />
        <van-button :disabled="selectType <= 1" @click="left" icon="arrow-left"
          style="background: var(--my-buttonPrimaryBg);"
          class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]! text-[12px]! mx-1" />
      </div>
      <p class="text-[var(--my-text)] mx-2  text-center text-[16px] font-bold">{{ selectType }}/{{
        recordStore.handList.length }}</p>
      <div class="flex flex-row flex-1 justify-end">
        <van-button :disabled="selectType >= recordStore.handList.length" @click="right" icon="arrow"
          style="background: var(--my-buttonPrimaryBg);"
          class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]!  text-[12px]! mx-1" />
        <van-button :disabled="selectType >= recordStore.handList.length"
          @click="selectType = recordStore.handList.length" icon="arrow-double-right"
          style="background: var(--my-buttonPrimaryBg);"
          class=" w-[30px]!  h-[30px]! text-[var(--my-buttonPrimaryText)]! text-[12px]! mx-1" />
      </div>
    </div>
  </div>
</template>
