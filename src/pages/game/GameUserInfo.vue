<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import { showToast } from 'vant';

const props = defineProps({
  show: Boolean,
})


const emit = defineEmits(['onClose']);
const roomStore = useRoomStore()

const copyLink = () => {

  if (navigator.clipboard) {
    navigator.clipboard.writeText(roomStore.showUserInfo?.id)
  } else {
    const input = document.createElement('textarea')
    input.value = roomStore.showUserInfo?.id
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

</script>

<template>

  <van-overlay z-index="20000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper2 pos-relative">
      <div
        class="pos-absolute  top-[40%] left-[5%]  text-[12px] p-5 px-4  w-[90%] bg-[rgb(29,29,29,0.8)]   flex flex-col   border-rd-[15px]! items-center justify-evenly"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="flex flex-row items-center justify-center mr-5 w-full">
          <van-image round width="3rem" height="3rem" :src="roomStore.showUserInfo?.head_url" />
          <div class="ml-2">
            <p class="text-[var(--my-text)] text-[20px]">{{ roomStore.showUserInfo?.first_name }}</p>
            <div class="flex flex-row items-center text-[12px]">
              <p class="text-[rgba(255,255,255,0.5)] ">id:{{ roomStore.showUserInfo?.id }}</p>
              <i class="fas fa-paste text-[var(--my-accent)] ml-1" @click="copyLink"></i>
            </div>

          </div>

        </div>
        <div
          class="flex flex-row justify-between border-1 border-solid border-[rgba(255,255,255,0.5)] rounded w-full p-2 mt-5">
          <div class="text-center">
            <p class="text-[var(--my-text)] font-bold text-[18px]">{{ roomStore.showUserInfo?.total_bet_number > 0?((roomStore.showUserInfo?.total_bet_number /roomStore.showUserInfo?.total_game_number)*100).toFixed(0):0   }}%</p>
            <p class="text-[rgba(255,255,255,0.5)] text-[12px]">入池率</p>
          </div>
          <div class="text-center">
            <p class="text-[var(--my-text)] font-bold text-[18px]">{{ roomStore.showUserInfo?.total_win_number > 0?((roomStore.showUserInfo?.total_win_number /roomStore.showUserInfo?.total_game_number)*100).toFixed(0):0   }}%</p>
            <p class="text-[rgba(255,255,255,0.5)] text-[12px]">胜率</p>
          </div>
          <div class="text-center">
            <p class="text-[var(--my-text)] font-bold text-[18px]">{{ roomStore.showUserInfo?.total_show_number > 0?((roomStore.showUserInfo?.total_show_number /roomStore.showUserInfo?.total_game_number)*100).toFixed(0):0   }}%</p>
            <p class="text-[rgba(255,255,255,0.5)] text-[12px]">摊牌率</p>
          </div>
          <div class="text-center">
            <p class="text-[var(--my-text)] font-bold text-[18px]">{{ roomStore.showUserInfo?.total_game_number }}</p>
            <p class="text-[rgba(255,255,255,0.5)] text-[12px]">手牌次数</p>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style lang="css" scoped>
.wrapper2 {
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
