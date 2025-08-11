import type { ICreateRoom } from "@/utils/interface";
import axiosIns from "./interceptors";
const api = {
  /** 登陆*/
  async login(data: {
    "first_name": string,
    "head_url": string,
    "last_name": string,
    "tgid": number,
    "user_name": string
  }) {
    return await axiosIns.post(`/login`, data)
  },


  /** 配置类型 1-玩法说明 2-牌型说明 3-保险说明 4-保险赔率 */
  async get_game_config(conf_type: any,) {
    return await axiosIns.get(`/game/get_game_config`, { params: { conf_type } })
  },

  /** 房间列表 */
  async get_room_list(room_type: any,) {
    return await axiosIns.get(`/game/get_room_list`, { params: { room_type } })
  },



  /** 获取用户信息 */
  async get_user_info() {
    return await axiosIns.get(`/game/get_user_info`)
  },

  /** 获取钱包信息 */
  async get_wallet() {
    return await axiosIns.get(`/game/get_wallet`)
  },
  /** 获取提现配置 */
  async get_withdrawal_conf() {
    return await axiosIns.get(`/game/get_withdrawal_conf`)
  },
  /** 转账用户 */
  async get_transfer_user(user_id: any,) {
    return await axiosIns.get(`/game/get_transfer_user`, { params: { user_id } })
  },
  /** 转账*/
  async transfer(data: {
    "amount": number,
    "user_id": number
  }) {
    return await axiosIns.post(`/game/transfer`, data)
  },
  /** 提现*/
  async withdrawal(data: {
    "address": string,
    "amount": number
  }) {
    return await axiosIns.post(`/game/withdrawal`, data)
  },
  /** 获取充值提现订单 */
  async get_order_records(order_type: any) {
    return await axiosIns.get(`/game/get_order_records`, { params: { order_type } })
  },

  /** 创建房间*/
  async creatRoom(data: ICreateRoom) {
    return await axiosIns.post(`/game/creat_room`, data)
  },
  /** 代理提现 */
  async get_rake_back() {
    return await axiosIns.get(`/game/get_rake_back`)
  },

  /** 获取返佣配置 */
  async agent_rake_back() {
    return await axiosIns.get(`/game/agent_rake_back`)
  },
  /** 获取收入记录 */
  async get_rake_back_record() {
    return await axiosIns.get(`/game/get_rake_back_record`)
  },
  /** 获取下级列表 */
  async get_subord_list(level: number, is_sort: number) {
    return await axiosIns.get(`/game/get_subord_list`, {
      params: {
        level,
        is_sort
      }
    })
  },

  /** 获取Banner */
  async get_banner_list() {
    return await axiosIns.get(`/game/get_banner_list`)
  },



  /** 检查房间是否存在 */
  async in_room(room_id: number) {
    return await axiosIns.get(`/game/in_room`, {
      params: {
        room_id
      }
    })
  },

  /** 获取手牌回顾 */
  async get_hand_card_list() {
    return await axiosIns.get(`/game/get_hand_card_list`)
  },

  /** 获取用户余额 */
  async update_balance() {
    return await axiosIns.get(`/game/update_balance`)
  },

  /** 获取飞机群组 */
  async get_tg_group() {
    return await axiosIns.get(`/game/get_tg_group`)
  },

  /** 账单统计 */
  async balance_statistics() {
    return await axiosIns.get(`/game/balance_statistics`)
  },
  /** 余额变动 */
  async get_balance_change_record() {
    return await axiosIns.get(`/game/get_balance_change_record`)
  },
  /** 获取客服链接 */
  async get_customer_url() {
    return await axiosIns.get(`/game/get_customer_url `)
  },


}
export default api
