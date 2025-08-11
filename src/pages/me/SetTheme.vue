<script setup lang="ts">
import AppPage from '@/components/AppPage.vue';
import { ref, watch } from 'vue';
const onClickLeft = () => history.back();
import { themes } from '@/utils/theme'
import { useUserStore } from '@/stores/user';

const selectedTheme = ref(themes[0]);
const showSaved = ref(false);
const showReset = ref(false);

// Load from localStorage
if (localStorage.getItem('themeColor')) {
  const saved = JSON.parse(localStorage.getItem('themeColor'));
  const found = themes.find(t => t.name === saved.name);
  if (found) selectedTheme.value = found;
}

watch(selectedTheme, (val) => {
  document.documentElement.style.setProperty('--my-primary', val.primary);
  document.documentElement.style.setProperty('--my-text', val.text);
  document.documentElement.style.setProperty('--my-accent', val.accent);
  document.documentElement.style.setProperty('--my-bg', val.bg);
  document.documentElement.style.setProperty('--my-cardBg', val.cardBg);
  document.documentElement.style.setProperty('--my-cardText', val.cardText);
  document.documentElement.style.setProperty('--my-cardSubText', val.cardSubText);
  document.documentElement.style.setProperty('--my-cardShadow', val.cardShadow);
  document.documentElement.style.setProperty('--my-buttonPrimaryBg', val.buttonPrimaryBg);
  document.documentElement.style.setProperty('--my-buttonPrimaryText', val.buttonPrimaryText);
  document.documentElement.style.setProperty('--my-buttonPrimaryBorder', val.buttonPrimaryBorder);
  document.documentElement.style.setProperty('--my-buttonSecondaryBg', val.buttonSecondaryBg);
  document.documentElement.style.setProperty('--my-buttonSecondaryText', val.buttonSecondaryText);
  document.documentElement.style.setProperty('--my-buttonSecondaryBorder', val.buttonSecondaryBorder);
  document.body.style.background = val.bg;
}, { immediate: true });




// Load from localStorage
if (localStorage.getItem('themeColor')) {
  const saved = JSON.parse(localStorage.getItem('themeColor'));
  const found = themes.find(t => t.name === saved.name);
  if (found) selectedTheme.value = found;
}

watch(selectedTheme, (val) => {
  document.documentElement.style.setProperty('--theme-primary', val.primary);
  document.documentElement.style.setProperty('--theme-text', val.text);
  document.documentElement.style.setProperty('--theme-bg', val.bg);
  document.body.style.background = val.bg;
}, { immediate: true });

function saveTheme() {
  localStorage.setItem('themeColor', JSON.stringify(selectedTheme.value));
  showSaved.value = true;
  setTimeout(() => showSaved.value = false, 1800);
}

function resetTheme() {
  selectedTheme.value = themes[0];
  localStorage.removeItem('themeColor');
  showReset.value = true;
  setTimeout(() => showReset.value = false, 1800);
}

const userStore = useUserStore()

</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="主题设置" left-arrow
      @click-left="onClickLeft" />
    <div :style="{ background: selectedTheme.bg }"
      class=" flex flex-col items-center justify-center transition-colors duration-500">
      <div
        :style="{ background: selectedTheme.cardBg, color: selectedTheme.cardText, boxShadow: selectedTheme.cardShadow }"
        class="w-full max-w-xl rounded-2xl shadow-2xl p-8">
        <div class="flex items-center mb-8">
          <i :style="{ color: selectedTheme.accent }" class="fas fa-palette text-3xl mr-4"></i>
          <div>
            <h1 :style="{ color: selectedTheme.cardText }" class="text-2xl font-bold tracking-tight">
              主题色设置
            </h1>
            <p :style="{ color: selectedTheme.cardSubText }" class="text-gray-400 text-sm mt-1">
              选择你喜欢的主题色，个性化你的界面体验。
            </p>
          </div>
        </div>
        <div>
          <h2 :style="{ color: selectedTheme.cardText }" class="text-lg font-semibold mb-4">
            选择主题色
          </h2>
          <div class="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
            <template :key="theme.name" v-for="(theme, idx) in themes">
              <label class="cursor-pointer flex flex-col items-center">
                <input :id="'theme-' + idx" :value="theme" class="hidden color-radio" type="radio"
                  v-model="selectedTheme" />
                <span
                  :style="{ background: theme.primary, borderColor: selectedTheme.name === theme.name ? theme.accent : 'transparent' }"
                  class="color-label w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all">
                  <i class="fas fa-check text-white text-lg" v-if="selectedTheme.name === theme.name"></i>
                </span>
                <span :style="{ color: selectedTheme.cardSubText }" class="mt-2 text-xs font-medium">
                  {{ theme.displayName }}
                </span>
              </label>
            </template>
          </div>
        </div>
        <div>
          <h2 :style="{ color: selectedTheme.cardText }" class="text-lg font-semibold mb-4">
            主题预览
          </h2>
          <div :style="{
            background: selectedTheme.primary,
            color: selectedTheme.text
          }" class="theme-preview rounded-xl p-6 flex items-center justify-between shadow-lg">
            <div>
              <h3 class="text-xl font-bold mb-1">
                你好，世界！
              </h3>
              <p class="text-sm opacity-90">
                这是主题色的预览效果。
              </p>
            </div>

            <van-image class="w-20 h-20 rounded-full shadow-lg" round :src="userStore.userInfo?.head_url"
              style="border: var(--my-buttonSecondaryBorder);border-width: 1.5px;" />

          </div>
        </div>
        <div class="flex  mt-5 flex-row justify-between mb-5">
          <button class="btn px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
            :style="{
              background: selectedTheme.buttonPrimaryBg,
              color: selectedTheme.buttonPrimaryText,
              border: selectedTheme.buttonPrimaryBorder
            }" @click="saveTheme">
            <i class="fas fa-save mr-2"></i>
            保存设置
          </button>
          <button class="btn px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105"
            :style="{
              background: selectedTheme.buttonSecondaryBg,
              color: selectedTheme.buttonSecondaryText,
              border: selectedTheme.buttonSecondaryBorder
            }" @click="resetTheme">
            <i class="fas fa-undo mr-2"></i>
            恢复默认
          </button>
        </div>
      </div>
      <transition name="fade">
        <div
          :style="{ background: selectedTheme.cardBg, color: selectedTheme.cardText, borderColor: selectedTheme.accent }"
          class="fixed top-8 right-8 border shadow-lg rounded-lg px-6 py-3 flex items-center space-x-3 z-50"
          v-if="showSaved">
          <i :style="{ color: selectedTheme.accent }" class="fas fa-check-circle text-xl"></i>
          <span class="font-medium">
            主题色已保存！
          </span>
        </div>
      </transition>
      <transition name="fade">
        <div
          :style="{ background: selectedTheme.cardBg, color: selectedTheme.cardText, borderColor: selectedTheme.accent }"
          class="fixed top-20 right-8 border shadow-lg rounded-lg px-6 py-3 flex items-center space-x-3 z-50"
          v-if="showReset">
          <i :style="{ color: selectedTheme.accent }" class="fas fa-undo text-xl"></i>
          <span class="font-medium">
            已恢复默认主题！
          </span>
        </div>
      </transition>
    </div>
  </AppPage>
</template>


<style>
.theme-preview {
  transition: background 0.3s, color 0.3s;
}

.color-radio:checked+.color-label {
  border-width: 3px;
  border-color: #FFD700;
  box-shadow: 0 0 0 2px #FFD700;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.btn {
  transition: transform 0.15s, box-shadow 0.15s;
}

.btn:active {
  transform: scale(0.97);
}
</style>
