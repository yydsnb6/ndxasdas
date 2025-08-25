<script setup lang="ts">
import { useRoomStore } from '@/stores/room';
import bus from '@/utils/bus';
import { createTimeline, utils } from 'animejs';
import { onMounted, onUnmounted } from 'vue';
import Poker from './Poker.vue';

import WinBg from './WinBg.vue'

const roomStore = useRoomStore()

onMounted(() => {
  bus.on('EventFlyPublic', flyPublicPoker)
  bus.on('clearTable', clearTable)

  flyAllPublicPoker()

  // setTimeout(() => {
  //   roomStore.sceneMsg.public_card = [102, 103, 104, 0, 0,]
  //   flyPublicPoker()
  // }, 2000)

  // setTimeout(() => {
  //   roomStore.sceneMsg.public_card = [102, 103, 104, 105, 0]
  //   flyPublicPoker()
  // }, 8000)

  // setTimeout(() => {
  //   roomStore.sceneMsg.public_card = [102, 103, 104, 105, 106]
  //   flyPublicPoker()
  // }, 10000)

  // setTimeout(()=>{
  //   clearTable()
  // },12000)


})

onUnmounted(() => {
  bus.off('EventFlyPublic')
  bus.off('clearTable')

})


const flyAllPublicPoker = () => {
  let public_card = ['.ppoker0', '.ppoker1', '.ppoker2', '.ppoker3', '.ppoker4',]
  let flyNum = 0
  roomStore.sceneMsg!.public_card.forEach((item) => {
    if (item == 0) {
      flyNum++
    }
  })
  // 飞第5张
  if (flyNum == 0) {
    console.log("飞第5张");
    let public_card = ['.ppoker0', '.ppoker1', '.ppoker2', '.ppoker3', '.ppoker4',]

    createTimeline({
      defaults: { duration: 500, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[4], {
        bottom: {
          to: '44%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '18%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '1'
        },

        rotate: {
          to: '1turn', // From 0turn to .75turn
          ease: 'outCubic'
        },
      })

    for (let index = 0; index < 3; index++) {

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[0], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '66%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
        .add(public_card[1], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '55%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
        .add(public_card[2], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '44%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
    }
    createTimeline({
      defaults: { duration: 500, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[3], {
        bottom: {
          to: '44%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '33%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '1'
        },

        rotate: {
          to: '1turn', // From 0turn to .75turn
          ease: 'outCubic'
        },
      })
  }
  // 飞第4张
  if (flyNum == 1) {
    console.log("飞第4张");

    createTimeline({
      defaults: { duration: 500, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[3], {
        bottom: {
          to: '44%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '31%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '1'
        },

        rotate: {
          to: '1turn', // From 0turn to .75turn
          ease: 'outCubic'
        },
      })
    for (let index = 0; index < 3; index++) {

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[0], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '66%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
        .add(public_card[1], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '55%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
        .add(public_card[2], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '44%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
    }
  }
  // 飞前3张
  if (flyNum == 2) {
    console.log('飞前3张');


    for (let index = 0; index < 3; index++) {

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[0], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '70%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        });

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[1], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '57%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        });

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[2], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '44%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          rotate: {
            to: '1turn', // From 0turn to .75turn
            ease: 'outCubic'
          },
        })
    }
  }
}

const flyPublicPoker = () => {
  let public_card = ['.ppoker0', '.ppoker1', '.ppoker2', '.ppoker3', '.ppoker4',]
  let flyNum = 0
  roomStore.sceneMsg!.public_card.forEach((item) => {
    if (item == 0) {
      flyNum++
    }
  })
  // 飞第5张
  if (flyNum == 0) {
    console.log("飞第5张");
    let public_card = ['.ppoker0', '.ppoker1', '.ppoker2', '.ppoker3', '.ppoker4',]

    createTimeline({
      defaults: { duration: 500, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[4], {
        bottom: {
          to: '44%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '18%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '1'
        },

        // rotate: {
        //   to: '1turn', // From 0turn to .75turn
        //   ease: 'outCubic'
        // },
      })
  }
  // 飞第4张
  if (flyNum == 1) {
    console.log("飞第4张");

    createTimeline({
      defaults: { duration: 500, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[3], {
        bottom: {
          to: '44%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '31%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '1'
        },

        // rotate: {
        //   to: '1turn', // From 0turn to .75turn
        //   ease: 'outCubic'
        // },
      })
  }
  // 飞前3张
  if (flyNum == 2) {
    console.log('飞前3张');


    for (let index = 0; index < 3; index++) {

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[0], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '70%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          // rotate: {
          //   to: '1turn', // From 0turn to .75turn
          //   ease: 'outCubic'
          // },
        });

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[1], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '57%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          // rotate: {
          //   to: '1turn', // From 0turn to .75turn
          //   ease: 'outCubic'
          // },
        });

      createTimeline({
        defaults: { duration: 500, delay: 0 },
        loop: 0,
        onComplete: () => { }
      })
        .add(public_card[2], {
          bottom: {
            to: '44%', // From 0px to 16rem
            ease: 'outCubic',
          },
          right: {
            to: '44%', // 66 -0   55  44  33 22
            ease: 'outCubic',
          },
          opacity: {
            to: '1'
          },

          // rotate: {
          //   to: '1turn', // From 0turn to .75turn
          //   ease: 'outCubic'
          // },
        })
    }
  }
}


const clearTable = () => {
  let public_card = ['.ppoker0', '.ppoker1', '.ppoker2', '.ppoker3', '.ppoker4',]
  for (let index = 0; index < public_card.length; index++) {
    createTimeline({
      defaults: { duration: 1000, delay: 0 },
      loop: 0,
      onComplete: () => { }
    })
      .add(public_card[index], {
        bottom: {
          to: '93%', // From 0px to 16rem
          ease: 'outCubic',
        },
        right: {
          to: '1%', // From 0px to 16rem
          ease: 'outCubic',
        },
        opacity: {
          to: '0'
        },

        rotate: {
          to: '1turn', // From 0turn to .75turn
          ease: 'outCubic'
        },
      })
  }
}


</script>

<template>
  <div v-for="(waitPoker, index) in 5" :key="waitPoker" :style="'right:' + (18 + index * 13) + '%'"
    class="   absolute bottom-[44%] h-[66px]! w-[47.78px!] ">
    <div class="w-full h-full" :class="`relative`">
      <Poker :no-poker="true" />
    </div>
  </div>


  <!-- ${roomStore.win_card.includes(0) ? 'scale-element' : ''} -->
  <div style="right: 70%;bottom: 44%;opacity: 1; " :class="`ppoker0  `"
    class="  absolute  h-[66px]! w-[47.78px]!">
    <div class="w-full h-full" :class="`relative`">
      <Poker
        :show-win="roomStore.win_card.length >= 5 && roomStore.win_card.includes(roomStore.sceneMsg?.public_card[0])"
        :show-lose="roomStore.win_card.length >= 5 && !roomStore.win_card.includes(roomStore.sceneMsg?.public_card[0])"
        :point="roomStore.sceneMsg?.public_card[0]" v-if="roomStore.sceneMsg?.public_card[0] != 0" />
    </div>
  </div>
  <div style="right: 57%;bottom: 44%;opacity: 1; " :class="`ppoker1  `"
    class="  absolute  h-[66px]! w-[47.78px]!">
    <div class="w-full h-full" :class="`relative`">
      <Poker
        :show-win="roomStore.win_card.length >= 5 && roomStore.win_card.includes(roomStore.sceneMsg?.public_card[1])"
        :show-lose="roomStore.win_card.length >= 5 && !roomStore.win_card.includes(roomStore.sceneMsg?.public_card[1])"
        :point="roomStore.sceneMsg?.public_card[1]" v-if="roomStore.sceneMsg?.public_card[1] != 0" />
    </div>
  </div>
  <div style="right: 44%;bottom: 44%;opacity: 1; " :class="`ppoker2  `"
    class="  absolute  h-[66px]! w-[47.78px]! ">
    <div class="w-full h-full" :class="`relative`">
      <Poker
        :show-win="roomStore.win_card.length >= 5 && roomStore.win_card.includes(roomStore.sceneMsg?.public_card[2])"
        :show-lose="roomStore.win_card.length >= 5 && !roomStore.win_card.includes(roomStore.sceneMsg?.public_card[2])"
        :point="roomStore.sceneMsg?.public_card[2]" v-if="roomStore.sceneMsg?.public_card[2] != 0" />
    </div>
  </div>
  <div style="right: 31%;bottom: 44%;opacity: 1; " :class="`ppoker3  `"
    class="  absolute  h-[66px]! w-[47.78px]!">
    <div class="w-full h-full" :class="`relative`">
      <Poker
        :show-win="roomStore.win_card.length >= 5 && roomStore.win_card.includes(roomStore.sceneMsg?.public_card[3])"
        :show-lose="roomStore.win_card.length >= 5 && !roomStore.win_card.includes(roomStore.sceneMsg?.public_card[3])"
        :point="roomStore.sceneMsg?.public_card[3]" v-if="roomStore.sceneMsg?.public_card[3] != 0" />
    </div>
  </div>
  <div style="right: 18%;bottom: 44%;opacity: 1; " :class="`ppoker4  `"
    class="  absolute  h-[66px]! w-[47.78px]!">
    <div class="w-full h-full" :class="`relative`">
      <Poker
        :show-win="roomStore.win_card.length >= 5 && roomStore.win_card.includes(roomStore.sceneMsg?.public_card[4])"
        :show-lose="roomStore.win_card.length >= 5 && !roomStore.win_card.includes(roomStore.sceneMsg?.public_card[4])"
        :point="roomStore.sceneMsg?.public_card[4]" v-if="roomStore.sceneMsg?.public_card[4] != 0" />
    </div>
  </div>
</template>


<style lang="css" scoped>
@keyframes continuousScale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.2);
  }
}

.scale-element {
  animation: continuousScale 1.5s ease infinite alternate;
  /* 交替播放 */
}
</style>
