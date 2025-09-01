export interface ISceneMsg {
  room_name: string;
  room_id: string;
  room_type: number;
  room_status: number;
  little_blind: string;
  big_blind: string;
  straddle_blind: string;
  button: number;
  sb: number;
  bb: number;
  sbb: number;
  min_buy: number;
  max_buy: number;
  is_push_group: boolean;
  seat_num: number;
  pot_amount: string;
  seats: ISeatInfo[];
  action_seat_id: number;
  action_second: number;
  public_card: number[];
  self_seat_id: number,
  max_bet_amount: number,
  end_time: number
}

export interface ISeatInfo {
  seat_id: number;  // 座位ID
  user: IUserInfo;   // 用户信息
}

export interface IUserInfo {
  id: number,
  tgid: number;              // tgid
  user_name: string;         // tg用户账号
  first_name: string;        // tg用户昵称
  last_name: string;         // tg用户昵称
  head_url: string;          // tg用户头像
  balance: number;           // 用户余额（使用字符串保证精度）
  bet_amount: string;        // 用户下注金额（使用字符串保证精度）
  is_btn: boolean;           // 是否庄家
  is_sb: boolean;            // 是否小盲
  is_bb: boolean;            // 是否大盲
  is_sbb: boolean;           // 是否额外盲注
  status?: EPlayerStatus;       // 玩家状态（使用枚举更清晰）
  is_open_hand_card: boolean;// 是否公开手牌
  hand_card_size: number;    // 手牌数量
  opt_item: IOptItem[];         // 操作项（需要进一步定义）
  hand_cards: number[],
  action?: IOptItem,
  total_bet_amount: string,
  user_id: number,
  total_bet_number: number,
  total_game_number: number,
  total_show_number: number,
  total_win_number: number,
  is_auto_buy: boolean
  auto_buy_amount: number,
  remain_balance:string
}

// 枚举定义 - 玩家状态
export enum EPlayerStatus {
  WaitingStart = 2,   // 等待开局
  Playing = 3,        // 游戏中
  Folded = 4,         // 弃牌
  AllIn = 5           // Allin
}

// 操作项接口（需要根据实际业务补充字段）
export enum IOptItem {
  // 示例字段 - 根据实际业务补充
  No = -1,
  Mang = 1, // 过牌 2
  OptItemPass = 2, // 过牌 2
  OptItemBet = 3,  // 跟注 3
  OptItemRaise = 4, // 加注 4
  OptItemFold = 5, // 弃牌 5
  OptItemAllIn = 6, // Allin 6
  OptItemFirstBet = 7
}




// 操作类型枚举
export enum EActionType {
  Check = "check",
  Fold = "fold",
  Call = "call",
  Raise = "raise",
  AllIn = "allin"
}

// 房间状态枚举（增强可读性）
export enum ERoomStatus {
  Waiting = 1,   // 等待中
  Playing = 2    // 游戏中
}

// 房间类型枚举
export enum ERoomType {
  LongCard = 1,  // 长牌
  ShortCard = 2  // 短牌
}


export interface IRoomInfo {
  room_name: string;           // 房间名称
  room_id: string;             // 房间ID
  room_type: ERoomType;         // 房间类型 (使用枚举增强可读性)
  little_blind: string;        // 小盲注 (string保证精度)
  big_blind: string;           // 大盲注 (string保证精度)
  straddle_blind: string;      // 额外盲注 (string保证精度)
  min_buy: string;             // 最小购买 (string保证精度)
  max_buy: string;             // 最大购买 (string保证精度)
  is_push_group: boolean;      // 是否推群
  push_group_ids: number[];    // 推送给的群ID
  seat_num: number;            // 座位数
  sit_num: number;             // 已坐下人数
  end_time: number;            // 结束倒计时 (单位：毫秒)
}


export enum ESeatPos {
  Top = 0,
  Bottom = 1,
  Left = 2,
  Right = 3
}


export interface IConfig {
  tutorial: string, insurance_odds: IBetConfig[]
}

export interface IBetConfig {
  outs: number,
  odds: string
}


