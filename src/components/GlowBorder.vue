<template>
  <div
    :style="styles"
    :class="' pointer-events-none absolute inset-0 w-[98%] h-[99%] rounded-[inherit] will-change-[background-position] animate-glow'"
  ></div>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";

interface Props {
  borderRadius?: number;
  color?: string | Array<string>;
  borderWidth?: number;
  duration?: number;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  borderRadius: 10,
  color: "#FFF",
  borderWidth: 2,
  duration: 10,
});

const styles = computed(() => {
  return {
    "--border-radius": `${props.borderRadius}px`,
    "--border-width": `${props.borderWidth}px`,
    "--duration": `${props.duration}s`,
    backgroundImage: `radial-gradient(transparent,transparent, ${
      Array.isArray(props.color) ? props.color.join(",") : props.color
    },transparent,transparent)`,
    backgroundSize: "300% 300%",
    mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
    WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    padding: "var(--border-width)",
    borderRadius: "var(--border-radius)",
  };
});
</script>


<style>
.animate-glow {
  animation: glow 6s infinite linear; /* 关键：6秒无限循环 */
}

@keyframes glow {
  0% { background-position: 0% 0%; }      /* 起始位置 */
  50% { background-position: 10% 100%; } /* 中间位置 */
  100% { background-position: 0% 0%; }    /* 回归起点（与0%相同） */
}

</style>
