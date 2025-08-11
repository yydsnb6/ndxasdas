<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { IOptItem, type IOutHandCard } from '@/utils/interface';
import { onMounted, ref } from 'vue';
const onClickLeft = () => history.back();

onMounted(() => {
  balance_statistics()
})

const dataList = ref<{
  total_agent_extract: number,
  total_bet: number,
  total_fee: number,
  total_recharge: number,
  total_transfer_in: number,
  total_transfer_out: number,
  total_win: number,
  total_withdraw: number
}>({
    total_agent_extract: 0,
    total_bet: 0,
    total_fee: 0,
    total_recharge: 0,
    total_transfer_in: 0,
    total_transfer_out: 0,
    total_win: 0,
    total_withdraw: 0
  })

const balance_statistics = async () => {
  const { data } = await api.balance_statistics()
  dataList.value = data
}

</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="账单统计" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <div class="h-[calc(100svh-70px)]  ">
      <div class="w-[90%] mx-auto mt-2">
          <div class="flex flex-row gap-10">
            <!-- Left Column -->
            <div class="flex-1 flex flex-col gap-4">
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px]  shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-coins text-yellow-400 mr-2"></i>总佣金提取
                </span>
                <span class="text-[#f7c873] text-[16px] font-bold">{{ dataList.total_agent_extract }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-dice text-blue-400 mr-2"></i>总下注
                </span>
                <span class="text-[#7ed6df] text-[16px] font-bold">{{ dataList.total_bet }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-receipt text-pink-400 mr-2"></i>总手续费
                </span>
                <span class="text-[#ffb6b9] text-[16px] font-bold">{{ dataList.total_fee }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-wallet text-green-400 mr-2"></i>总充值
                </span>
                <span class="text-[#a3e635] text-[16px] font-bold">{{ dataList.total_recharge }}</span>
              </div>
            </div>
            <!-- Right Column -->
            <div class="flex-1 flex flex-col gap-4">
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-arrow-down text-purple-400 mr-2"></i>总转账入
                </span>
                <span class="text-[#b39ddb] text-[16px] font-bold">{{ dataList.total_transfer_in }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-arrow-up text-red-400 mr-2"></i>总转账出
                </span>
                <span class="text-[#ff7675] text-[16px] font-bold">{{ dataList.total_transfer_out }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-trophy text-yellow-300 mr-2"></i>总赢
                </span>
                <span class="text-[#ffe066] text-[16px] font-bold">{{ dataList.total_win }}</span>
              </div>
              <div class="flex items-center justify-between bg-gradient-to-r from-[#31313a] to-[#23232a] rounded-[10px] shadow-xl px-4 py-2 h-14 border border-[#39394a] hover:scale-105 transition-transform duration-200">
                <span class="text-[#e6e6e6] text-[12px] font-semibold tracking-wide flex items-center">
                  <i class="fas fa-hand-holding-usd text-cyan-400 mr-2"></i>总提现
                </span>
                <span class="text-[#76e2f7] text-[16px] font-bold">{{ dataList.total_withdraw }}</span>
              </div>
            </div>
          </div>
        </div>

    </div>
  </AppPage>
</template>
