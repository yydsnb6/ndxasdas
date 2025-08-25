<template>
  <div class="radar-countdown">
    <!-- 环形进度条 -->
    <svg viewBox="0 0 100 100">
      <!-- 背景圆环 -->
      <circle cx="50" cy="50" r="45" fill="none" :stroke="progressColorBg" stroke-width="8" />
      <!-- 动态进度条 -->
      <circle cx="50" cy="50" r="45" fill="none" :stroke="progressColor" stroke-width="8" stroke-linecap="round"
        :stroke-dasharray="circumference" :stroke-dashoffset="dashOffset" transform="rotate(-90 50 50)" />
      <!-- 中心计时显示 -->
      <text x="50" :y="posY" text-anchor="middle" font-size="36" fill="#fff">
        {{ timeLeft }}
      </text>
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  duration: { type: Number, default: 60 }, // 总时长（秒）
  size: { type: Number, default: 200 },    // 组件尺寸
  progressColor: { type: String, default: '#42b983' }, // 进度条颜色
  progressColorBg: { type: String, default: '#42b983' }, // 进度条颜色
  posY:{
    ype: Number, default: 80
  }
});

const timeLeft = ref(props.duration);
const animationFrame = ref(null);
const startTime = ref(0);

// 圆周长计算
const circumference = computed(() => 2 * Math.PI * 45);

// 进度条偏移量（控制动画）
const dashOffset = computed(() => {
  const progress = 1 - (timeLeft.value / props.duration);
  return circumference.value * progress;
});

// 格式化显示时间（分:秒）
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// 动画循环
const animate = (timestamp) => {
  if (!startTime.value) startTime.value = timestamp;

  const elapsed = Math.floor((timestamp - startTime.value) / 1000);
  timeLeft.value = Math.max(0, props.duration - elapsed);

  if (timeLeft.value > 0) {
    animationFrame.value = requestAnimationFrame(animate);
  } else {
    emit('completed');
  }
};

// 启动倒计时
const start = () => {
  timeLeft.value = props.duration;
  startTime.value = 0;
  animationFrame.value = requestAnimationFrame(animate);
};

// 生命周期
onMounted(start);
onBeforeUnmount(() => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
});

// 事件发射
const emit = defineEmits(['completed']);
</script>

<style lang="css" scoped>
.radar-countdown {
  display: inline-block;
  position: relative;
}

/* 添加雷达扫描动画 */
circle[stroke="#42b983"] {
  filter:
    drop-shadow(0 0 2px rgba(66, 185, 131, 0.6)) drop-shadow(0 0 5px rgba(66, 185, 131, 0.3));
  transition: stroke-dashoffset 0.1s linear;
}
</style>
