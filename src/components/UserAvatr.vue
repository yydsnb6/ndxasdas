<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore()
const router = useRouter()
</script>

<template>
  <div v-ripple="{ class: `text-info` }" @click="router.push('/me')" class="text-[14px] flex   my-2 flex-row w-auto px-2   font-bold justify-start
          items-center">
    <van-image round width="3rem" height="3rem" :src="userStore.userInfo?.head_url" style="border: var(--my-buttonSecondaryBorder);border-width: 1.5px;" />
    <div class="ml-1">
      <p class=" text-[var(--my-text)] ">{{ userStore.userInfo?.first_name }}</p>
      <p class="text-[12px] text-[var(--my-text)] font-500">ID:{{ userStore.userInfo?.user_id }}</p>
    </div>
  </div>
</template>


