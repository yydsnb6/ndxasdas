<script setup lang="ts">
import api from '@/api/api';
import AppPage from '@/components/AppPage.vue';
import type { ICreateRoom } from '@/utils/interface';
import { showNotify } from 'vant';
import { onMounted, ref, toRaw, toRefs, unref } from 'vue';
import { useRouter } from 'vue-router';
const onClickLeft = () => history.back();

const createRoomData = ref<ICreateRoom>({
  action_second: 15,
  auto_start_num: 2,
  big_blind: 0.02,
  end_time: 480,
  insurance_amount: 0,
  is_open_insurance: false,
  is_limit_gps: true,
  is_limit_ip: true,
  is_push_group: true,
  little_blind: 0.01,
  look_num: 100,
  max_buy: 20,
  min_buy: 50,
  push_group_ids: [],
  room_name: '越越德州'+(Math.random()*10000).toFixed(0),
  room_type: 1,
  seat_num: 8,
  straddle_blind: 0,
})

// const range = ref([20, 50])

const buyMin = ref(20)
const buyMax = ref(50)

const mangSetp = ref(0)

const mangList = [
  0.01,
  0.02,
  0.05,
  0.1,
  0.2,
  0.3,
  0.4,
  0.5,
  1,
  2,
  3,
  4,
  5,
  10,
  15,
  25,
  50,
  100,
  150,
  200,
  250,
  500,
]



const openLong = ref(true)

const openstraddle_blind = ref(false)

const initData = () => {
  openstraddle_blind.value = false
  openLong.value = true
  createRoomData.value.action_second = 15
  createRoomData.value.auto_start_num = 2
  createRoomData.value.big_blind = 0.02
  createRoomData.value.end_time = 480
  createRoomData.value.insurance_amount = 0
  createRoomData.value.is_limit_gps = true
  createRoomData.value.is_limit_ip = true
  createRoomData.value.is_push_group = true
  createRoomData.value.is_open_insurance = false
  createRoomData.value.little_blind = 0.01
  createRoomData.value.look_num = 100
  createRoomData.value.max_buy = 20
  createRoomData.value.min_buy = 50
  createRoomData.value.push_group_ids = []
  createRoomData.value.room_name = '越越德州'
  createRoomData.value.room_type = 1
  createRoomData.value.seat_num = 8
  createRoomData.value.straddle_blind = 0
}

const checked = ref([]);
const tg_group_list = ref<{
  group_id: number,
  group_name: string
}[]>([])

const getTgGroup = async () => {
  const { data } = await api.get_tg_group()
  tg_group_list.value = data.tg_group_list
}

const router = useRouter()
const creatRoom = () => {
  if (createRoomData.value.room_name == "") {
    showNotify({
      message:'请输入房间名称'
    })
    return
  }
  if (openstraddle_blind.value) {
    createRoomData.value.straddle_blind = 2 * mangList[mangSetp.value] * 2
  } else {
    createRoomData.value.straddle_blind = 0

  }



  checked.value.forEach((v) => {
    console.log(v);
    createRoomData.value.push_group_ids.push(v)
  })
  createRoomData.value.little_blind = mangList[mangSetp.value]
  createRoomData.value.big_blind = 2 * mangList[mangSetp.value]
  createRoomData.value.min_buy = buyMin.value
  createRoomData.value.max_buy = buyMax.value

  api.creatRoom(createRoomData.value).then((res: any) => {
    console.log(res);
    if (res.code == 200) {
      showNotify({
        type: 'success',
        message: '创建房间成功'
      })
      router.push({
        path: '/game',
        query: {
          roomId: res.data.room_id
        }
      })
    } else {

    }
  }).catch(() => {

  }).finally(() => {
  })
}

onMounted(() => {
  getTgGroup()
})

</script>

