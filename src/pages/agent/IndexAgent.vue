<script setup lang="ts">
import NoRecord from '@/components/NoRecord.vue';
import { useAgentStore } from '@/stores/agent';
import { onMounted, ref } from 'vue';
import IndexAgent from './AgentInfo.vue';
import { useRouter } from 'vue-router';
import AgentQR from './AgentQR.vue';
import { shareURL } from '@telegram-apps/sdk-vue';
import { useUserStore } from '@/stores/user';
import { encode } from 'js-base64';

const agentStore = useAgentStore()
const zhishu = ref(true)
const erji = ref(true)
const selTop = ref(true)
const showPopover = ref(false)
const showAgentBox = ref(false)
const showQR = ref(false)
const userStore = useUserStore()
const infoIndex = ref(0)

onMounted(() => {
  agentStore.getAgentInfo()
  userStore.update_balance()
  getSubList()
})


const getSubList = () => {
  let lev = 0
  if (zhishu.value) {
    lev = 1
  }
  if (erji.value) {
    lev = 2
  }
  if (zhishu.value && erji.value) {
    lev = 0
  }
  agentStore.get_subord_list(lev, selTop.value ? 1 : 0)
}




const showAgentInfo = (index: number) => {
  infoIndex.value = index
  showAgentBox.value = !showAgentBox.value
}

const router = useRouter()
const toMoneyRecord = () => {
  router.push('/agentMoney')
}

const shareLink = () => {
  shareURL(`${agentStore.agentInfo?.share_url}?startapp=` + encode(JSON.stringify({
    agentId: userStore.userInfo.user_id
  })))
}

const clickWithdraw = () => {
  agentStore.get_rake_back()
}

const copy = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(`${agentStore.agentInfo?.share_url}?startapp=` + encode(JSON.stringify({
      agentId: userStore.userInfo.user_id
    })))
  } else {
    const input = document.createElement('textarea')
    input.value = `${agentStore.agentInfo?.share_url}?startapp=` + encode(JSON.stringify({
      agentId: userStore.userInfo.user_id
    }))
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)
  }

}

</script>

