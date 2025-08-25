import { defineStore } from "pinia"
import { ref } from "vue"
import { EPlayerStatus, IOptItem, type IUserInfo } from "@/utils/interface"
import api from "@/api/api"
import LocalUtil from "@/utils/LocalUtil"
import { useSocketStore } from "./mysocket"
import { useRoomStore } from "./room"
import { showLoadingToast } from "vant"
import { useRecordStore } from "./record"

export const useUserStore = defineStore('user', () => {
  const token = ref(LocalUtil.stringForKey('token'))
  const userInfo = ref<IUserInfo>({
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
    status: undefined,
    is_open_hand_card: false,
    hand_card_size: 0,
    opt_item: [],
    hand_cards: [],
    action: undefined,
    total_bet_amount: "",
    user_id: 0,
    total_bet_number: 0,
    total_game_number: 0,
    total_show_number: 0,
    total_win_number: 0,
    is_auto_buy: false,
    auto_buy_amount: 0,
    id: 0
  })
  const tgid = ref<number>(Number(LocalUtil.stringForKey('tgid', '-1')))
  const socketStore = useSocketStore()
  const roomStore = useRoomStore()
  const recoredStore = useRecordStore()
  const login = async (req_data: { first_name: string; head_url: string; last_name: string; tgid: number; user_name: string, agent_id?: number }) => {
    showLoading.value = true
    const { data } = await api.login(req_data)
    showLoading.value = false

    token.value = data.token
    LocalUtil.setString(data.token, 'token')
    userInfo.value = data.user_info
    console.log("登录结果", data);
    tgid.value = data.user_info.tgid
    LocalUtil.setString(data.user_info.tgid, 'tgid')
    recoredStore.getBanner()

  }

  const getUserInfo = async (inGame: boolean = false) => {

    if (token.value) {
      if (inGame) {
        roomStore.initRoomSceneMsg()
      }
      showLoading.value = true
      loadingText.value = '正在加入房间。。。'
      const { data } = await api.get_user_info()

      userInfo.value = data
      if (inGame) {
        // if (!userInfo.value.is_auto_buy) {
        //   roomStore.showBuyEnter = true
        // }
        setTimeout(() => {
          socketStore.init()
        }, 2000);
      }
    }
  }

  const balanceLoading = ref(false)
  const update_balance = async () => {
   balanceLoading.value = true
    const { data } = await api.update_balance()
    balanceLoading.value = false
    userInfo.value.balance = data.balance
  }


  const customer_url = ref('')
  const get_customer_url = async () => {
    const { data } = await api.get_customer_url()
    customer_url.value = data
  }

  const loadingText = ref('登录中。。。')
  const showLoading = ref(false)

  return {balanceLoading, token, userInfo, tgid, customer_url, loadingText, showLoading, get_customer_url, login, getUserInfo, update_balance }
})
