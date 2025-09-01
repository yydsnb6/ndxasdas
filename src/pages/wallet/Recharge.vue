<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import { useWalletStore } from '@/stores/wallet';
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { onMounted } from 'vue';
const walletStore = useWalletStore()
onMounted(() => {
  walletStore.getWallet()
})

const onClickLeft = () => history.back();

const copy = ()=>{
  if (navigator.clipboard) {
        navigator.clipboard.writeText(walletStore.walletInfo?.address)
    } else {
        const input = document.createElement('textarea')
        input.value = walletStore.walletInfo?.address
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
    }
}
</script>

<template>
  <AppPage>
    <van-nav-bar :border="false"  style="background: var(--my-primary);"  class=" h-[50px]" title="充值" left-text="" left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <div class="flex flex-col w-full px-2 mt-2">
      <div class="flex flex-row w-full">
        <div class="flex-1 mx-2 flex flex-col">
          <p class=" text-[var(--my-accent)] font-700">货币</p>
          <v-card height="60" color="#fff">
            <div class="flex flex-row items-center justify-start h-full pl-5">
              <img src="../../assets/imgae/m_icon.png" class="w-[30px] h-[30px]" alt="" srcset="">
              <p class="text-[18px] font-bold ml-2">提现</p>
            </div>
          </v-card>
        </div>
        <div class="flex-1 mx-2 flex flex-col">
          <p class=" text-[var(--my-accent)] font-700">网络</p>
          <v-card height="60" color="#fff">
            <div class="flex flex-row items-center justify-start h-full pl-5">
              <svg t="1751989061537" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="12134" width="30" height="30">
                <path
                  d="M512.005813 0C229.229613 0 0 229.229613 0 512.06394s229.229613 511.93606 512.005813 511.93606 511.982562-229.229613 511.982562-511.93606S794.770387 0 512.005813 0z m190.65654 475.804321a24.715598 24.715598 0 0 1-34.876197 0L536.663283 344.716324v393.577876a24.669096 24.669096 0 0 1-49.326566 0V344.716324L356.24872 475.804321a24.660958 24.660958 0 0 1-34.876196-34.876196l172.695298-172.672048a26.192023 26.192023 0 0 1 35.864356 0l172.683673 172.683673a24.715598 24.715598 0 0 1 0 34.864571z"
                  p-id="12135" fill="#1a1758"></path>
              </svg>
              <p class="text-[18px] font-bold ml-2">Tron</p>
            </div>
          </v-card>
        </div>
      </div>
      <div class="px-2 mt-2">
        <v-card style="background: var(--my-cardBg)" >
          <div class="flex flex-row items-center justify-start h-full pl-5">
            <van-image :src="useQRCode(walletStore.walletInfo?.address)" alt="QR Code" class="w-[400px]" />

            <div class="flex flex-col flex-1 mr-3">
              <p class=" text-[var(--my-accent)] font-700">充值地址</p>
              <v-card style="background: var(--my-buttonSecondaryBg);border: var(--my-buttonSecondaryBorder);" width="200" height="60" class="" >
                <div class="flex w-full flex-row items-center justify-center h-full ">
                  <p class="text-[18px] font-bold  ">{{ walletStore.walletInfo?.address }}</p>
                </div>
              </v-card>
              <v-card  style="background: var(--my-buttonPrimaryBg);"  @click="copy" width="200" height="60" class=" my-4"  v-ripple="{ class: `text-info` }">
                <div class="flex w-full flex-row items-center justify-center h-full ">
                  <svg t="1751992139566" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="13623" width="16" height="16">
                    <path
                      d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                      p-id="13624"></path>
                    <path
                      d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z"
                      p-id="13625"></path>
                    <path
                      d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z"
                      p-id="13626"></path>
                  </svg>
                  <p class="text-[18px] font-bold ml-2 ">复制</p>
                </div>
              </v-card>
            </div>

          </div>
        </v-card>
      </div>
      <div class="px-2 mt-5">
        <v-card style="background: var(--my-cardBg)">
          <div class="flex flex-row items-center justify-start h-full p-2">
            <van-icon name="warning" style="color: var(--my-accent) !important" />
            <div class="ml-2 text-[var(--my-accent)] font-600 text-[14px]">
               <p>僅可向此充值地址發送USDT。</p>
                <p>最低充值: {{ walletStore.walletInfo?.min_pay }} USDT。</p>
                <p>只支持TRC20轉帳。以扣除公鏈手續費到帳為準，請合理安排充值金額，有任何疑問可以咨詢客服</p>
                <p>每次充值務必核對地址，以免錯誤。</p>
            </div>
          </div>
        </v-card>
      </div>
    </div>

  </AppPage>
</template>


