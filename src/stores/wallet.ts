import { defineStore } from "pinia"
import { ref } from "vue"
import type { ITransferUser, IWalletInfo, IWalletOrder } from "@/utils/interface"
import api from "@/api/api"

export const useWalletStore = defineStore('wallet', () => {

  const walletInfo = ref<IWalletInfo>()
  const withdrawInfo = ref<{
    min_withdrawal:number,
    withdrawal_rate:number
  }>({
    min_withdrawal: 0,
    withdrawal_rate: 0
  })
  const transferUser = ref<ITransferUser>({
    min_transfer: 0,
    rates: 0,
    user_info: {
      balance: 0,
      first_name: "",
      head_url: "",
      last_name: "",
      room_id: "",
      tgid: 0,
      user_id: 0,
      user_name: ""
    }
  })

  const walletOrderList = ref<IWalletOrder[]>([])

  const getWallet = async () => {
    const { data } = await api.get_wallet()
    walletInfo.value = data.room_list
  }
  const getWithdrawalConf = async () => {
    const { data } = await api.get_withdrawal_conf()
    withdrawInfo.value = data
  }


  const getOrderRecords = async (order_type:number) => {
    const { data } = await api.get_order_records(order_type)
    walletOrderList.value = data.order_list
  }




  return {
    transferUser,
    walletInfo,
    withdrawInfo,
    walletOrderList,
    getWallet,
    getWithdrawalConf,
    getOrderRecords
  }
})
