<script setup lang="ts">
import { ref } from 'vue';
import Poker from '../game/Poker.vue';
 defineProps({
  show: Boolean
})

const hands = ref([
  {
    rank: '1st',
    title: '皇家同花顺',
    titleColor: 'text-[#fff]',
    desc: '同花的 A, K, Q, J, 10',
    cards: [
      '110', '111', '112', '113', '114'
    ],
    cardsAlt: [
      '黑桃A扑克牌', '黑桃K扑克牌', '黑桃Q扑克牌', '黑桃J扑克牌', '黑桃10扑克牌'
    ]
  },
  {
    rank: '2nd',
    title: '同花顺',
    titleColor: 'text-[#D0021B]',
    desc: '相同花色的五张连续牌',
    cards: [
      '207', '208', '209', '210', '211'
    ],
    cardsAlt: [
      '红心A扑克牌', '红心K扑克牌', '红心Q扑克牌', '红心J扑克牌', '红心10扑克牌'
    ]
  },
  {
    rank: '3rd',
    title: '四条',
    titleColor: 'text-[#4A90E2]',
    desc: '四张相同点数的牌',
    cards: [
      '402', '302', '202', '102', '314'
    ],
    cardsAlt: [
      '红心A扑克牌', '黑桃A扑克牌', '方块A扑克牌', '梅花A扑克牌', '方块K扑克牌'
    ]
  },
  {
    rank: '4th',
    title: '葫芦',
    titleColor: 'text-[#B8A038]',
    desc: '三张相同点数的牌加一对',
    cards: [
      '211', '311', '411', '113', '113'
    ],
    cardsAlt: [
      '红心A扑克牌', '黑桃A扑克牌', '梅花A扑克牌', '黑桃K扑克牌', '梅花K扑克牌'
    ]
  },
  {
    rank: '5th',
    title: '同花',
    titleColor: 'text-[#D0021B]',
    desc: '五张相同花色的牌',
    cards: [
      '408', '410', '405', '413', '414'
    ],
    cardsAlt: [
      '红心K扑克牌', '红心J扑克牌', '红心8扑克牌', '红心4扑克牌', '红心2扑克牌'
    ]
  },
  {
    rank: '6th',
    title: '顺子',
    titleColor: 'text-[#fff]',
    desc: '五张连续不同花色的牌',
    cards: [
      '408', '309', '210', '411', '312'
    ],
    cardsAlt: [
      '黑桃K扑克牌', '红心Q扑克牌', '方块J扑克牌', '梅花10扑克牌', '黑桃9扑克牌'
    ]
  },
  {
    rank: '7th',
    title: '三条',
    titleColor: 'text-[#fff]',
    desc: '三张相同点数的牌',
    cards: [
      '413', '313', '213', '303', '205'
    ],
    cardsAlt: [
      '梅花8扑克牌', '黑桃8扑克牌', '红心8扑克牌', '黑桃K扑克牌', '梅花2扑克牌'
    ]
  },
  {
    rank: '8th',
    title: '两对',
    titleColor: 'text-[#fff]',
    desc: '两组相同点数的对子',
    cards: [
      '212', '112', '108', '208', '411'
    ],
    cardsAlt: [
      '黑桃K扑克牌', '红心K扑克牌', '梅花8扑克牌', '黑桃8扑克牌', '方块2扑克牌'
    ]
  },
  {
    rank: '9th',
    title: '一对',
    titleColor: 'text-[#fff]',
    desc: '两张相同点数的牌',
    cards: [
      '112', '212', '408', '305', '308'
    ],
    cardsAlt: [
      '黑桃A扑克牌', '红心A扑克牌', '黑桃10扑克牌', '方块8扑克牌', '梅花2扑克牌'
    ]
  },
  {
    rank: '10th',
    title: '高牌',
    titleColor: 'text-[#fff]',
    desc: '无其他组合的最大牌',
    cards: [
      '110', '205', '308', '303', '411'
    ],
    cardsAlt: [
      '黑桃A扑克牌', '红心A扑克牌', '黑桃10扑克牌', '方块8扑克牌', '梅花2扑克牌'
    ]
  }
])

