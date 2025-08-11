<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import { useWalletStore } from '@/stores/wallet';
import type { IWalletOrder } from '@/utils/interface';
import { useQRCode } from '@vueuse/integrations/useQRCode'
import { onMounted, ref } from 'vue';
const walletStore = useWalletStore()
onMounted(() => {
})

const onClickLeft = () => history.back();

const dataList = ref<IWalletOrder[]>([])

const btns = [
  {
    type: -1,
    text: '最近'
  },
  {
    type: 0,
    text: '全部'
  },
  {
    type: 1,
    text: '充值'
  },
  {
    type: 2,
    text: '提现'
  },
  {
    type: 3,
    text: '转账'
  },
]
const selectType = ref(-1)
const clickBtn = async (type: number) => {
  dataList.value = []
  selectType.value = type
  const { data } = await api.get_order_records(type)
  dataList.value = data.order_list
}
</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="更多记录" left-text=""
      left-arrow @click-left="onClickLeft">
      <template #right>
      </template>
    </van-nav-bar>
    <div class="flex flex-row justify-between items-center px-2">
      <v-btn v-for="item in btns" :key="item.type" @click="clickBtn(item.type)"
        :style="selectType == item.type ? 'background:var(--my-buttonPrimaryBg) ' : 'background:var(--my-buttonSecondaryBg);border:var(--my-buttonSecondaryBorder)'"
        class="my-2" height="25" min-width="50">

        <p :class="selectType == item.type ? 'text-[var(--my-buttonPrimaryText)]' : 'text-[var(--my-buttonSecondaryText)]'"
          class="text-[12px] font-bold ">{{ item.text }}</p>

      </v-btn>


    </div>
    <div class="h-[calc(100%-330px)] px-[3px]">
      <v-virtual-scroll class="h-full w-full" :items="dataList">
        <template v-slot:default="{ item }">
          <v-card class="my-2 h-[80px]" style="background: var(--my-primary);">
            <div class="felx flex-col p-2">
              <p class="text-[12px] text-[var(--my-text)] font-600">订单号:{{ item.order_id }}</p>
              <div class="flex flex-row justify-between my-1">
                <div class="flex flex-row items-center">
                  <svg t="1751999984938" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="18229" width="20" height="20">
                    <path d="M512 528m-398 0a398 398 0 1 0 796 0 398 398 0 1 0-796 0Z" fill="#F2814E" p-id="18230">
                    </path>
                    <path d="M512 496m-398 0a398 398 0 1 0 796 0 398 398 0 1 0-796 0Z" fill="#FFBE4E" p-id="18231">
                    </path>
                    <path d="M512 496m-282 0a282 282 0 1 0 564 0 282 282 0 1 0-564 0Z" fill="#FFBC54" p-id="18232">
                    </path>
                    <path
                      d="M512 180.668c174.036 0 315.332 141.296 315.332 315.332S686.036 811.332 512 811.332 196.668 670.036 196.668 496 337.964 180.668 512 180.668z m0 33.332c-155.64 0-282 126.36-282 282s126.36 282 282 282 282-126.36 282-282-126.36-282-282-282z"
                      fill="#FA7B4D" p-id="18233"></path>
                    <path
                      d="M512 180.668c174.036 0 315.332 141.296 315.332 315.332S686.036 811.332 512 811.332 196.668 670.036 196.668 496 337.964 180.668 512 180.668z m0 33.332c-155.64 0-282 126.36-282 282s126.36 282 282 282 282-126.36 282-282-126.36-282-282-282z"
                      fill="#FA7B4D" p-id="18234"></path>
                    <path
                      d="M494.108 705.168h55.352v-47.672c56.296-10.416 84.208-44.868 84.208-88.936 0-86.132-141.928-84.132-141.928-124.592 0-20.032 13.248-27.644 38.32-27.644 21.764 0 38.796 7.612 58.192 22.436l41.632-40.864c-20.816-19.228-45.888-33.248-80.424-37.656V313.768h-55.352V361.04c-51.568 8.816-82.32 40.464-82.32 86.132 0 81.724 141.456 82.928 141.456 126.596 0 19.628-12.776 29.244-42.104 29.244-24.604 0-48.256-8.412-76.168-26.44l-36.904 48.072c26.496 20.032 64.34 32.048 96.04 35.256v45.268z"
                      fill="#F97950" p-id="18235"></path>
                    <path
                      d="M494.108 685.168h55.352v-47.672c56.296-10.416 84.208-44.868 84.208-88.936 0-86.132-141.928-84.132-141.928-124.592 0-20.032 13.248-27.644 38.32-27.644 21.764 0 38.796 7.612 58.192 22.436l41.632-40.864c-20.816-19.228-45.888-33.248-80.424-37.656V293.768h-55.352V341.04c-51.568 8.816-82.32 40.464-82.32 86.132 0 81.724 141.456 82.928 141.456 126.596 0 19.628-12.776 29.244-42.104 29.244-24.604 0-48.256-8.412-76.168-26.44l-36.904 48.072c26.496 20.032 64.34 32.048 96.04 35.256v45.268z"
                      fill="#FFF89F" p-id="18236"></path>
                    <path
                      d="M257.4 801.828c14.168-7.124 31.124-14.42 36.6-35.828 20.132-78.676 424-508 424-508s0.372-52.644 29.852-82.536C846.172 247.96 910 364.584 910 496c0 219.664-178.336 398-398 398-96.8 0-185.572-34.632-254.6-92.172z"
                      fill="#F47A38" fill-opacity=".4" p-id="18237"></path>
                    <path
                      d="M716.296 301.688a30.104 30.104 0 0 1-0.228-41.464c1.24-1.488 1.932-2.224 1.932-2.224v-0.144a0.188 0.188 0 0 1 0.044-0.24 0.188 0.188 0 0 1 0.244 0c66.784 57.816 109.044 143.204 109.044 238.384 0 174.036-141.296 315.332-315.332 315.332-72.76 0-139.8-24.696-193.18-66.156a14.96 14.96 0 0 1-3.216-19.928l-0.036-0.02a18.172 18.172 0 0 1 26.248-4.452C389.112 756.692 448.088 778 512 778c155.64 0 282-126.36 282-282 0-75.284-29.564-143.716-77.704-194.312z"
                      fill="#FFBA58" p-id="18238"></path>
                    <path
                      d="M787.368 557.016a17.312 17.312 0 0 1 21.992-12.948c0.376 0.124 0.752 0.236 1.124 0.356a14.752 14.752 0 0 1 10.016 17.036c-18.42 87.196-72.936 161.14-147.148 205.464a15.988 15.988 0 0 1-21.116-4.48l0.016-0.016a17.24 17.24 0 0 1 5.224-24.844c65.064-39.296 113.004-104.128 129.892-180.568z"
                      fill="#FFED8C" p-id="18239"></path>
                  </svg>
                  <p class="text-[14px] font-bold text-[var(--my-cardText)]">{{ item.pay_amount }}</p>
                </div>
                <p class="text-[12px] font-bold text-[var(--my-cardText)]">手续费:{{ item.fees }}</p>
              </div>
              <div class="flex flex-row items-center">
                <svg t="1752000064340" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="19292" width="12" height="12">
                  <path
                    d="M512 112a398.54 398.54 0 1 1-155.68 31.41A397.51 397.51 0 0 1 512 112m0-48C264.58 64 64 264.58 64 512s200.58 448 448 448 448-200.58 448-448S759.42 64 512 64z"
                    p-id="19293" fill="#f4ea2a"></path>
                  <path d="M488 405.9h48v371.19h-48zM467 291.91a45 45 0 1 0 90 0 45 45 0 1 0-90 0z" p-id="19294"
                    fill="#f4ea2a"></path>
                </svg>
                <p class="text-[12px] text-[var(--my-cardSubText)]">订单描述:{{ item.order_desc }}</p>
              </div>

            </div>

          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </AppPage>
</template>
