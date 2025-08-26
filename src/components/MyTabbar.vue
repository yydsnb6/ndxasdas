<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const myMenu = ref();


const routerPath = ['/home', '/wallet', '/agent', 'me']
const router = useRouter()
function clickItem(item: HTMLElement, index: number) {
  myMenu.value.style.removeProperty("--timeOut");
  if (activeItem == item) return;
  if (activeItem) {
    activeItem.classList.remove("active");
  }
  item.classList.add("active");
  activeItem = item;
  offsetmyMenuBorder(activeItem, myMenuBorder);
  router.replace(routerPath[index])
}

function offsetmyMenuBorder(element: HTMLElement, myMenuBorder: HTMLElement) {
  if (myMenu.value) {
    const offsetActiveItem = element.getBoundingClientRect();
    const left = Math.floor(offsetActiveItem.left - myMenu.value.offsetLeft - (myMenuBorder.offsetWidth - offsetActiveItem.width) / 2) + "px";
    myMenuBorder.style.transform = `translate3d(${left}, 0 , 0)`;
  }
}


let myMenuItems: HTMLElement[] = [];
let myMenuBorder: HTMLElement
let activeItem: HTMLElement;
const route = useRoute()
let timer: any = null

const checkPath = () => {
  console.log(route.path);

  setTimeout(() => {
    if (route.path == '/home' || route.path == '/wallet' || route.path == '/agent' || route.path == '/me') {
      let index = 0
      let item
      switch (route.path) {
        case '/home':
          index = 0
          item = myMenuItems[0];
          break;
        case '/wallet':
          index = 1

          item = myMenuItems[1];
          break;
        case '/agent':
          index = 2

          item = myMenuItems[2];
          break;
        case '/me':
          index = 3

          item = myMenuItems[3];
          break;

        default:
          item = myMenuItems[0];
          break;
      }

      myMenu.value && myMenu.value.style.removeProperty("--timeOut");
      if (activeItem == item) return;
      if (activeItem) {
        activeItem.classList.remove("active");
      }
      item.classList.add("active");
      activeItem = item;
      offsetmyMenuBorder(activeItem, myMenuBorder);
    } else {
      clearInterval(timer)
    }
  }, 100)
}

watch(
  () => route.path, // 监听 seat_id 变化
  (newPath) => {
    console.log('newPath:', newPath);
    checkPath()
  },
  { immediate: true } // 初始挂载时立即执行
);


onMounted(() => {
  myMenuItems = myMenu.value.querySelectorAll(".myMenu__item")
  myMenuBorder = myMenu.value.querySelector(".myMenu__border");
  checkPath()
  // timer = setInterval(checkPath, 100)
  addLis()
})

const addLis = () => {
  myMenuItems.forEach((item: HTMLElement, index: number) => {
    item.addEventListener("click", () => clickItem(item, index));
  })

  window.addEventListener("resize", () => {
    myMenu.value && offsetmyMenuBorder(activeItem, myMenuBorder);
    myMenu.value && myMenu.value.style.setProperty("--timeOut", "none");
  });
}

const removeLis = () => {
  myMenuItems.forEach((item: HTMLElement, index: number) => {
    item.removeEventListener("click", () => clickItem(item, index));
  })

  window.removeEventListener("resize", () => {
    myMenu.value && offsetmyMenuBorder(activeItem, myMenuBorder);
    myMenu.value && myMenu.value.style.setProperty("--timeOut", "none");
  });
}

onUnmounted(() => {
  console.log('销毁了？？？');
  removeLis()
  clearInterval(timer)
})





</script>