<template>
  <AppPage>
    <van-nav-bar :border="false" style="background: var(--my-primary);" class=" h-[50px]" title="创建房间" left-text=""
      left-arrow @click-left="onClickLeft">

    </van-nav-bar>


    <div class="flex flex-col w-full  h-[calc(100vh-50px-45px)]! items-center pt-2 overflow-y-scroll ">

      <van-divider dashed class="w-[90%]"
        :style="{ color: 'var(--my-text)', borderColor: 'var(--my-text)', padding: '0 0px', margin: '0px' }">筹码设置</van-divider>

      <div class="flex flex-col w-full ">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px]  font-700">
          <p class=" text-[var(--my-cardSubText)]">房间名称 </p>

        </div>
        <div class="w-full px-[10%] flex items-center justify-between my-1">

          <van-field required  class="bg-red! bg-op-5! p-0! text-amber! py-1" label-width="40" :border="false"
            v-model="createRoomData.room_name" label="" placeholder="请输入房间名称" />
        </div>
      </div>

      <div class="flex flex-col w-full px-5 mb-1">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <p class=" text-[var(--my-cardSubText)] font-700 text-[14px] ml-5">额外盲注{{ 2 * 2 * mangList[mangSetp] }}BB
            </p>
          </div>
          <van-switch class=" scale-75" v-model="openstraddle_blind" />
        </div>
      </div>


      <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px] font-700">
          <p class=" text-[var(--my-cardSubText)]">盲注</p>
          <p class="text-[var(--my-text)]">{{ mangList[mangSetp] }}/{{ 2 * mangList[mangSetp] }}</p>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between">
          <v-slider v-model="mangSetp" :max="mangList.length - 1" :min="0" :step="1" class="h-[30px]"></v-slider>
        </div>
      </div>

      <div class="flex flex-col w-full ">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px]  font-700">
          <p class=" text-[var(--my-cardSubText)]">买入 </p>
          <div class="flex flex-row">
            <img src="../../assets/imgae/m_icon.png" class="w-[20px] h-[20px]" alt="" srcset="">
            <p class="text-[var(--my-text)]">{{ buyMin }}BB~{{ buyMax }}BB</p>
          </div>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between my-1">

          <van-field type="number" :min="0" class="bg-red! bg-op-5! p-0! text-amber!" label-width="40" :border="false"
            v-model="buyMin" label="最小" placeholder="请输入金额" />
          <van-field type="number" :min="0" class="bg-red! bg-op-5! p-0! text-amber!" label-width="40" :border="false"
            v-model="buyMax" label="最大" placeholder="请输入金额" />
          <!-- <v-range-slider v-model="range" strict :max="1000" :min="1" :step="50" class="h-[30px]"></v-range-slider> -->
        </div>
      </div>

      <van-divider dashed class="w-[90%]"
        :style="{ color: 'var(--my-text)', borderColor: 'var(--my-text)', padding: '0 0px', margin: '0px' }">游戏设置</van-divider>

      <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px] font-700">
          <p class=" text-[var(--my-cardSubText)]">座位数</p>
          <p class="text-[var(--my-text)]">{{ createRoomData.seat_num }}</p>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between">
          <v-slider v-model="createRoomData.seat_num" :max="8" :min="2" :step="1" class="h-[30px]"></v-slider>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px] font-700">
          <p class=" text-[var(--my-cardSubText)]">自动开始</p>
          <p class="text-[var(--my-text)]">{{ createRoomData.auto_start_num }}人</p>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between">
          <v-slider v-model="createRoomData.auto_start_num" :max="8" :min="2" :step="1" class="h-[30px]"></v-slider>
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px] font-700">
          <p class=" text-[var(--my-cardSubText)]">行动时间</p>
          <p class="text-[var(--my-text)]">{{ createRoomData.action_second }}秒</p>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between">
          <v-slider v-model="createRoomData.action_second" :max="30" :min="15" :step="5" class="h-[30px]"></v-slider>
        </div>
      </div>

      <!-- <div class="flex flex-col w-full ">
        <div class="flex flex-row justify-between w-full px-[10%] text-[14px] font-700">
          <p class=" text-[var(--my-cardSubText)]">牌局时间</p>
          <p class="text-[var(--my-text)]">{{ createRoomData.end_time }}分钟</p>
        </div>
        <div class="w-full px-[10%] flex items-center justify-between">
          <v-slider v-model="createRoomData.end_time" :max="480" :min="5" :step="5" class="h-[30px]"></v-slider>
        </div>
      </div> -->
      <div class="flex flex-col w-full px-10 mb-1">
        <van-radio-group v-model="createRoomData.room_type" direction="horizontal">
          <van-radio shape="square" :name="1"><span class="text-[var(--my-text)]">长牌</span></van-radio>
          <van-radio shape="square" :name="2"><span class="text-[var(--my-text)]">短牌</span></van-radio>
        </van-radio-group>

      </div>
      <van-divider dashed class="w-[90%]"
        :style="{ color: 'var(--my-text)', borderColor: 'var(--my-text)', padding: '0 0px', margin: '0px' }">安全设置</van-divider>



      <div class="flex flex-col w-full px-5 mb-1">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <p class=" text-[var(--my-cardSubText)] font-700 text-[14px] ml-5">是否开启保险</p>
            <van-icon name="question" class="text-[var(--my-accent)]" />
          </div>
          <van-switch class=" scale-75" v-model="createRoomData.is_open_insurance" />
        </div>
      </div>


      <div class="flex flex-col w-full px-5 mb-1">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <p class=" text-[var(--my-cardSubText)] font-700 text-[14px] ml-5">推送至群组</p>

            <van-icon name="question" class="text-[var(--my-accent)]" />

          </div>
          <van-switch class=" scale-75" v-model="createRoomData.is_push_group" />

        </div>

        <van-checkbox-group v-model="checked" shape="square" v-if="createRoomData.is_push_group">
          <van-checkbox class="ml-5 my-1" v-for="item in tg_group_list" :name="item.group_id">
            <span class=" font-bold text-[var(--my-text)]">{{ item.group_name }}</span>
          </van-checkbox>
        </van-checkbox-group>
      </div>

      <div class="flex flex-col w-full px-5 mb-1">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <p class=" text-[var(--my-cardSubText)] font-700 text-[14px] ml-5">GPS限制</p>
            <van-icon name="question" class="text-[var(--my-accent)]" />
          </div>
          <van-switch class=" scale-75" v-model="createRoomData.is_limit_gps" />
        </div>
      </div>


      <div class="flex flex-col w-full px-5 mb-1">
        <div class="flex flex-row justify-between">
          <div class="flex flex-row items-center">
            <p class=" text-[var(--my-cardSubText)] font-700 text-[14px] ml-5">IP限制</p>

            <van-icon name="question" class="text-[var(--my-accent)]" />
          </div>
          <van-switch class=" scale-75" v-model="createRoomData.is_limit_ip" />

        </div>
      </div>
    </div>
    <van-divider
      :style="{ color: 'rgba(0,0,0,0.3)', borderColor: 'rgba(0,0,0,0.3)', padding: '0 0px', margin: '0px' }" />
    <div class="fixed flex flex-row  justify-evenly z-9 bottom-0 w-full">
      <v-btn @click="initData" class="my-2  "
        style="background-image: linear-gradient(60deg, #29323c 0%, #485563 100%);" height="35" min-width="100"
        width="40%" color="#589374">
        <p class="text-[18px] font-bold">重置</p>
      </v-btn>

      <v-btn @click="creatRoom" class="my-2 bg-[var(--my-accent)]!" height="35" min-width="100" width="40%">
        <p class="text-[18px] font-bold text-[var(--my-buttonPrimaryText)]">创建房间</p>
      </v-btn>
    </div>
  </AppPage>
</template>

<style lang="css" scoped>
:deep(.van-field__control) {
  color: var(--my-text) !important;
  font-size: 16px !important;
  font-weight: bolder;

}
</style>
