<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import NoRecord from '@/components/NoRecord.vue'
defineProps({
  show: Boolean
})
const roomStore = useRoomStore()
const emit = defineEmits(['onClose']);

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper-1 pos-relative">
      <div
        class="pos-absolute bottom-0  text-[12px] py-2 h-[calc(100%-70px)] w-[80%] bg-[rgb(29,29,29,0.8)]   flex flex-col  border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]!" :border-radius="10" />
        <div class="  h-full w-full flex flex-col justify-start mt-[10px] items-center text-white">
          <div class="w-[90%] flex flex-row justify-between  font-bold ">
            <p>盲注:{{ roomStore.blindRecored?.limit_blind }}/{{ roomStore.blindRecored?.big_blind }}</p>
            <div class="flex flex-row items-center">
              <svg t="1751897946371" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6525" id="mx_n_1751897946372" width="20" height="20">
                <path
                  d="M512 796.672 210.944 796.672c0-59.392 10.24-100.352 59.392-118.784s112.64-40.96 149.504-71.68c40.96-34.816 30.72-34.816 20.48-47.104-14.336-16.384-16.384-57.344-16.384-57.344-43.008-12.288-32.768-81.92-22.528-81.92s10.24-4.096 4.096-40.96c-8.192-47.104-4.096-71.68 18.432-100.352S512 245.76 512 245.76l0 0c0 0 65.536 4.096 88.064 32.768s26.624 53.248 18.432 100.352c-6.144 36.864-6.144 40.96 4.096 40.96s18.432 69.632-22.528 81.92c0 0-2.048 40.96-16.384 57.344-10.24 12.288-20.48 12.288 20.48 47.104 36.864 30.72 100.352 55.296 149.504 71.68s59.392 59.392 59.392 118.784L512 796.672 512 796.672z"
                  p-id="6526" fill="#ffffff"></path>
                <path
                  d="M835.584 765.952l98.304 0c0-43.008-8.192-75.776-45.056-88.064s-83.968-30.72-110.592-53.248c-30.72-26.624-22.528-26.624-14.336-34.816 10.24-12.288 12.288-43.008 12.288-43.008 30.72-8.192 24.576-59.392 16.384-59.392s-8.192-2.048-2.048-30.72c6.144-34.816 4.096-53.248-14.336-73.728-16.384-22.528-65.536-24.576-65.536-24.576l0 0c0 0-49.152 2.048-65.536 24.576-4.096 4.096-6.144 10.24-10.24 14.336 0 0 18.432 10.24 20.48 30.72 2.048 18.432 2.048 36.864-8.192 63.488s-14.336 40.96 8.192 61.44c12.288 10.24 4.096 55.296 4.096 55.296s57.344 30.72 118.784 51.2C841.728 679.936 835.584 765.952 835.584 765.952z"
                  p-id="6527" fill="#ffffff"></path>
                <path
                  d="M188.416 765.952 90.112 765.952c0-43.008 8.192-75.776 45.056-88.064s83.968-30.72 110.592-53.248c30.72-26.624 22.528-26.624 14.336-34.816-10.24-12.288-12.288-43.008-12.288-43.008-30.72-8.192-24.576-59.392-16.384-59.392s8.192-2.048 2.048-30.72c-6.144-34.816-4.096-53.248 14.336-73.728 16.384-22.528 65.536-24.576 65.536-24.576l0 0c0 0 49.152 2.048 65.536 24.576 4.096 4.096 6.144 10.24 10.24 14.336 0 0-18.432 10.24-20.48 30.72-2.048 18.432-2.048 36.864 8.192 63.488s14.336 40.96-8.192 61.44c-12.288 10.24-4.096 55.296-4.096 55.296s-57.344 30.72-118.784 51.2C182.272 679.936 188.416 765.952 188.416 765.952z"
                  p-id="6528" fill="#ffffff"></path>
              </svg>
              {{ roomStore.blindRecored?.user_num }}
            </div>
          </div>
          <div class="  flex flex-col w-[96%] h-[70%]   items-center ">
            <div
              class="p-2 w-full flex flex-row justify-between items-center  text-[12px] text-white bg-[#151f23]  border-solid border-b-0 border-l-0  border-1 border-[rgba(255,255,255,0.1)]">
              <p class="w-1/4 text-center  ">玩家</p>
              <p class="w-1/4 text-center">买入</p>
              <p class="w-1/4 text-center">入池率</p>
              <p class="w-1/4 text-center  ">盈亏</p>
            </div>
            <v-virtual-scroll v-if="roomStore.blindRecored && roomStore.blindRecored?.user_blind_list.length > 0"
              class="h-[calc(100%-50px)] w-full" :items="roomStore.blindRecored?.user_blind_list">
              <template v-slot:default="{ item }">
                <v-card class="mt-0 p-2  w-[99%]" style="background: var(--my-cardBg);">
                  <div class="
             border-solid border-t-0 border-1 border-r-0 border-l-0 border-[rgba(255,255,255,0.1)]
            h-[28px]! flex flex-row justify-between w-full">
                    <p class="flex items-center justify-center text-white   w-1/4 text-center ml-[5px]">{{ item.name }}
                    </p>
                    <p class="flex items-center justify-center text-amber w-1/4 text-center">{{
                      Number(item.buy_amount).toFixed(2)
                      }}
                    </p>
                    <p class="flex items-center justify-center  w-1/4 text-center text-amber mr-[5px]">{{
                      item.bet_number }}
                      / {{ item.game_number <= 0 ? 0 : Math.floor((item.bet_number / item.game_number) * 100) }}%</p>
                        <p class="flex items-center justify-center  w-1/4 text-center text-amber mr-[5px]">{{
                          Number(item.phase).toFixed(2)
                          }}</p>
                  </div>
                </v-card>
              </template>
            </v-virtual-scroll>
            <NoRecord class="mt-30" :size="60" v-else />

          </div>
          <div
            class="h-[20px] items-center  flex flex-row justify-between w-[96%] text-[12px] text-white bg-[#151f23]  border-solid border-b-0 border-1 border-[rgba(255,255,255,0.1)]">
            <p class=" text-center ml-[10px]">旁观({{ roomStore.blindRecored?.stand_by_user.length }})</p>
          </div>
          <div class="h-[20%]  w-[96%] mt-2 flex flex-row flex-wrap">
            <div class="w-1/5 flex flex-col justify-start items-center"
              v-for="item in roomStore.blindRecored?.stand_by_user">
              <van-image round width="2.5rem" height="2.5rem" :src="item.head_url" />
              <p>{{ item.first_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style lang="css" scoped>
.wrapper-1 {
  display: flex;
  align-items: start;
  justify-content: start;
  padding-top: 10px;
  padding-right: 10px;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}
</style>
