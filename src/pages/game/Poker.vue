<script setup lang="ts">

const props = defineProps({
  point: Number,
  noPoker: Boolean,
  showWin:Boolean,
  showLose:Boolean
})

const pokerMap = new Map([
  ['poker_back', new URL('../../assets/imgae/poker/poker_back.png', import.meta.url).href],
  ['0', new URL('../../assets/imgae/poker/poker_back.png', import.meta.url).href],
  ['102', new URL('../../assets/imgae/poker/102.png', import.meta.url).href],
  ['103', new URL('../../assets/imgae/poker/103.png', import.meta.url).href],
  ['104', new URL('../../assets/imgae/poker/104.png', import.meta.url).href],
  ['105', new URL('../../assets/imgae/poker/105.png', import.meta.url).href],
  ['106', new URL('../../assets/imgae/poker/106.png', import.meta.url).href],
  ['107', new URL('../../assets/imgae/poker/107.png', import.meta.url).href],
  ['108', new URL('../../assets/imgae/poker/108.png', import.meta.url).href],
  ['109', new URL('../../assets/imgae/poker/109.png', import.meta.url).href],
  ['110', new URL('../../assets/imgae/poker/110.png', import.meta.url).href],
  ['111', new URL('../../assets/imgae/poker/111.png', import.meta.url).href],
  ['112', new URL('../../assets/imgae/poker/112.png', import.meta.url).href],
  ['113', new URL('../../assets/imgae/poker/113.png', import.meta.url).href],
  ['114', new URL('../../assets/imgae/poker/114.png', import.meta.url).href],
  ['202', new URL('../../assets/imgae/poker/202.png', import.meta.url).href],
  ['203', new URL('../../assets/imgae/poker/203.png', import.meta.url).href],
  ['204', new URL('../../assets/imgae/poker/204.png', import.meta.url).href],
  ['205', new URL('../../assets/imgae/poker/205.png', import.meta.url).href],
  ['206', new URL('../../assets/imgae/poker/206.png', import.meta.url).href],
  ['207', new URL('../../assets/imgae/poker/207.png', import.meta.url).href],
  ['208', new URL('../../assets/imgae/poker/208.png', import.meta.url).href],
  ['209', new URL('../../assets/imgae/poker/209.png', import.meta.url).href],
  ['210', new URL('../../assets/imgae/poker/210.png', import.meta.url).href],
  ['211', new URL('../../assets/imgae/poker/211.png', import.meta.url).href],
  ['212', new URL('../../assets/imgae/poker/212.png', import.meta.url).href],
  ['213', new URL('../../assets/imgae/poker/213.png', import.meta.url).href],
  ['214', new URL('../../assets/imgae/poker/214.png', import.meta.url).href],
  ['302', new URL('../../assets/imgae/poker/302.png', import.meta.url).href],
  ['303', new URL('../../assets/imgae/poker/303.png', import.meta.url).href],
  ['304', new URL('../../assets/imgae/poker/304.png', import.meta.url).href],
  ['305', new URL('../../assets/imgae/poker/305.png', import.meta.url).href],
  ['306', new URL('../../assets/imgae/poker/306.png', import.meta.url).href],
  ['307', new URL('../../assets/imgae/poker/307.png', import.meta.url).href],
  ['308', new URL('../../assets/imgae/poker/308.png', import.meta.url).href],
  ['309', new URL('../../assets/imgae/poker/309.png', import.meta.url).href],
  ['310', new URL('../../assets/imgae/poker/310.png', import.meta.url).href],
  ['311', new URL('../../assets/imgae/poker/311.png', import.meta.url).href],
  ['312', new URL('../../assets/imgae/poker/312.png', import.meta.url).href],
  ['313', new URL('../../assets/imgae/poker/313.png', import.meta.url).href],
  ['314', new URL('../../assets/imgae/poker/314.png', import.meta.url).href],
  ['402', new URL('../../assets/imgae/poker/402.png', import.meta.url).href],
  ['403', new URL('../../assets/imgae/poker/403.png', import.meta.url).href],
  ['404', new URL('../../assets/imgae/poker/404.png', import.meta.url).href],
  ['405', new URL('../../assets/imgae/poker/405.png', import.meta.url).href],
  ['406', new URL('../../assets/imgae/poker/406.png', import.meta.url).href],
  ['407', new URL('../../assets/imgae/poker/407.png', import.meta.url).href],
  ['408', new URL('../../assets/imgae/poker/408.png', import.meta.url).href],
  ['409', new URL('../../assets/imgae/poker/409.png', import.meta.url).href],
  ['410', new URL('../../assets/imgae/poker/410.png', import.meta.url).href],
  ['411', new URL('../../assets/imgae/poker/411.png', import.meta.url).href],
  ['412', new URL('../../assets/imgae/poker/412.png', import.meta.url).href],
  ['413', new URL('../../assets/imgae/poker/413.png', import.meta.url).href],
  ['414', new URL('../../assets/imgae/poker/414.png', import.meta.url).href],
])

const getPoker = (pokerName: string) => {
  const poker = pokerMap.get(pokerName)
  if (poker) {
    return poker
  }
}

</script>

<template>
  <div class=" h-full aspect-ratio-[134/185]" :class="showWin ? 'mt-[-5px]' : ''">
    <div v-if="props.noPoker" class="bg-white op-15 w-full h-full rd">
      <!-- <van-image class="w-full h-full " src="../../assets/imgae/poker/poker_back.png" alt="" srcset="" /> -->
    </div>
    <van-image v-else class="w-full h-full " :src="getPoker(`${props.point}`)" alt="" srcset="" />
    <div v-if="showWin"
      class=" rounded  flex-1  h-full  op-10!  bg-[var(--my-accent)]!  absolute bottom-0 w-full justify-center items-center flex">
    </div>
    <div v-if=" showLose"
      class=" rounded  flex-1  h-full   bg-[rgba(0,0,0,0.6)]!  absolute bottom-0 w-full justify-center items-center flex">
    </div>

  </div>
</template>