const selectIndex = ref(0)
const emit = defineEmits(['onClose', 'changeIndex']);

</script>

<template>

  <van-overlay :lockScroll="false" z-index="2000" :show="show" @click="emit('onClose')" class="bg-op-20!">
    <div class="wrapper-poker pos-relative">
      <div
        class="pos-absolute bottom-0  items-center text-[12px] h-[60%]  p-2 px-4 w-[100%] bg-[var(--my-cardBg)]  flex flex-col  border-rd-t-[15px]!"
        @click.stop>
        <div
          class="mt-2 bg-[#15181c] text-[14px] font-bold text-[#6f757a] flex flex-row justify-center rounded-full w-[70%] h-[30px]! ">
          <div @click="selectIndex = 0" :class="`${selectIndex == 0 ? 'my-active' : ''}`"
            class=" rounded-full h-[30px] flex flex-1 justify-center items-center">
            玩法教学
          </div>
          <div @click="selectIndex = 1" :class="`${selectIndex == 1 ? 'my-active' : ''}`"
            class=" rounded-full h-[30px]  flex flex-1 justify-center items-center">
            牌型大小
          </div>
        </div>
        <div v-if="selectIndex == 0" class="mt-2 overflow-y-scroll text-white w-full ">
          <div>
            <div class="text-[var(--my-text)] text-[16px] font-normal leading-tight mb-2"
              style="font-family: 'Noto Sans SC', Arial, sans-serif;">
              <span class="font-bold">1.NLH 游戏规则</span>
            </div>
            <div class="text-gray-500 text-[14px] font-normal leading-relaxed mb-5"
              style="font-family: 'Noto Sans SC', Arial, sans-serif;">
              每位玩家会收到两张底牌，并在三个阶段中发放五张公共牌组成桌面。玩家使用自己的底牌和公共牌，根据牌型等级组成最佳的五张牌组合。
            </div>
            <div class=" pos-relative flex items-center justify-center mt-[-15px]">
              <img src="../../assets/imgae/table/table1.png" class="w-[70%] h-[380px]" alt="" srcset="">
              <img class=" pos-absolute  top-10 w-[80%]" src="../../assets/imgae/table/cards-win.svg" alt=""
                srcset="">

            </div>
            <div class="text-[var(--my-text)] text-[16px] font-normal leading-tight mb-2"
              style="font-family: 'Noto Sans SC', Arial, sans-serif;">
              <span class="font-bold">2.如何获胜</span>
            </div>
            <div class="text-gray-500 text-[14px] font-normal leading-relaxed"
              style="font-family: 'Noto Sans SC', Arial, sans-serif;">
              1）摊牌 - 当最后一张公共牌（也称为河牌）的下注轮结束后，剩余的玩家必须摊牌。拥有最高排名的五张牌的玩家赢得底池。<br>
              2）最后未被跟注的下注 - 玩家在任何阶段下注加注后，如果没有对手跟注，则赢得底池。
            </div>
          </div>
        </div>
        <div v-if="selectIndex == 1" class="mt-2 overflow-y-scroll text-white w-full px-10 ml-5">
          <div class=" font-['Noto_Sans_SC']">
            <div v-for="(item, idx) in hands" :key="idx" class="flex items-center mb-1 last:mb-0">
              <div class="flex space-x-1 w-28">
                <Poker class="w-[40px]" v-for="(img, i) in item.cards" :key="i" :point="Number(img)" />
              </div>
              <div class="ml-5">
                <div class="flex items-center">
                  <span class="text-[#F5A623] font-bold text-[14px] mr-1">{{ item.rank }}</span>
                  <span :class="item.titleColor + ' font-bold text-[14px]'">{{ item.title }}</span>
                </div>
                <div class="text-xs text-gray-500">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>


<style scoped>
.wrapper-poker {
  display: flex;
  align-items: end;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
}

.van-floating-panel__header {
  background: rgba(0, 0, 0, 0) !important;
}

.my-active {
  background-color: #27353e;
  color: white;
}
</style>
