<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { IOptItem, type IOutHandCard } from '@/utils/interface';
import { onMounted, ref } from 'vue';
import Poker from '../game/Poker.vue';
onMounted(() => {
    get_hand_card_list()
})

const onClickLeft = () => history.back();

const dataList = ref<IOutHandCard[]>([])

const get_hand_card_list = async () => {
    dataList.value = []
    const { data } = await api.get_hand_card_list()
    dataList.value = data
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
    <AppPage>
        <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="手牌回顾" left-text=""
            left-arrow @click-left="onClickLeft">
            <template #right>
            </template>
        </van-nav-bar>
        <div class="h-[calc(100svh-70px)]  ">
            <div
                class="h-[20px] px-2 w-[100%] flex flex-row justify-between w-full text-[12px] text-white bg-[#151f23] border border-solid border-b-0 border-1 border-[rgba(255,255,255,0.1)]">
                <p class="w-1/4 text-left  ">玩家</p>
                <p class="w-1/4 text-center  ">位置</p>
                <p class="w-1/4 text-center">手牌</p>
                <p class="w-1/4 text-right  ">操作</p>
            </div>
            <v-virtual-scroll class="h-full w-full" :items="dataList">
                <template v-slot:default="{ item }">
                    <v-card class="my-1 py-2 h-[40px]" style="background: var(--my-accent);">
                        <div class="w-[10%] flex flex-row justify-between w-full items-center text-[var(--my-text)] px-4 text-[12px] font-bold">

                            <p class="w-1/4 text-left  ">{{ item.username }}</p>
                            <p class="w-1/4 text-center  ">{{
                                seatType[item.seat_type] }}</p>
                            <div class="flex items-center justify-evenly w-1/4 text-center">
                                <Poker :point="0" class="h-[25px]!" />
                                <Poker :point="0" class="h-[25px]!" />
                            </div>
                            <p class="w-1/4 text-right  ">{{ getActionText(item.opt_item) }}</p>

                        </div>

                    </v-card>
                </template>
            </v-virtual-scroll>
        </div>
    </AppPage>
</template>