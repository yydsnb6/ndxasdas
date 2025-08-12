import { defineStore } from "pinia"
import { ref } from "vue"
import type { IOutHandCard, PokerRoomConfig } from "@/utils/interface"
import api from "@/api/api"

export const useRecordStore = defineStore('record', () => {

  const roomList = ref<PokerRoomConfig[]>([])

  const getRoomList = async () => {
    const { data } = await api.get_room_list(0)
    roomList.value = data.room_list
  }


  const handList = ref<IOutHandCard[]>([
    {
      cards: [],
      opt_item: 0,
      seat_type: 0,
      username: "",
      public_card: [],
      bet_amount: "",
      win_amount: "",
      is_win: false,
      bet_all_amount: "",
      card_type: 0
    }
  ])

  const get_hand_card_list = async () => {
    handList.value = []
    const { data } = await api.get_hand_card_list()
    handList.value = data
  }


  const bannerList = ref([])


  const getBanner = async () => {
    let { data } = await api.get_banner_list()
    bannerList.value = data
  }

  return {
    handList,
    bannerList,
    roomList,
    getRoomList,
    getBanner,
    get_hand_card_list
  }
})
