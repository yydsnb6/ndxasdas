import { defineStore } from "pinia"
import { ref } from "vue"
import type { PokerRoomConfig } from "@/utils/interface"
import api from "@/api/api"

export const useRecordStore = defineStore('record', () => {

  const roomList = ref<PokerRoomConfig[]>([])

  const getRoomList = async () => {
    const { data } = await api.get_room_list(0)
    roomList.value = data.room_list

  }


  const bannerList = ref([])


  const getBanner = async () => {
    let { data } = await api.get_banner_list()
    bannerList.value = data
  }

  return {
    bannerList,
    roomList,
    getRoomList,
    getBanner
  }
})
