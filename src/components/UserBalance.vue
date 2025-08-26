<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
  <div
    class="flex flex-row items-center border-2 border-solid rounded-full px-2 py-1 justify-between border-[var(--my-text)]">
    <svg @click="router.push('/wallet')" t="1756224806632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5721" width="20" height="20"><path d="M1023.082985 511.821692c0 281.370746-228.08199 509.452736-509.452736 509.452736-281.360557 0-509.452736-228.08199-509.452737-509.452736 0-281.365652 228.092179-509.452736 509.452737-509.452737 281.370746 0 509.452736 228.087085 509.452736 509.452737" fill="#1BA27A" p-id="5722"></path><path d="M752.731701 259.265592h-482.400796v116.460896h182.969951v171.176119h116.460895v-171.176119h182.96995z" fill="#FFFFFF" p-id="5723"></path><path d="M512.636816 565.13592c-151.358408 0-274.070289-23.954468-274.070289-53.50782 0-29.548259 122.706786-53.507821 274.070289-53.507821 151.358408 0 274.065194 23.959562 274.065194 53.507821 0 29.553353-122.706786 53.507821-274.065194 53.50782m307.734925-44.587303c0-38.107065-137.776398-68.995184-307.734925-68.995184-169.953433 0-307.74002 30.888119-307.74002 68.995184 0 33.557652 106.837333 61.516418 248.409154 67.711363v245.729433h116.450707v-245.632637c142.66205-6.001353 250.615085-34.077294 250.615084-67.808159" fill="#FFFFFF" p-id="5724"></path></svg>
    <p @click="router.push('/wallet')" class=" text-[var(--my-text)] mx-1">{{ userStore.userInfo?.balance }}</p>
    <van-loading v-if="userStore.balanceLoading" color="#fff" size="20" />
    <van-icon class=" rotate-[18deg]!" v-else name="replay" size="20" color="#fff" @click="userStore.update_balance" />
  </div>
</template>
