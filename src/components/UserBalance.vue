<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div
    class="flex flex-row items-center border-2 border-solid rounded-full px-2 py-1 justify-between border-[var(--my-text)]">
    <img @click="router.push('/wallet')" src="../assets/imgae/m_icon.png" class="w-[20px] h-[20px] " alt="" srcset="">
    <p @click="router.push('/wallet')" class=" text-[var(--my-text)] mx-1">{{ userStore.userInfo?.balance }}</p>
    <van-loading v-if="userStore.balanceLoading" color="#fff" size="20" />
    <van-icon class=" rotate-[18deg]!" v-else name="replay" size="20" color="#fff" @click="userStore.update_balance" />
  </div>
</template>
