<!-- <template>
  <div class=" absolute top-0 left-0 h-full w-full z-9999!">
    <div class="chip-container">
    <div v-for="(chip, index) in chips" :key="index" class="chip" :ref="el => { if (el) chipRefs[index] = el }"
      :style="{ left: chip.x + 'px', top: chip.y + 'px' }">
      {{ chip.value }}
    </div>
    <button v-ripple="{ class: `text-info` }"@click="flyChips" class="z-99999 w-50 h-20 absolute top-0">飞筹码</button>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import gsap from 'gsap';
const chips = ref([]);
const chipRefs = ref([]);
const containerWidth = ref(0);
const containerHeight = ref(0);

const generateChips = (num) => {
  const newChips = [];
  for (let i = 0; i < num; i++) {
    newChips.push({
      x: Math.random() * containerWidth.value,
      y: Math.random() * containerHeight.value,
      value: i + 1,
    });
  }
  chips.value = newChips;
};

const flyChips = () => {
  if (chips.value.length === 0) return;

  const targetX = containerWidth.value / 2;
  const targetY = containerHeight.value / 2;

  chips.value.forEach((chip, index) => {
    const chipRef = chipRefs.value[index];
    if (chipRef) {
      gsap.to(chipRef, {
        x: targetX,
        y: targetY,
        opacity: 0,
        duration: 1,
        delay: index * 0.1,
        onComplete: () => {
          // 飞到目标位置后，可以移除或者隐藏筹码
          chip.x = -100; // 移出可视区域
          chip.y = -100; // 移出可视区域
          chipRef.style.opacity = 1; // 恢复不透明度，方便下次飞
          // 也可以选择直接从数组中移除
          // chips.value.splice(index, 1);
          // 或者更新位置
          chip.x = Math.random() * containerWidth.value;
          chip.y = Math.random() * containerHeight.value;
        },
      });
    }
  });
};

onMounted(() => {
  containerWidth.value = document.querySelector('.chip-container').offsetWidth;
  containerHeight.value = document.querySelector('.chip-container').offsetHeight;
  generateChips(20);
  // 确保在DOM更新后再进行飞行动画
  nextTick(() => {
    //   flyChips();  // 可以在onMounted中直接调用，或者通过点击事件触发
  });
});
</script>

<style scoped>
.chip-container {
  position: relative;
  width: 500px;
  height: 300px;
  border: 1px solid #ccc;
  overflow: hidden;
  /* 确保筹码不会超出容器 */
}

.chip {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: blue;
  color: white;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  /* 禁止选中 */
}
</style> -->
