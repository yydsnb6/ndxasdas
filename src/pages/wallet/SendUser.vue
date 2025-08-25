<script setup lang="ts">
import { ref } from 'vue';
import api from '@/api/api';
import { useUserStore } from '@/stores/user';
import { useWalletStore } from '@/stores/wallet';
import { showNotify } from 'vant';

defineProps({
  show: Boolean,
  seatid: Number
})
const emit = defineEmits(['onClose']);
const userStore = useUserStore()
const walletStore = useWalletStore()
const money = ref(0)

const transfer = () => {
  api.transfer({
    amount: Number(money.value),
    user_id: walletStore.transferUser.user_info.user_id
  }
  ).then((res: any) => {
    console.log(res);

    if (res.code == 200) {
      emit('onClose')
      userStore.update_balance()
      showNotify(
        { type: 'success', message: '转账成功' }
      )

    } else {

    }
  }).catch((e) => {
    console.log(e);

  }).finally(() => {
  })
}
</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper-find pos-relative">
      <div
        class="pos-absolute bottom-0 text-[12px] p-5 px-4 h-[60%] w-full bg-white   flex flex-col  border-rd-t-[15px]   items-center justify-start"
        @click.stop>
        <h2>向游戏内转账</h2>

        <div class="text-[14px] flex   my-2 flex-row w-auto px-2  text-black font-bold justify-start
          items-center">
          <van-image round width="4.5rem" height="4.5rem" :src="walletStore.transferUser?.user_info.head_url" />
          <div class="ml-1">
            <p class=" text-black text-[16px]">{{ walletStore.transferUser?.user_info?.first_name  }}</p>
            <p class="text-[12px] text-[var(--my-text)] font-500">ID:{{ walletStore.transferUser?.user_info?.tgid }}</p>
          </div>
        </div>

        <div class="w-full ">
          <div class="flex flex-row items-center justify-between">
            <p class=" text-black font-700">提现数量</p>
            <p class="text-[14px] font-600 text-[#6f757a]">可转账:{{ userStore.userInfo?.balance }}</p>
          </div>
          <div class="flex flex-row items-center justify-start mt-2">
            <v-text-field v-model="money" :rules="[
              (value: any) => !!value || '请输入正确提现数量.',
              (value: any) => (value || '') <= walletStore.transferUser?.min_transfer || `最小限额:${walletStore.transferUser?.min_transfer}`
            ]" :placeholder="`最小限额:${walletStore.transferUser?.min_transfer}`">
            </v-text-field>
          </div>

          <p class=" text-[#6f757a] text-[14px] font-500 my-2">实际到账:{{ money - (money * walletStore.transferUser?.rates)
            }}USDT</p>
          <p class=" text-[#6f757a] text-[14px] font-500">手续费:{{ money * walletStore.transferUser?.rates }}USDT
          </p>
          <v-btn @click="transfer" class="my-2   w-full" height="45" min-width="100" color="#589374">
            <p class="text-[18px] font-bold">转账</p>
          </v-btn>
        </div>
      </div>
    </div>
  </van-overlay>

</template>


<style lang="css" scoped>
.wrapper-find {
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}


</style>