<template>
  <menu ref="myMenu" class="myMenu">
    <button class="myMenu__item " style="--bgColorItem: #f4b647;">
      <!-- <svg t="1751902932831" class="icon" viewBox="0 0 1030 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="12082" id="mx_n_1751902932832" width="180" height="180">
        <path
          d="M996.71 441.979L609.434 38.809C585.364 13.779 553.2 0 518.723 0s-66.642 13.778-90.706 38.81L40.74 441.979c-39.962 41.615-34.816 77.583-28.211 92.61 4.705 10.66 20.603 39.962 66.396 39.962h56.765v310.16c0 70.415 50.56 136.719 122.414 136.719h164.859V693.192c0-35.195-5.33-54.8 30.613-54.8h130.293c35.938 0 30.613 19.605 30.613 54.8v328.238H779.35c71.849 0 122.404-66.304 122.404-136.72V574.551h56.77c45.778 0 61.686-29.302 66.397-39.962 6.615-15.022 11.75-50.995-28.212-92.61z"
          fill="#ffffff" p-id="12083"></path>
      </svg> -->
      <i class="icon fas fa-home text-[18px] "></i>
      <p>大厅</p>
    </button>

    <button class="myMenu__item" style="--bgColorItem: #f54888;">
      <!-- <svg t="1751903023678" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
        p-id="13227" id="mx_n_1751903023679" width="180" height="180">
        <path
          d="M908.4 608.2c-31-111.5-97.3-197.6-200.9-256.2-11.9-6.7-24.5-12.3-36.8-18.5 0.1-0.2 0.1-0.5 0.4-0.7l6.3-5.7c21.3-19.7 40.5-42.4 50.5-69.3 4.9-13 6.1-18.7 9.4-30.8 6.3-38.2-0.9-61.4-24.4-80.6-31.8-26.1-67.8-29.1-105.8-13.9-2.6 1.1-4.4 1.8-7-0.6-49-44.7-127.6-45.1-177-1-2.3 2.1-4 2.6-7 1.3-20-8.9-40.9-10.8-62.4-6.5-40.7 8.1-74.4 41.5-68.4 87.2 5.2 39.6 21.1 73.8 48.5 103.4 5.6 6.1 11.6 11.8 17.7 18l-4.5 2.1c-140 61.8-234.6 196.1-245.7 348.8-3.1 42.2-0.5 84 10.5 125.5 17.3 65.2 76.8 114.1 148.1 113.9 168.2-0.4 336.4 0 504.7-0.2 54-0.1 95.6-23.5 125.8-66.1 15.3-21.7 22.5-46.3 26.7-72.1 9.6-59.9 7.6-119.4-8.7-178z m-292.5-96.7l-80.8 80.8h60.1c9.2 0 16.7 7.5 16.7 16.7s-7.5 16.7-16.7 16.7h-65.7l-1.3 1.3v32.2h67c9.2 0 16.7 7.5 16.7 16.7s-7.5 16.7-16.7 16.7h-67v50.3c0 9.2-7.5 16.7-16.7 16.7s-16.7-7.5-16.7-16.7v-50.3h-67c-9.2 0-16.7-7.5-16.7-16.7s7.4-16.7 16.7-16.7h67V627l-1.3-1.3h-65.7c-9.2 0-16.7-7.5-16.7-16.7s7.4-16.7 16.7-16.7h59.9L407 511.7l0.3-0.3c-3.4-3.1-5.5-7.5-5.5-12.2 0-5.9 3.2-11.4 8.3-14.3 5.1-3 11.4-3 16.5 0 1.5 0.9 2.8 2 3.9 3.3l0.2-0.2 80.8 80.7 80.9-80.9 0.3 0.3c1-1 2.2-2 3.5-2.7 5.1-2.9 11.4-2.9 16.5 0 5.1 3 8.3 8.4 8.3 14.3-0.1 4.6-2 8.8-5.1 11.8z"
          fill="#ffffff" p-id="13228"></path>
      </svg> -->
      <i class="icon fas fa-wallet text-[18px] "></i>

      <p>钱包</p>
    </button>

    <button class="myMenu__item" style="--bgColorItem: #4343f5;">
      <!-- <svg width="180" height="180" t="1751902847894" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="8255">
        <path
          d="M512 102.4a179.2 179.2 0 1 1-179.2 179.2A179.2 179.2 0 0 1 512 102.4m0-102.4a281.6 281.6 0 1 0 281.6 281.6A281.6 281.6 0 0 0 512 0"
          fill="#ffffff" p-id="8256"></path>
        <path
          d="M153.6 1024H51.2a51.2 51.2 0 0 1-51.2-51.2v-102.4a51.2 51.2 0 0 1 51.2-51.2h102.4a51.2 51.2 0 0 1 51.2 51.2v102.4a51.2 51.2 0 0 1-51.2 51.2"
          fill="#ffffff" p-id="8257"></path>
        <path
          d="M972.8 1024h-102.4a51.2 51.2 0 0 1-51.2-51.2v-102.4a51.2 51.2 0 0 1 51.2-51.2h102.4a51.2 51.2 0 0 1 51.2 51.2v102.4a51.2 51.2 0 0 1-51.2 51.2"
          fill="#ffffff" p-id="8258"></path>
        <path
          d="M563.2 972.8H460.8a51.2 51.2 0 0 1-51.2-51.2v-102.4a51.2 51.2 0 0 1 51.2-51.2h102.4a51.2 51.2 0 0 1 51.2 51.2v102.4a51.2 51.2 0 0 1-51.2 51.2"
          fill="#ffffff" p-id="8259"></path>
        <path
          d="M512 610.2016a363.8784 363.8784 0 0 1 362.4448 337.92h102.4a465.5104 465.5104 0 0 0-929.6896 0h102.4a363.8784 363.8784 0 0 1 362.4448-337.92"
          fill="#ffffff" p-id="8260"></path>
        <path d="M460.8 512h102.4v307.2H460.8z" fill="#ffffff" p-id="8261"></path>
      </svg> -->
      <i class="icon fas fa-hand-holding-usd text-[18px] "></i>

      <p>代理</p>

    </button>

    <button class="myMenu__item" style="--bgColorItem: #e0b115;">
      <!-- <svg class="icon" viewBox="0 0 24 24">
        <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1
          C3.9,4.4,4.4,3.9,5.1,3.9z" />
        <path d="M4.2,9.3h15.6" />
        <path d="M9.1,9.5v10.3" />
      </svg> -->
      <!-- <svg width="180" height="180" t="1751902603805" class="icon" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg" p-id="6757" id="mx_n_1751902603806">
        <path
          d="M682.225853 470.765979c8.511293-8.511293 21.278232-17.022585 29.789524-29.789524 51.067756-59.579048 72.345987-136.180682 59.579048-217.037962-17.022585-114.902451-106.391158-204.271023-221.293608-221.293609-93.624219-12.766939-182.992792 21.278232-242.57184 89.368573-46.812109 63.834695-72.345987 140.436328-59.579049 217.037962 12.766939 63.834695 42.556463 119.158097 93.624219 161.71456-148.947621 51.067756-255.338779 191.504084-255.338779 353.218644v93.624219C86.435368 977.187891 133.247478 1024 192.826526 1024h638.346948c59.579048 0 106.391158-46.812109 106.391158-106.391158v-93.624219c0-161.71456-106.391158-302.150888-255.338779-353.218644zM375.819318 151.592505c34.045171-42.556463 85.112926-63.834695 136.180682-63.834694 8.511293 0 17.022585 0 29.789524 4.255646 76.601634 12.766939 136.180682 76.601634 148.947621 148.947621 8.511293 55.323402-8.511293 106.391158-42.556463 144.691975-42.556463 46.812109-102.135512 72.345987-165.970206 59.579048-76.601634-12.766939-136.180682-76.601634-148.947621-148.947621-8.511293-51.067756 8.511293-106.391158 42.556463-144.691975z m476.632387 766.016337c0 12.766939-8.511293 21.278232-21.278231 21.278232h-638.346948c-12.766939 0-21.278232-8.511293-21.278231-21.278232v-93.624219c0-161.71456 131.925036-289.383949 289.383949-289.383949h97.879865c161.71456 0 289.383949 131.925036 289.38395 289.383949v93.624219z"
          fill="#ffffff" p-id="6758"></path>
      </svg> -->
      <i class="icon fas fa-user text-[18px] "></i>

      <p>我的</p>

    </button>

    <!-- <button class="myMenu__item" style="--bgColorItem:#65ddb7;">
      <svg class="icon" viewBox="0 0 24 24">
        <path d="M5.1,3.9h13.9c0.6,0,1.2,0.5,1.2,1.2v13.9c0,0.6-0.5,1.2-1.2,1.2H5.1c-0.6,0-1.2-0.5-1.2-1.2V5.1
          C3.9,4.4,4.4,3.9,5.1,3.9z" />
        <path d="M5.5,20l9.9-9.9l4.7,4.7" />
        <path d="M10.4,8.8c0,0.9-0.7,1.6-1.6,1.6c-0.9,0-1.6-0.7-1.6-1.6C7.3,8,8,7.3,8.9,7.3C9.7,7.3,10.4,8,10.4,8.8z" />
      </svg>
    </button> -->

    <div class="myMenu__border"></div>

  </menu>

  <div class="svg-container">
    <svg viewBox="0 0 202.9 45.5">
      <clipPath id="myMenu" clipPathUnits="objectBoundingBox" transform="scale(0.0049285362247413 0.021978021978022)">
        <path d="M6.7,45.5c5.7,0.1,14.1-0.4,23.3-4c5.7-2.3,9.9-5,18.1-10.5c10.7-7.1,11.8-9.2,20.6-14.3c5-2.9,9.2-5.2,15.2-7
          c7.1-2.1,13.3-2.3,17.6-2.1c4.2-0.2,10.5,0.1,17.6,2.1c6.1,1.8,10.2,4.1,15.2,7c8.8,5,9.9,7.1,20.6,14.3c8.3,5.5,12.4,8.2,18.1,10.5
          c9.2,3.6,17.6,4.2,23.3,4H6.7z" />
      </clipPath>
    </svg>
  </div>
