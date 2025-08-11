<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { showToast } from 'vant';
import html2canvas from 'html2canvas';
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { encode, decode } from 'js-base64';

defineProps<{
  show: boolean,
}>()

const emit = defineEmits(['onClose']);
const userStore = useUserStore()
const agentStore = useAgentStore()


import { shallowRef } from 'vue'
import { useAgentStore } from '@/stores/agent';



const text = shallowRef(`${agentStore.agentInfo?.share_url}?startapp=` + encode(JSON.stringify({
  agentId: userStore.userInfo.user_id
})))
const qrcode = useQRCode(text, {
  errorCorrectionLevel: 'H',
  margin: 3,
})

const copyLink = () => {

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text.value + userStore.tgid)
  } else {
    const input = document.createElement('textarea')
    input.value = text.value + userStore.tgid
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }
  showToast({
    message: '已复制',
    position: 'top',
  })
}
const saveQR = () => {
  html2canvas(document.querySelector("#capture")).then(canvas => {
    const link = document.createElement('a');
    link.download = '邀请二维码.png';
    link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    link.click();
  });
}

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper-poker pos-relative">
      <div
        class="pos-absolute bottom-0  items-center text-[12px] mb-[-5px] h-[60%]   w-[100%]  bg-[var(--my-cardBg)]   flex flex-col  border-rd-t-[15px]!"
        @click.stop>

        <h2 class="bg-[var(--my-cardBg)] w-full text-center py-2 border-rd-t-[15px] font-500 text-[var(--my-text)]">邀请玩家
        </h2>
        <div class="flex flex-col items-center justify-center h-full pt-2 pb-0">
          <div id="capture">
            <van-image :src="qrcode" alt="QR Code" class="w-[150px] h-[150px] mx-auto" />
          </div>
          <div class="mt-2 text-[#bdbdbd] text-base" style="font-family: 'Noto Sans TC', sans-serif;">
            豐厚獎勵等你來拿！
          </div>
          <button @click="saveQR"
            class="mt-2 w-[320px] h-[48px] bg-[var(--my-accent)] rounded-lg flex items-center justify-center shadow-none border-none"
            style="font-family: 'Noto Sans TC', sans-serif;">
            <i class="fas fa-download text-[var(--my-buttonPrimaryText)] text-xl mr-2"></i>
            <span class="text-[var(--my-buttonPrimaryText)] text-lg font-medium">
              保存二維碼
            </span>
          </button>
          <div class="w-full flex justify-center mt-4">
            <div class="pos-relative flex items-center w-[99%] max-w-[480px]">
              <input
                class=" font-bold flex-1 h-[38px] bg-[var(--my-accent)] border border-[#e0e0e0] rounded-sm pl-2 pr-10 py-1 text-[var(--my-buttonPrimaryText)] text-sm no-scrollbar outline-none"
                readonly style="font-family: 'Noto Sans TC', sans-serif;" type="text" :value="text" ref="linkInput" />
              <button @click="copyLink"
                class="absolute right-2 top-5 -translate-y-1/2 text-[#bdbdbd] hover:text-[#1abc9c] focus:outline-none"
                title="复制链接" tabindex="-1" style="background:transparent;">
                <svg t="1752251862597" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="31672" width="20" height="20">
                  <path
                    d="M833.33 767.96h-91.9c-21.73 0-39.34-17.6-39.34-39.34s17.62-39.34 39.34-39.34h91.9c8.82 0 15.98-7.18 15.98-15.98V193.8c0-8.8-7.17-15.98-15.98-15.98H353.84c-8.82 0-15.98 7.18-15.98 15.98v90.86c0 21.75-17.62 39.34-39.34 39.34s-39.34-17.6-39.34-39.34V193.8c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.21-42.49 94.67-94.68 94.67z"
                    fill="#333333" p-id="31673"></path>
                  <path
                    d="M675.96 925.33H196.47c-52.19 0-94.67-42.45-94.67-94.67V351.17c0-52.21 42.47-94.67 94.67-94.67h479.49c52.19 0 94.67 42.45 94.67 94.67v479.49c-0.01 52.22-42.48 94.67-94.67 94.67zM196.47 335.19c-8.82 0-15.98 7.18-15.98 15.98v479.49c0 8.8 7.17 15.98 15.98 15.98h479.49c8.82 0 15.98-7.18 15.98-15.98V351.17c0-8.8-7.17-15.98-15.98-15.98H196.47z"
                    fill="#333333" p-id="31674"></path>
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style scoped>
.wrapper-poker {
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}

.van-floating-panel__header {
  background: rgba(0, 0, 0, 0) !important;
}

.my-active {
  background-color: #27353e;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
