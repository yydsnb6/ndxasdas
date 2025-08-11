<script setup lang="ts">
// import { initData, useSignal, useLaunchParams } from '@telegram-apps/sdk-vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoomStore } from '@/stores/room';
import LocalUtil from '@/utils/LocalUtil';
import { encode, decode } from 'js-base64';

// const initDataRef = useSignal(initData.state);
// const lp = useLaunchParams();

defineProps({
  show: Boolean,
})
const emit = defineEmits(['onClose', 'changeIndex']);
// const user = ref({
//   // firstName: LocalUtil.stringForKey('first_name', initDataRef.value?.user?.firstName),
//   // photoUrl: LocalUtil.stringForKey('head_url', initDataRef.value?.user?.photoUrl),
//   // id: LocalUtil.stringForKey('tgid', initDataRef.value?.user?.id.toString()),
//   // username: LocalUtil.stringForKey('username', initDataRef.value?.user?.username),
//   // lastName: LocalUtil.stringForKey('lastName', 'lastName'),
// })

const user = ref({
  firstName: LocalUtil.stringForKey('first_name', 'test'),
  photoUrl: LocalUtil.stringForKey('head_url', 'test'),
  id: LocalUtil.stringForKey('tgid', '1111'),
  username: LocalUtil.stringForKey('username', 'test111'),
  lastName: LocalUtil.stringForKey('lastName', 'lastName'),
})
const userStore = useUserStore()

onMounted(() => {


})
const login = () => {
  console.log('調了嗎2222');

  userStore.login({
      first_name: user.value?.firstName,
      head_url: user.value?.photoUrl,
      last_name: user.value?.lastName,
      tgid: Number(user.value?.id),
      user_name: user.value?.username,
    }).finally(() => {
      emit('onClose')
    })

  // LocalUtil.setString(user.value?.firstName, 'first_name')
  // LocalUtil.setString(user.value?.photoUrl, 'head_url')
  // LocalUtil.setString(user.value?.id, 'tgid')
  // LocalUtil.setString(user.value?.username, 'username')
  // LocalUtil.setString(user.value?.lastName, 'lastName')

  // if (lp.startParam && lp.startParam != 'ABC') {
  //   let startParam = JSON.parse(decode(lp.startParam))
  //   if (startParam.agentId) {
  //     userStore.login({
  //       first_name: user.value?.firstName,
  //       head_url: user.value?.photoUrl,
  //       last_name: user.value?.lastName,
  //       tgid: Number(user.value?.id),
  //       user_name: user.value?.username,
  //       agent_id: startParam.agentId
  //     }).finally(() => {
  //     emit('onClose')

  //     })
  //   } else {
  //     userStore.login({
  //       first_name: user.value?.firstName,
  //       head_url: user.value?.photoUrl,
  //       last_name: user.value?.lastName,
  //       tgid: Number(user.value?.id),
  //       user_name: user.value?.username,
  //     }).finally(() => {
  //     emit('onClose')

  //     })
  //   }
  // } else {
  //   userStore.login({
  //     first_name: user.value?.firstName,
  //     head_url: user.value?.photoUrl,
  //     last_name: user.value?.lastName,
  //     tgid: Number(user.value?.id),
  //     user_name: user.value?.username,
  //   }).finally(() => {
  //     emit('onClose')
  //   })
  // }
}



</script>

<template>

  <van-overlay z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-50!">
    <div class="wrapper-poker">
      <div
        class=" items-center text-[12px] mb-[5px] h-[50%] p-5   w-[100%] bg-[rgb(255,255,255,1)]   flex flex-col pos-relative  border-rd-t-[15px]!"
        @click.stop>
        <div class="flex flex-col justify-between items-center">
          <van-field v-model="user.firstName" label="first_name" placeholder="请输入用户名" clearable />
          <van-field v-model="user.photoUrl" label="head_url" placeholder="请输入用户名" clearable />
          <van-field v-model="user.id" label="tgid" placeholder="请输入用户名" clearable />
          <van-field v-model="user.username" label="user_name" placeholder="请输入用户名" clearable />
          <van-button block @click="login" type="primary">登录</van-button>
        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style scoped></style>