</template>


<style scoped>
html {}

.myMenu {
  padding-left: 0px !important;
  margin: 0;
  display: flex;
  /* Works well with 100% width  */
  width: 100%;
  font-size: 1.5em;
  /* padding: 0 2.85em; */
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: var(--my-cardBg);
  height: 52px;
}

.myMenu__border {

  left: 0;
  bottom: 99%;
  width: 10.9em;
  height: 2em;
  position: absolute;
  clip-path: url(#myMenu);
  will-change: transform;
  background-color: var(--my-cardBg);
  ;
  transition: transform var(--timeOut, .7s);

}

.myMenu__item {

  all: unset;
  flex-grow: 1;
  z-index: 100;
  display: flex;
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  align-items: center;
  will-change: transform;
  justify-content: center;
  padding: 0.55em 0 0.85em;
  transition: transform var(--timeOut, .7s);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.myMenu__item::before {

  content: "";
  z-index: -1;
  width: 4.2em;
  height: 4.2em;
  border-radius: 50%;
  position: absolute;
  transform: scale(0);
  transition: background-color .7s, transform .7s;

}

.myMenu__item p {
  font-weight: bold;
  color: var(--my-text);
  font-size: 11px;
}


.myMenu__item.active {
  transform: translate3d(0, -.3em, 0);
}

.myMenu__item.active::before {

  transform: scale(1);
  background: var(--my-primary);
}

.icon {

  /* width: 2em;
  height: 2em; */

  /* stroke: white;
  fill: transparent; */
  /* stroke-width: 1pt;
  stroke-miterlimit: 10;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 400; */
  color: white;
}

.myMenu__item.active .icon {

  animation: strok 1.5s reverse;
  color: var(--my-accent);

}

@keyframes strok {

  100% {

    stroke-dashoffset: 400;

  }

}



.svg-container {

  width: 0;
  height: 0;
}


@media screen and (max-width: 50em) {
  .myMenu {
    font-size: .8em;
  }
}
</style>
