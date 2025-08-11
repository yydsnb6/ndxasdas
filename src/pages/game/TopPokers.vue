<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Poker from './Poker.vue';
import bus from '@/utils/bus';
import { createTimeline, utils } from 'animejs';
import xipai from '@/assets/sound/xipai.mp3'
import { useSound } from '@vueuse/sound';
const doXipai = useSound(xipai, { volume:1 })
onMounted(() => {
  bus.on('EventGameStart', () => {
    neatShuffle()
  })


  // setTimeout(() => {
  //   neatShuffle()
  // }, 1000)
})

onUnmounted(() => {
  bus.on('EventGameStart', () => {
    neatShuffle()
  })
})

// 初始牌堆数据（9张牌）
const cards = ref(
  Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    label: `${i + 1}`,
    zIndex: i + 1,
    transform: 'translateY(0) rotate(0deg)',
    top: i + 'px'
  }))
);

// 整齐洗牌函数
const neatShuffle = () => {
  createTimeline({
    defaults: { duration: 500, delay: 1000 },
    loop: 0,
    onComplete: () => {

      doXipai.play()
      // 第一阶段：分成两半交错抬升（模拟洗牌手势）
      cards.value = cards.value.map((card, i) => {
        const isLeftHalf = i < 4; // 前4张为左半叠
        return {
          ...card,
          transform: isLeftHalf
            ? `translateX(-10px) translateY(${3 * (i + 1)}px) rotate(-5deg)`
            : `translateX(10px) translateY(${3 * (i - 3)}px) rotate(5deg)`,
          zIndex: 50 + i // 临时提高层级
        };
      });

      // 第二阶段：合并牌堆（瀑布下落效果）
      setTimeout(() => {
        const shuffled = [...cards.value].sort(() => Math.random() - 0.5);
        cards.value = Array.from({ length: 9 }, (_, i) => ({
          id: i + 1,
          label: `${i + 1}`,
          zIndex: i + 1,
          transform: `translateY(${0}) rotate(0deg)`,
          top: i + 'px'
        }))

        createTimeline({
          defaults: { duration: 500, delay: 1000 },
          loop: 0,
          onComplete: () => { }
        })
          .add('.topPokers', {
            top: {
              to: '2', // From 0px to 16rem
              ease: 'outCubic',
            },
            right: {
              to: '2', // From 0px to 16rem
              ease: 'outCubic',
            },
            opacity: {
              to: '1'
            },
            scale: {
              to: 1
            }
          })

      }, 800); // 与动画时间匹配
    }
  })
    .add('.topPokers', {
      top: {
        to: '30%', // From 0px to 16rem
        ease: 'outCubic',
      },
      right: {
        to: '45%', // From 0px to 16rem
        ease: 'outCubic',
      },
      opacity: {
        to: '1'
      },
      scale: {
        to: 1.5
      }
    })




}


</script>

<template>
  <!-- 牌堆容器 -->
  <div class=" aspect-ratio-[134/185] top-2 right-2  h-[50px]! pos-fixed topPokers">
    <!-- 整齐洗牌按钮 -->
    <div class=" aspect-ratio-[134/185]  h-[50px]! relative z-9999">
      <!-- 牌堆动画 -->
      <transition-group name="cascade" tag="div" class="relative w-full h-full">
        <Poker v-for="(card, index) in cards" :key="card.id" :point="0" :style="{
          transform: card.transform,
          top: card.top,
          zIndex: card.zIndex,
          transitionDelay: `${index * 30}ms`  // 错开动画延迟
        }"
          class="absolute w-full h-full rounded-md shadow-lg   flex items-center justify-center font-bold text-xl transition-all duration-500" />
      </transition-group>
    </div>
  </div>
</template>

<style>
/* 瀑布式洗牌动画 */
.cascade-move {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 交错抬升效果 */
.card-enter-active,
.card-leave-active {
  transition: all 0.5s ease;
}
</style>
