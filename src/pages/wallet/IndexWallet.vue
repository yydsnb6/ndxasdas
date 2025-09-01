<script setup lang="ts">
import NoRecord from '@/components/NoRecord.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import FindUser from './FindUser.vue';
import { onMounted, ref } from 'vue';
import { useWalletStore } from '@/stores/wallet';
const userStore = useUserStore()
const walletStore = useWalletStore()
const router = useRouter()

onMounted(() => {
  walletStore.getOrderRecords(-1)
  userStore.update_balance()
})
const toWithdraw = () => {
  router.push('/withdraw')
}

const toRecharge = () => {
  router.push('/recharge')
}


const toMoreRecord = () => {
  router.push('/moreRecord')
}

const showFindUser = ref(false)
</script>

<template>
  <div class="flex flex-col pos-relative items-center">
    <div class=" w-full h-[120px] absolute top-0 z-0 overflow-hidden">
      <div style="background: rgba(92, 94, 97,0.6);" class="w-[200%] h-[300px] rounded-b-[50%] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
    <div class="flex flex-col z-1 w-full px-3">

      <h3 class="w-full text-center mt-2 text-[var(--my-text)]">我的钱包</h3>
      <v-card style="background: var(--my-cardBg);" class="p-5  mt-2 pos-relative">
        <div class="w-full  flex flex-col items-center justify-center py-[20px]">
          <p class=" text-[var(--my-text)] text-[14px]">总数</p>
          <div class="flex flex-row items-center">
            <img src="../../assets//imgae/m_icon.png" class="w-[30px] h-[30px]" alt="" srcset="">
            <h1 class="ml-1 text-[28px] text-[var(--my-text)]">{{ userStore.userInfo?.balance || 0 }}</h1>
          </div>
          <div class="flex flex-row justify-evenly items-center w-full mt-[25px]">
            <v-btn class="px-8"  @click="toRecharge" height="50"
            style="
      background: var(--my-buttonSecondaryBg);
              color: var(--my-buttonSecondaryText);
              border: var(--my-buttonSecondaryBorder)"
            >
              <svg t="1751989150202" class="icon rotate-[180deg]" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="12502" width="25" height="25">
                <path
                  d="M512.005813 0C229.229613 0 0 229.229613 0 512.06394s229.229613 511.93606 512.005813 511.93606 511.982562-229.229613 511.982562-511.93606S794.770387 0 512.005813 0z m190.65654 475.804321a24.715598 24.715598 0 0 1-34.876197 0L536.663283 344.716324v393.577876a24.669096 24.669096 0 0 1-49.326566 0V344.716324L356.24872 475.804321a24.660958 24.660958 0 0 1-34.876196-34.876196l172.695298-172.672048a26.192023 26.192023 0 0 1 35.864356 0l172.683673 172.683673a24.715598 24.715598 0 0 1 0 34.864571z"
                  p-id="12503" fill="#377e64"></path>
              </svg>
              <p class="text-[14px] font-bold ml-2 text-[var(--my-buttonSecondaryText)]">充值</p>
            </v-btn>
            <v-btn   @click="toWithdraw" height="50"
            style="
              background: var(--my-buttonPrimaryBg) ;
              color: var(--my-buttonPrimaryText) ;
              border:  var(--my-buttonPrimaryBorder) ;
            "
            class=" px-8">
              <svg t="1751989061537" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="12134" width="25" height="25">
                <path
                  d="M512.005813 0C229.229613 0 0 229.229613 0 512.06394s229.229613 511.93606 512.005813 511.93606 511.982562-229.229613 511.982562-511.93606S794.770387 0 512.005813 0z m190.65654 475.804321a24.715598 24.715598 0 0 1-34.876197 0L536.663283 344.716324v393.577876a24.669096 24.669096 0 0 1-49.326566 0V344.716324L356.24872 475.804321a24.660958 24.660958 0 0 1-34.876196-34.876196l172.695298-172.672048a26.192023 26.192023 0 0 1 35.864356 0l172.683673 172.683673a24.715598 24.715598 0 0 1 0 34.864571z"
                  p-id="12135" fill="#1a1758"></path>
              </svg>
              <p class="text-[14px] font-bold ml-2 text-[var(--my-buttonPrimaryText)]">提现</p>
            </v-btn>
          </div>

          <v-btn class=" absolute! top-2 right-0 " @click="showFindUser = !showFindUser" height="25" width="50"
            style="
      background: var(--my-buttonSecondaryBg);
              color: var(--my-buttonSecondaryText);
              border: var(--my-buttonSecondaryBorder)">
            <!-- <svg t="1751995656108" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="14707" width="20" height="20">
              <path
                d="M912.213333 423.253333a25.480533 25.480533 0 0 0-31.744-17.237333c-13.482667 3.925333-21.333333 18.261333-17.237333 31.744 10.24 34.474667 15.36 70.485333 15.36 106.837333 0 207.530667-168.96 376.490667-376.490667 376.490667-207.530667 0-376.490667-168.96-376.490666-376.490667 0-207.530667 168.96-376.490667 376.490666-376.490666 14.165333 0 25.6-11.434667 25.6-25.6s-11.434667-25.6-25.6-25.6C266.24 116.906667 74.410667 308.736 74.410667 544.597333c0 235.861333 191.829333 427.690667 427.690666 427.690667 235.861333 0 427.690667-191.829333 427.690667-427.690667-0.170667-41.301333-5.973333-82.090667-17.578667-121.344z"
                p-id="14708" fill="#1296db"></path>
              <path
                d="M686.592 401.578667c4.949333 5.290667 11.776 8.021333 18.602667 8.021333a25.6 25.6 0 0 0 18.602666-43.178667l-82.090666-86.698666h223.744c14.165333 0 25.6-11.434667 25.6-25.6s-11.434667-25.6-25.6-25.6H642.901333l81.237334-82.944c9.898667-10.24 9.728-26.453333-0.512-36.352a25.6 25.6 0 0 0-36.181334 0.341333l-114.517333 116.906667-2.218667 2.730666c-10.922667 14.677333-10.922667 34.645333-0.170666 49.493334l116.053333 122.88zM602.794667 584.704c14.165333 0 25.6-11.434667 25.6-25.6s-11.434667-25.6-25.6-25.6h-96.426667v-7.168l104.448-104.448c10.069333-10.069333 10.069333-26.282667 0-36.181333a25.429333 25.429333 0 0 0-36.181333 0l-95.402667 95.402666-91.818667-96.938666a25.6 25.6 0 0 0-37.205333 35.157333l104.96 110.592v3.413333h-96.426667c-14.165333 0-25.6 11.434667-25.6 25.6s11.434667 25.6 25.6 25.6h96.426667v58.197334h-96.426667c-14.165333 0-25.6 11.434667-25.6 25.6s11.434667 25.6 25.6 25.6h96.426667v67.754666c0 14.165333 11.434667 25.6 25.6 25.6s25.6-11.434667 25.6-25.6v-67.754666h96.426667c14.165333 0 25.6-11.434667 25.6-25.6s-11.434667-25.6-25.6-25.6h-96.426667v-58.197334h96.426667z"
                p-id="14709" fill="#1296db"></path>
            </svg> -->
            <i class="fas fa-coins text-[14px] text-[var(--my-buttonSecondaryText)]"></i>
            <p class="text-[12px] font-bold ml-2 text-[var(--my-buttonSecondaryText)]">转账</p>
          </v-btn>
        </div>
      </v-card>
      <div class="flex flex-col">
        <div class="flex flex-row justify-between font-700 items-center px-2 text-[12px] my-2">
          <p class=" text-[var(--my-text)] ">最近订单记录</p>
          <p @click="toMoreRecord" class=" text-[var(--my-text)] ">更多></p>
        </div>
        <div class="h-[calc(100svh-50px-250px)] px-[3px]">
          <v-virtual-scroll class="h-full w-full" :items="walletStore.walletOrderList">
            <template v-slot:default="{ item }">
              <v-card class="my-2 h-[70px]" style="background: var(--my-primary);">
                <div class="felx flex-col p-2">
                  <p class="text-[10px] text-[var(--my-text)] font-600">订单号:{{ item.order_id }}</p>
                  <div class="flex flex-row justify-between my-1">
                    <div class="flex flex-row items-center">
                      <svg t="1751999984938" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="18229" width="15" height="15">
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
                      <p class="text-[12px] font-bold text-[var(--my-cardText)]">{{ item.pay_amount }}</p>
                    </div>
                    <p class="text-[10px] font-bold text-[var(--my-cardText)]">手续费:{{ item.fees }}</p>
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
                    <p class="text-[10px] text-[var(--my-cardSubText)]">订单描述:{{ item.order_desc }}</p>
                  </div>

                </div>

              </v-card>
            </template>
          </v-virtual-scroll>
        </div>
        <NoRecord v-if="0 > 0" :size="200" />
      </div>
    </div>
    <FindUser :show="showFindUser" @on-close="showFindUser = !showFindUser" />
  </div>

</template>


