<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { IOptItem, type IOutHandCard } from '@/utils/interface';
import { onMounted, ref } from 'vue';
const onClickLeft = () => history.back();

onMounted(() => {
  get_balance_change_record()
})

const dataList = ref<{
  change_after: number,
  change_amount: number,
  change_before: number,
  change_time: string,
  change_type: number,
  id: number
}[]>([

])

const get_balance_change_record = async () => {
  dataList.value = []
  const { data } = await api.get_balance_change_record()
  dataList.value = data
}

const getType = (type: number) => {

  switch (type) {
    case 1:
      return '充值'
    case 2:
      return '提现'
    case 3:
      return '下注'
    case 4:
      return '游戏赢取'
    case 5:
      return '转入'
    case 6:
      return '转出'
    case 7:
      return '提取拥挤'
    case 8:
      return '提现失败返回'
    default:
      break;
  }

}



</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="余额变动统计" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <div class="h-[calc(100svh-70px)]  ">

      <v-virtual-scroll class="h-full w-full" :items="dataList">
        <template v-slot:default="{ item }">
          <v-card class="my-1 py-2 " style="background: var(--my-cardBg);">
            <div class=" flex flex-row justify-between w-full items-center text-[var(--my-text)] px-4 text-[12px] ">
              <div>
                <p class="text-[var(--my-accent)]">{{ getType(item.change_type) }}</p>
                <p class="text-[10px] opacity-70">{{ item.change_time }}</p>
                <p class="text-[10px] opacity-70">订单ID:{{ item.id }}</p>

              </div>
              <div class="flex flex-col items-end">
                <!-- <p class="text-[10px]">{{ item.change_after }}</p> -->
                <p class="text-[12px]"
                  :class="`${item.change_amount > 0 ? 'text-[var(--my-accent)]' : 'text-[var(--my-text)'}`">{{
                    item.change_amount }}</p>
                <p class="text-[10px]">余额：{{ item.change_before }}</p>
              </div>
            </div>
          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </AppPage>
</template>
