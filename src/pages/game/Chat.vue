<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import NoRecord from '@/components/NoRecord.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import { useSocketStore } from '@/stores/mysocket';
import bus from '@/utils/bus';
import { useUserStore } from '@/stores/user';
defineProps({
  show: Boolean
})
const roomStore = useRoomStore()
const userStore = useUserStore()
const emit = defineEmits(['onClose']);

const virtual = ref()

const chatMsg = ref('')
const socketStore = useSocketStore()

onMounted(() => {
  bus.on('chat', () => {
    virtual.value && virtual.value.scrollToIndex(socketStore.chatList.length - 1)
  })
})
onUnmounted(() => {
  bus.off('chat')
})
const send = () => {

  socketStore.sendMsg(chatMsg.value)
  chatMsg.value = ''

}

</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper-1 pos-relative p-0!">
      <div
        class="pos-absolute bottom-0  text-[12px] h-[100%] w-[80%] bg-[rgb(29,29,29,0.8)]   flex flex-col  border-rd-[15px]!"
        @click.stop>
        <GlowBorder :color="['#A07CFE', '#FE8FB5', '#FFBE7B']" class="rounded h-[98%]! w-[98%]! left-2!"
          :border-radius="10" />
        <div class="  h-full w-full flex flex-col justify-start items-center text-white pr-[10px] pb-[10px]">
          <div class="h-[calc(100%-55px)] w-full ">
            <v-virtual-scroll ref="virtual" class="h-full w-full" :items="socketStore.chatList">
              <template v-slot:default="{ item }">
                <v-card  v-ripple="{ class: `text-info` }" v-if="item.id == userStore.userInfo?.user_id" class="my-1 py-2 w-[98%] ml-2"
                  style="background: rgba(0,0,0,0);">
                  <div
                    class=" flex flex-row justify-end w-full items-start text-[var(--my-text)] text-[10px] font-bold ">
                    <div class="mr-2 max-w-[80%]">
                      <p class="text-[rgba(178,217,96,0.7)] text-right">{{ item.first_name }}</p>
                      <p class="text-[rgba(178,217,96,0.7)]">{{ item.msg }}</p>
                    </div>
                    <van-image :src="item.head" round class="w-[35px] h-[35px] mr-1" fit="contain" />
                  </div>
                </v-card>
                <v-card  v-ripple="{ class: `text-info` }" v-else class="my-1 py-2 w-[98%] ml-2" style="background: rgba(0,0,0,0);">
                  <div
                    class=" flex flex-row justify-start w-full items-start text-[var(--my-text)] text-[10px] font-bold">
                    <van-image :src="item.head" round class="w-[35px] h-[35px]" fit="contain" />
                    <div class="ml-2 max-w-[80%]">
                      <p class="text-[rgba(255,255,255,0.7)]">{{ item.first_name }}</p>
                      <p class="text-[var(--my-text)]">{{ item.msg }}</p>
                    </div>
                  </div>
                </v-card>

              </template>
            </v-virtual-scroll>
          </div>
          <div class="h-[55px]  w-full flex flex-row justify-between px-2  items-center">
            <van-field :border="false" class="bg-[rgba(0,0,0,0.5)]! w-[80%]! " v-model="chatMsg"
              :placeholder="`${roomStore.sceneMsg.self_seat_id > -1 ? '说点什么吧。。。' : '观众模式无法参与发言,请先坐下'}`"
              :disabled="roomStore.sceneMsg.self_seat_id <= -1" />
            <van-button  v-ripple="{ class: `text-info` }" @click="send" :disabled="roomStore.sceneMsg.self_seat_id <= -1" icon="guide-o"
              class="bg-[var(--my-buttonPrimaryBg)]! text-[20px]!" />
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
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}


:deep(.van-field__control) {
  color: var(--my-text) !important;
  font-size: 12px !important;
}
</style>
