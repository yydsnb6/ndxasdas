<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import { useAgentStore } from '@/stores/agent';
import { onMounted } from 'vue';

const agentStore = useAgentStore()
onMounted(() => {
  agentStore.get_rake_back_record()
})

const onClickLeft = () => history.back();


</script>

<template>
  <AppPage>

    <div class="flex flex-col pos-relative items-center">

      <div style="background: var(--my-cardBg);" class=" w-full h-[150px] absolute top-0 z-0 overflow-hidden">
        <div class="w-[200%] h-[300px]  rounded-b-[50%] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
      </div>
      <div class="w-full">
        <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="收入记录" left-text=""
          left-arrow @click-left="onClickLeft">
          <template #right>
          </template>
        </van-nav-bar>
      </div>

      <div class="flex justify-center w-full mt-16px z-9">
        <div style="background: var(--my-cardBg); box-shadow: var(--my-cardShadow);"
          class="w-370px max-w-95vw  rounded-2xl shadow pt-16px pb-8px px-8px">
          <div class="flex flex-col items-center">
            <span class="text-[var(--my-cardText)] text-[14px] mb-4px"
              style="font-family: 'Noto Sans TC', Arial, sans-serif;">总收入</span>
            <span class="text-[var(--my-text)] text-[24px] font-bold mb-8px"
              style="font-family: 'Noto Sans TC', Arial, sans-serif;">{{ agentStore.backRecordList?.total_pump }}
              USDT</span>
          </div>
          <div class="flex w-full border-t border-#f2f2f2 pt-8px">
            <div class="flex-1 flex flex-col items-center">
              <span class="text-[var(--my-cardText)]  text-[12px] mb-4px"
                style="font-family: 'Noto Sans TC', Arial, sans-serif;">今日收入：</span>
              <span class="text-[var(--my-text)]  text-18px" style="font-family: 'Noto Sans TC', Arial, sans-serif;">{{
                agentStore.backRecordList?.today_pump }} USDT</span>
            </div>
            <div class="flex-1 flex flex-col items-center border-l border-r border-#f2f2f2">
              <span class="text-[var(--my-cardText)]  text-[12px] mb-4px"
                style="font-family: 'Noto Sans TC', Arial, sans-serif;">本週收入：</span>
              <span class="text-[var(--my-text)]  text-18px" style="font-family: 'Noto Sans TC', Arial, sans-serif;">{{
                agentStore.backRecordList?.week_pump }} USDT</span>
            </div>
            <div class="flex-1 flex flex-col items-center">
              <span class="text-[var(--my-cardText)]  text-[12px] mb-4px"
                style="font-family: 'Noto Sans TC', Arial, sans-serif;">本月收入：</span>
              <span class="text-[var(--my-text)]  text-18px" style="font-family: 'Noto Sans TC', Arial, sans-serif;">{{
                agentStore.backRecordList?.month_pump }} USDT</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-16px ml-16px text-[var(--my-text)] text-[14px] w-full pl-2"
        style="font-family: 'Noto Sans TC', Arial, sans-serif;">收入记录</div>

      <v-virtual-scroll class="h-full w-full px-2" :items="agentStore.backRecordList?.rake_back_record_list">
        <template v-slot:default="{ item }">
          <v-card class="my-2 " style="background: var(--my-primary);">
            <div class="flex flex-row justify-between my-1 h-[30px] px-5 items-center">
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
                <p class="text-[var(--my-text)] text-[14px] font-bold">{{ item.amount }}</p>
              </div>
              <p class="text-[12px] font-bold text-[var(--my-cardText)]">{{ item.get_time }}</p>
            </div>

          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </AppPage>
</template>
