<template>
  <div class="flex flex-row justify-between text-[10px] ">
    <p class="op-80">剩余时间: </p>
    <span class="w-[70px] text-left">{{ formattedTime }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  duration: { type: Number, default: 60 }, // 总时长（秒）
  size: { type: Number, default: 200 },    // 组件尺寸
  progressColor: { type: String, default: '#42b983' }, // 进度条颜色
  progressColorBg: { type: String, default: '#42b983' } // 进度条颜色
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

// 格式化时间计算属性
const formattedTime = computed(() => {
  // 1. 负值防御处理：确保时间不小于0
  const remaining = Math.max(0, timeLeft.value);

  // 2. 分解时间单位
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  // 3. 自适应格式：
  //    - 超过1小时显示"时:分:秒"
  //    - 不足1小时显示"分:秒"
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${Math.floor(seconds).toString().padStart(2, '0')}`;
  }
  return `${minutes}:${Math.floor(seconds).toString().padStart(2, '0')}`;
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

<style scoped>
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
