<script setup lang="ts">
import { ref } from 'vue';
import SendUser from './SendUser.vue';
import api from '@/api/api';
import { useWalletStore } from '@/stores/wallet';

defineProps({
  show: Boolean,
  seatid: Number
})
const emit = defineEmits(['onClose']);
const showSendUser = ref(false)
const userID = ref()
const walletStore = useWalletStore()

const checkUserId = ()=>{
    api.get_transfer_user(userID.value).then((res:any)=>{
      console.log(res);

      if (res.code == 200) {
        walletStore.transferUser = res.data
        showSendUser.value = !showSendUser.value
        emit('onClose')

      }else{

      }
    }).catch(()=>{

    }).finally(()=>{
    })
}
</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper-find pos-relative">
      <div
        class="pos-absolute bottom-0 text-[12px] p-5 px-4 h-[40%] w-full  bg-[var(--my-cardBg)]   flex flex-col  border-rd-t-[15px]   items-center justify-start"
        @click.stop>
        <h2 class="text-[var(--my-accent)]">向游戏内转账</h2>
        <div class="w-full mt-6">
          <p class=" text-[var(--my-accent)] font-700 text-[14px] mb-2">请输入用户ID</p>
          <div class="flex flex-row items-center justify-start text-[var(--my-accent)]">
            <v-text-field v-model="userID" :rules="[(value:any) => !!value || '请输入正确的用户ID.']" placeholder="请输入正确的用户ID">
            </v-text-field>
          </div>
          <v-btn @click="checkUserId" class="my-2   w-full bg-[var(--my-accent)]!" height="45" min-width="100" color="#589374">
            <p class="text-[18px] font-bold text-[var(--my-buttonPrimaryText)]">确认</p>
          </v-btn>
        </div>
      </div>
    </div>
  </van-overlay>

  <SendUser :show="showSendUser" @on-close="showSendUser = !showSendUser" />
</template>


<style>
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

.van-field__control {
  font-size: 20px;
  color: #ebbb32 !important;
}
</style>