export interface PokerRoomConfig {
  big_blind: string;           // 大盲注金额（字符串形式）[1,5](@ref)
  end_time: number;             // 房间结束时间戳（毫秒级）[1](@ref)
  is_push_group: boolean;       // 是否为推送群组房间[1](@ref)
  little_blind: string;         // 小盲注金额（字符串形式）[1,5](@ref)
  max_buy: string;              // 最大买入筹码量[1](@ref)
  min_buy: string;              // 最小买入筹码量[1](@ref)
  push_group_ids: null | string[]; // 推送群组ID列表（可为空或字符串数组）[1](@ref)
  room_id: string;              // 房间唯一标识ID[1](@ref)
  room_name: string;            // 房间名称[1](@ref)
  room_type: 1 | 2;             // 房间类型（1:测试房, 2:常规房）[1](@ref)
  seat_num: number;             // 房间总座位数[1](@ref)
  sit_num: number;              // 当前已入座玩家数[1](@ref)
  straddle_blind?: string;      // 【可选】Straddle盲注金额（特殊下注规则）[1,2](@ref)
  is_open_insurance:boolean
}


export interface IWalletInfo {
  address: string,
  currency: string,
  id: number,
  min_pay: number,
  network: string
}


export interface ITransferUser {
  min_transfer: number,
  rates: number,
  user_info: {
    balance: number,
    first_name: string,
    head_url: string,
    last_name: string,
    room_id: string,
    tgid: number,
    user_id: number,
    user_name: string
  }
}

export interface IWalletOrder {
  fees: number,
  id: number,
  order_desc: string,
  order_id: string,
  order_opt: string,
  order_status: string,
  pay_amount: number,
  pay_user_name: string,
  rec_pay_user_name: string
}


export interface IAgentRakeBackResp {
  /**​ 返佣可提取金额 */
  rake_back_amount: string;
  /**​ 一级返佣百分百 */
  one_level_pump: string;
  /**​ 一级返佣信息 */
  one_level_info: Reward;
  /**​ 二级返佣百分百 */
  two_level_pump: string;
  /**​ 二级返佣信息 */
  two_level_info: Reward;
  /**​ 当前返佣等级 */
  current_reward_level: number;
  /**​ 当前返佣等级信息 */
  current_reward_level_info: RewardInfo[];
  share_url: number
}

export interface Reward {
  /**​ 人数 */
  number: number;
  /**​ 金额 */
  amount: string;
  /**​ 返佣等级配置 */
  reward_list: RewardInfo[];
}

interface RewardInfo {
  /**​ 等级 */
  level: number;
  /**​ 邀请人数 */
  invite_number: string;
  /**​ 返佣百分百 */
  pump: string;
}
export interface ICreateRoom {
  is_open_insurance: boolean
  action_second: number,
  auto_start_num: number,
  big_blind: number,
  end_time: number,
  insurance_amount: number,
  is_limit_gps: boolean,
  is_limit_ip: boolean,
  is_push_group: boolean,
  little_blind: number,
  look_num: number,
  max_buy: number,
  min_buy: number,
  push_group_ids: number[],
  room_name: string,
  room_type: number,
  seat_num: number,
  straddle_blind: number
}
export interface IWinSeat {
  win_amount: string
  win_card: number[]
  win_card_type: number
  win_seat_id: number
}


export interface IHandCard {
  name: string         // 昵称
  seat_type: number  // 位
  hand_cards: number[] // 手牌
  opt_item: number  // 操作项
}

// export interface IOutHandCard {
//   username: string         // 昵称
//   seat_type: number  // 位
//   cards: number[] // 手牌
//   opt_item: number  // 操作项
// }
export interface IOutHandCard {
  cards: number[];
  opt_item: number;
  seat_type: number;
  username: string;
  public_card: number[];
  bet_amount: string;
  win_amount: string;
  is_win: boolean;
  bet_all_amount: string;
  card_type: number;
  buy_insurance_amount: string;
  insurance_compensation_amount: string
}


export interface HandCardInfo {
  cards: number[];
  opt_item: number;
  seat_type: number;
  username: string;
  public_card: number[];
  bet_amount: string;
  win_amount: string;
  is_win: boolean;
  bet_all_amount: string;
  card_type: number;
}





export interface BlindRecord {
  limit_blind: string     // 小盲
  big_blind: string       // 大盲
  user_num: string        // 玩家数量
  user_blind_list: UserBlind[] // 玩家列表
  stand_by_user: {
    first_name: string,
    head_url: string,
    id: number
  }[]
}

export interface UserBlind {
  game_number: number;
  bet_number: number;
  name: string     // 昵称
  buy_amount: string// 买入金额
  phase: string// 盈亏
}


export interface IBackRecord {
  month_pump: string,
  rake_back_record_list: [],
  today_pump: string,
  total_pump: string,
  week_pump: string,
}
