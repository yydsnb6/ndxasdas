<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet';
import { showNotify, showToast } from 'vant';
import { onMounted, ref } from 'vue';
const walletStore = useWalletStore()
const userStore = useUserStore()
onMounted(() => {
  userStore.update_balance()
  walletStore.getWithdrawalConf()
})

const withdraw = () => {
  api.withdrawal({
    address: address.value,
    amount: money.value
  }).then((res) => {
    console.log(res);

    if (res.code == 200) {

      userStore.update_balance()
      showNotify(
        { type: 'success', message: res.msg }
      )
    } else {

    }
  }).catch(() => {

  }).finally(() => {
  })
}

const onClickLeft = () => history.back();
const money = ref(0)
const address = ref('')

</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="提现" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <div class="flex flex-col w-full px-2 mt-2">
      <div class="flex-1 mx-2 my-2 flex flex-col">
        <p class=" text-[var(--my-accent)] font-700">货币</p>
        <v-card style="background: var(--my-primary);" height="60" color="#fff">
          <div class="flex flex-row items-center justify-start h-full pl-5">
            <img src="../../assets/imgae/m_icon.png" class="w-[30px] h-[30px]" alt="" srcset="">
            <p class="text-[18px] font-bold ml-25 text-[var(--my-accent)]">USDT</p>
          </div>
        </v-card>
      </div>
      <v-card class="mx-2" style="background: var(--my-primary);">
        <div class="flex-1 mx-2 my-2 flex flex-col">
          <p class=" text-[var(--my-text)] font-700">网络</p>
          <div class="flex flex-row items-center justify-start h-full">
            <v-text-field :rules="[]" disabled>
              <p class="text-[var(--my-text)] text-[24px]">Tron</p>
            </v-text-field>
          </div>
          <p class=" text-[var(--my-text)] font-700">提现地址</p>
          <div class="flex flex-row items-center justify-start h-full text-[var(--my-text)]">
            <v-text-field class="text-[white]" v-model="address" :rules="[value => !!value || '请输入正确的钱包地址.']"
              placeholder="请输入正确的钱包地址">
            </v-text-field>
          </div>

          <div class="flex flex-row items-center justify-between">
            <p class=" text-[var(--my-text)] font-700">提现数量</p>
            <p class="text-[14px] font-600 text-[var(--my-text)]">可提现:{{ userStore.userInfo?.balance }}</p>
          </div>
          <div class="flex flex-row items-center justify-start h-full text-[var(--my-text)]">
            <v-text-field v-model="money" :rules="[
              value => !!value || '请输入正确提现数量.',
              value => (value || '') <= walletStore.withdrawInfo?.min_withdrawal || `最小限额:${walletStore.withdrawInfo?.min_withdrawal}`
            ]" :placeholder="`最小限额:${walletStore.withdrawInfo?.min_withdrawal}`">
            </v-text-field>
          </div>

          <p class=" text-[#6f757a] text-[14px] font-500 my-2 text-[var(--my-text)]">实际到账:{{ money }}USDT</p>
          <p class=" text-[#6f757a] text-[14px] font-500 text-[var(--my-text)]">手续费:{{ money *
            walletStore.withdrawInfo.withdrawal_rate }}USDT</p>

        </div>

      </v-card>
      <v-btn @click="withdraw" class="my-2  mx-2 bg-[var(--my-accent)]!" height="45" min-width="100" color="#589374">
        <p class="text-[18px] font-bold text-[var(--my-buttonPrimaryText)]">确认</p>
      </v-btn>
    </div>

  </AppPage>
</template>
