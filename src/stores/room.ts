import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { type BlindRecord, type IBetConfig, type IConfig, type IHandCard, type ISceneMsg, type ISeatInfo, type IUserInfo, type IWinSeat } from "@/utils/interface"
import { useUserStore } from "./user"
import LocalUtil from "@/utils/LocalUtil"
import api from "@/api/api"

export const useRoomStore = defineStore('room', () => {
  const sceneMsg = ref<ISceneMsg>({
    room_name: "",
    room_id: "",
    room_type: -1,
    room_status: -1,
    little_blind: "",
    big_blind: "",
    straddle_blind: "",
    button: -1,
    sb: -1,
    bb: -1,
    sbb: -1,
    min_buy: 0,
    max_buy: 0,
    is_push_group: false,
    seat_num: -1,
    pot_amount: "",
    seats: [],
    action_seat_id: 0,
    action_second: 0,
    public_card: [0, 0, 0, 0, 0],
    self_seat_id: -1,
    max_bet_amount: 0,
    end_time: 0,
  })
  const userStore = useUserStore()
  const roomId = ref<string>(LocalUtil.stringForKey('roomId'))
  const roomUserInfo = ref<IUserInfo>({
    tgid: 0,
    user_name: "",
    first_name: "",
    last_name: "",
    head_url: "",
    balance: 0,
    bet_amount: "",
    is_btn: false,
    is_sb: false,
    is_bb: false,
    is_sbb: false,
    status: null,
    is_open_hand_card: false,
    hand_card_size: 0,
    opt_item: [],
    hand_cards: [0, 0],
    remain_balance:"0"
  })
  const action_seat_id = ref(-2)
  const action_second = ref(0)
  const opt_items = ref([2, 3, 4, 5, 6])

  const buyWaitTime = ref(0)
  const look_card_amount = ref(0)
  const buySeatIds = ref<number[]>([])
  const winSeats = ref<IWinSeat[]>([])
  const win_card = ref<number[]>([])
  const can_look_card_seat_ids = ref<number[]>([])


  const baoxianSecond = ref(0)
  const baoxianSeatIds = ref<number[]>([])
  const baoxianMaxAmount = ref<number>(0)
  const baoxianMinAmount = ref<number>(0)




  const handRecored = ref<IHandCard[]>([])
  const blindRecored = ref<BlindRecord>()
  const showUserInfo = ref<IUserInfo>()
  const showUser = ref(false)

  const seats = computed(() => {
    let topSeats: ISeatInfo[] = []
    let rightSeats: ISeatInfo[] = []
    let bottomSeats: ISeatInfo[] = []
    let leftSeats: ISeatInfo[] = []

    if (sceneMsg.value?.seats.length == 0) {
      return {
        topSeats: topSeats,
        rightSeats: rightSeats,
        bottomSeats: bottomSeats,
        leftSeats: leftSeats,
      }
    }
    const findSeat = sceneMsg.value!.seats.find(item => {
      if (item.user) {
        return item.user.tgid == userStore.tgid
      }
    })
    if (findSeat) {
      sceneMsg.value!.seats = reorderSeats(sceneMsg.value!.seats, findSeat.seat_id)
    }

    topSeats = []
    rightSeats = []
    bottomSeats = [sceneMsg.value!.seats[0]]
    leftSeats = []


    switch (sceneMsg.value.seat_num) {
      case 2:
        topSeats = [sceneMsg.value!.seats[1]]
        rightSeats = []
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = []
        break;
      case 3:
        topSeats = [sceneMsg.value!.seats[2]]
        rightSeats = []
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[1]]
        break;
      case 4:
        topSeats = [sceneMsg.value!.seats[2]]
        rightSeats = [sceneMsg.value!.seats[3]]
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[1]]
        break;
      case 5:
        topSeats = [sceneMsg.value!.seats[3]]
        rightSeats = [sceneMsg.value!.seats[4]]
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[2], sceneMsg.value!.seats[1]]
        break;
      case 6:
        topSeats = [sceneMsg.value!.seats[3]]
        rightSeats = [sceneMsg.value!.seats[4], sceneMsg.value!.seats[5]]
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[2], sceneMsg.value!.seats[1]]
        break;
      case 7:
        topSeats = [sceneMsg.value!.seats[4]]
        rightSeats = [sceneMsg.value!.seats[5], sceneMsg.value!.seats[6]]
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[3], sceneMsg.value!.seats[2], sceneMsg.value!.seats[1]]
        break;
      case 8:
        topSeats = [sceneMsg.value!.seats[4]]
        rightSeats = [sceneMsg.value!.seats[5], sceneMsg.value!.seats[6], sceneMsg.value!.seats[7]]
        bottomSeats = [sceneMsg.value!.seats[0]]
        leftSeats = [sceneMsg.value!.seats[3], sceneMsg.value!.seats[2], sceneMsg.value!.seats[1]]
        break;
      default:
        break;
    }
    return {
      topSeats: topSeats,
      rightSeats: rightSeats,
      bottomSeats: bottomSeats,
      leftSeats: leftSeats,
    }
  })


  const getShowUserInfo = async (id: number) => {
    const { data } = await api.get_showuser_info(id)
    showUserInfo.value = data
    showUser.value = true
  }

  const setRoomUserInfo = () => {
    const findUser = sceneMsg.value.seats.find((item) => {
      if (item.user) {
        return item.user.tgid == Number(userStore.tgid)
      }
    })
    if (findUser) {
      roomUserInfo.value = findUser.user
      roomUserInfo.value.balance = Number(roomUserInfo.value.balance)
      userStore.userInfo.balance = Number(roomUserInfo.value.remain_balance)
    }
  }


  const reorderSeats = (seats: { seat_id: number; user: IUserInfo }[], startId: number) => {
    // 1. 查找起始座位的索引
    const startIndex = seats.findIndex(seat => seat.seat_id === startId);

    if (startIndex === -1) return seats; // 未找到起始座位时返回原数组

    // 2. 创建两个数组切片并连接
    const firstPart = seats.slice(startIndex);
    const secondPart = seats.slice(0, startIndex);

    return [...firstPart, ...secondPart];
  }

  const configPlay = ref<IConfig>()
  const getConfigPlay = async () => {
    const { data } = await api.get_game_config(1)
    configPlay.value = data
    console.log("玩法", data);

  }
  const configPoker = ref<IConfig>()
  const getConfigPoker = async () => {
    const { data } = await api.get_game_config(2)
    configPoker.value = data
    console.log("牌型", data);

  }
  const configBaoXianDes = ref<IConfig>()
  const getConfigBaoXianDes = async () => {
    const { data } = await api.get_game_config(3)
    configBaoXianDes.value = data
    console.log("说明", data);

  }
  const configBaoXianBet = ref<IConfig>()
  const getConfigBaoXianBet = async () => {
    const { data } = await api.get_game_config(4)
    configBaoXianBet.value = data
    console.log("赔率", data);

  }

  const initRoomSceneMsg = () => {
    look_card_amount.value = 0
    can_look_card_seat_ids.value = []
    showBuyEnter.value = false
    showCheMa.value = false
    showUser.value = false
    sceneMsg.value = {
      end_time: 0,
      room_name: "",
      room_id: "",
      room_type: -1,
      room_status: -1,
      little_blind: "0",
      big_blind: "0",
      straddle_blind: "0",
      button: -1,
      sb: -1,
      bb: -1,
      sbb: -1,
      min_buy: 0,
      max_buy: 0,
      is_push_group: false,
      seat_num: -1,
      pot_amount: '0',
      seats: [],
      action_seat_id: -1,
      action_second: 0,
      public_card: [0, 0, 0, 0, 0],
      self_seat_id: -1,
      max_bet_amount: 0
    }

    roomUserInfo.value = {
      tgid: 0,
      user_name: "",
      first_name: "",
      last_name: "",
      head_url: "",
      balance: 0,
      bet_amount: "",
      is_btn: false,
      is_sb: false,
      is_bb: false,
      is_sbb: false,
      status: null,
      is_open_hand_card: false,
      hand_card_size: 0,
      opt_item: [],
      hand_cards: [0, 0],
      remain_balance:"0"

    }
    baoxianSecond.value = 0
    baoxianMaxAmount.value = 0
    baoxianMinAmount.value = 0
    baoxianSeatIds.value = []
    buyWaitTime.value = 0
    buySeatIds.value = []
    winSeats.value = []
    opt_items.value = []
    action_seat_id.value = -2
    action_second.value = 0
    initWinSeat()
  }

  const initWinSeat = () => {
    winSeats.value = []
    win_card.value = []
    look_card_amount.value = 0
    can_look_card_seat_ids.value = []
  }

  const showBuyEnter = ref(false)
  const showCheMa = ref(false)
  const showBtns = ref(true)

  return {
    showBtns,
    look_card_amount,
    can_look_card_seat_ids,
    baoxianMinAmount,
    baoxianSecond,
    baoxianMaxAmount,
    baoxianSeatIds,
    win_card,
    showBuyEnter,
    showCheMa,
    blindRecored,
    handRecored,
    buyWaitTime,
    buySeatIds,
    sceneMsg,
    roomId,
    seats,
    action_seat_id,
    action_second,
    opt_items,
    roomUserInfo,
    configPlay,
    configBaoXianBet,
    configPoker,
    configBaoXianDes,
    winSeats,
    showUserInfo,
    showUser,
    getShowUserInfo,
    initWinSeat,
    initRoomSceneMsg,
    setRoomUserInfo,
    getConfigPlay,
    getConfigPoker,
    getConfigBaoXianDes,
    getConfigBaoXianBet
  }
})