<template>
  <div class="flex flex-col pos-relative items-center">
    <div class=" w-full h-[200px] absolute top-0 z-0 overflow-hidden">
      <div style="background: rgba(92, 94, 97,0.6);"
        class="w-[200%] h-[300px]  rounded-b-[50%] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
    </div>
    <div class="flex flex-col z-1 w-full ">

      <h3 class="w-full text-center mt-2 text-[var(--my-text)]">代理返佣</h3>
      <div class="flex flex-col items-center text-white mt-5 pos-relative">
        <p class=" text-[var(--my-text)] text-[12px] font-600">可取现</p>
        <div class="flex flex-row items-center">
          <img src="../../assets//imgae/m_icon.png" class="w-[30px] h-[30px]" alt="" srcset="">
          <h1 class="ml-1 text-[28px]">{{ agentStore.agentInfo?.rake_back_amount || 0 }}</h1>
        </div>

        <div class=" absolute! top-2 right-1 flex flex-col items-center">
          <p v-ripple="{ class: `text-info` }" class="text-[var(--my-text)] text-[12px] font-600 mb-1" @click="toMoneyRecord">收入记录></p>
          <v-btn  height="20" width="50" color="#6795cf" class="bg-[var(--my-accent)]!" @click="clickWithdraw">
            <p class="text-[12px] font-bold  text-[var(--my-buttonPrimaryText)]">点击提现</p>
          </v-btn>
        </div>
      </div>
      <v-card class="p-5  mt-2 pos-relative mx-3 " style="background: var(--my-cardBg);">
        <div class="flex flex-row justify-evenly items-center w-full mt-[25px] px-2">
          <v-btn height="50" class="px-8" color="#e6f5f1" @click="showAgentInfo(0)" style="
      background: var(--my-buttonSecondaryBg);
              color: var(--my-buttonSecondaryText);
              border: var(--my-buttonSecondaryBorder)">
            <svg t="1751989150202" class="icon rotate-[180deg] " viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="12502" width="25" height="25">
              <path
                d="M512.005813 0C229.229613 0 0 229.229613 0 512.06394s229.229613 511.93606 512.005813 511.93606 511.982562-229.229613 511.982562-511.93606S794.770387 0 512.005813 0z m190.65654 475.804321a24.715598 24.715598 0 0 1-34.876197 0L536.663283 344.716324v393.577876a24.669096 24.669096 0 0 1-49.326566 0V344.716324L356.24872 475.804321a24.660958 24.660958 0 0 1-34.876196-34.876196l172.695298-172.672048a26.192023 26.192023 0 0 1 35.864356 0l172.683673 172.683673a24.715598 24.715598 0 0 1 0 34.864571z"
                p-id="12503" fill="#377e64"></path>
            </svg>
            <div class="ml-2">
              <p class="text-[12px] font-bold text-[var(--my-buttonSecondaryText)]">直属</p>
              <p class="text-[14px] font-bold">{{ agentStore.agentInfo?.one_level_pump }}%</p>
            </div>
          </v-btn>
          <v-btn height="50" class="px-8"  color="#e6f5f1" @click="showAgentInfo(1)" style="
              background: var(--my-buttonPrimaryBg) ;
              color: var(--my-buttonPrimaryText) ;
              border:  var(--my-buttonPrimaryBorder) ;
            ">
            <svg t="1751989061537" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
              p-id="12134" width="25" height="25">
              <path
                d="M512.005813 0C229.229613 0 0 229.229613 0 512.06394s229.229613 511.93606 512.005813 511.93606 511.982562-229.229613 511.982562-511.93606S794.770387 0 512.005813 0z m190.65654 475.804321a24.715598 24.715598 0 0 1-34.876197 0L536.663283 344.716324v393.577876a24.669096 24.669096 0 0 1-49.326566 0V344.716324L356.24872 475.804321a24.660958 24.660958 0 0 1-34.876196-34.876196l172.695298-172.672048a26.192023 26.192023 0 0 1 35.864356 0l172.683673 172.683673a24.715598 24.715598 0 0 1 0 34.864571z"
                p-id="12135" fill="#1a1758"></path>
            </svg>
            <div class="ml-2">
              <p class="text-[12px] font-bold text-[var(--my-buttonPrimaryText)]">二级</p>
              <p class="text-[14px] font-bold">{{ agentStore.agentInfo?.two_level_pump }}%</p>
            </div>
          </v-btn>
        </div>




        <div class="w-full  mt-2 my-1 px-2 pos-relative z-9 ">
          <v-btn @click="showPopover = !showPopover" height="30" width="100%" class="bg-[var(--my-cardBg)]!">
            <p class="text-[12px] font-bold text-[var(--my-accent)]">当前奖励等级：{{
              agentStore.agentInfo?.current_reward_level }}
            </p>
          </v-btn>
        </div>



      </v-card>
      <div class="pos-absolute w-full h-full" v-if="showPopover" @click="showPopover = false">

      </div>

       <div v-if="showPopover" class=" rounded pos-absolute   px-2 py-0 z-9999999 top-1/2 w-[95%] left-[2.5%] bg-[var(--my-cardBg)] bg-op-50">
          <div
            class=" font-bold my-4 flex flex-row justify-between px-4 bg-[#f7f7f7] rounded-full py-1 text-[12px] text-[#5ec269]">
            <p class="w-[20%] text-center ">等级</p>
            <p class="w-[30%] text-center ">邀请</p>
            <p class="w-[50%] text-center ">奖励</p>
          </div>
          <div v-for="item in agentStore.agentInfo?.current_reward_level_info" :key="item.level"
            class="my-4 flex flex-row justify-between px-4 bg-[#f7f7f7] rounded-full py-1 font-bold text-[14px] text-[#5ec269]">
            <p class="text-[12px] w-[20%] text-center ">Lv<span class="text-[16px]">{{ item.level }}</span></p>
            <p class="w-[30%] text-center ">{{ item.invite_number }}</p>
            <p class="w-[50%] text-center ">{{ item.pump }}</p>
          </div>
        </div>

      <div class="text-[12px] flex flex-row w-full justify-between items-center mt-2 font-600 text-[#6f757a]!">
        <div class="flex flex-row scale-[0.9]">
          <van-checkbox @change="getSubList" v-model="zhishu" shape="square">直属</van-checkbox>
          <van-checkbox @change="getSubList" class="ml-5" v-model="erji" shape="square">二级</van-checkbox>
        </div>
        <div class="flex flex-row  items-center">
          <p class="text-[var(--my-text)]">返(从高到低)</p>
          <van-switch @change="getSubList" v-model="selTop" class=" scale-[0.7]" />
        </div>
      </div>

      <div class="flex flex-col flex-1">
        <div class="h-[230px] px-[10px]">
          <v-virtual-scroll class="h-full w-full" :items="agentStore.subordList"
            v-if="agentStore.subordList.length > 0">
            <template v-slot:default="{ item }">
              <v-card class="my-2  " style="background: var(--my-primary);">
                <div
                  class="flex flex-row p-2 h-[50px] items-center justify-between px-5 text-[var(--my-text)] text-[12px] font-600">
                  <div class="flex flex-row">
                    <van-image round :src="item.head_url" class="w-[35px] h-[35px]" />
                    <div class="flex flex-col ml-5 justify-evenly">
                      <p>玩家:{{ item.first_name }}</p>
                      <p>id:{{ item.user_id }}</p>
                    </div>
                  </div>

                  <div class="flex flex-col justify-evenly mr-5">
                    <p>下级人数:<span class=" text-amber">{{ item.next_level_number }}</span></p>
                    <p>返佣金额:<span class=" text-amber">{{ item.rebate_amount }}</span></p>
                  </div>
                </div>

              </v-card>
            </template>
          </v-virtual-scroll>
          <NoRecord :size="100" class="mt-15" v-if="agentStore.subordList.length <= 0" />

        </div>
      </div>


    </div>

  </div>
  <div class="flex flex-col w-full pos-fixed bottom-[70px]">
    <div class="w-full flex-row">
      <van-divider style="border-color: var(--my-accent);"
        :style="{ color: '#1989fa', padding: '0 0px', margin: '0' }" />
    </div>

    <div class="w-full flex flex-row px-5 py-2 justify-between">
      <v-btn height="50" width="60%" class="bg-[var(--my-accent)]!" @click="shareLink">
        <i class="fas fa-paper-plane text-[20px] text-[var(--my-buttonPrimaryText)] mr-2"></i>
        <p class="text-[18px] font-bold text-[var(--my-buttonPrimaryText)]">邀请玩家</p>
      </v-btn>

      <v-btn height="50" width="50" color="#fff" @click="copy">
        <i class="fas fa-paste text-[28px] text-[var(--my-accent)]"></i>
      </v-btn>

      <v-btn @click="showQR = !showQR" height="50" width="50" color="#fff">
        <i class="fas fa-qrcode text-[28px] text-[var(--my-accent)]"></i>
      </v-btn>


    </div>
  </div>
  <IndexAgent :seIndex="infoIndex"
    :data="infoIndex == 0 ? agentStore.agentInfo?.one_level_info : agentStore.agentInfo?.two_level_info"
    :show="showAgentBox" @on-close="showAgentBox = !showAgentBox" />
  <AgentQR :show="showQR" @on-close="showQR = !showQR" />


</template>
