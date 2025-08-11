/**
 * 
 */

export const cnf_event = {
  /** 关闭窗口 */
  NOTICE_CLOSE_WINDOW: 'NOTICE_CLOSE_WINDOW',

  //庄问路
  NOTICE_ZHUANG_WENLU: "NOTICE_ZHUANGWENLU",

  //闲问路
  NOTICE_XIAN_WENLU: 'NOTICE_XIANWENLU',

  //变背景色
  NOTICE_CHANGE_BG_COCOL: 'NOTICE_CHANGEBGCOCOL',

  //通知更新筹码
  NOTICE_UPDATE_CHIPS: 'NOTICE_UPDATE_CHIPS',

  //更新桌面数据
  UPDATE_TABLE_INFO: 'UPDATE_TABLE_INFO',

  //更新桌面台桌总投注
  UPDATE_TABLE_BET: 'UPDATE_TABLE_BET',

  //更新公告
  UPDATE_NOTICE: 'UPDATE_NOTICE',

  //更新用户信息
  UPDATE_PLAYER_INFO: 'UPDATE_PLAYER_INFO',

  // 切换游戏类型
  CHANGE_GAME: "CHANGE_GAME",

  //更新聊天信息
  UPDATE_CHAT_LIST: 'UPDATE_CHAT_LIST',

  // /**
  //  * 桌面彩池发生变化
  //  */
  // OnTablePoolChanged: "OnTablePoolChanged",
  // /**
  //  * 开奖事件
  //  */
  // OnResult: "OnResult",
  // /**
  //  * 停止下注事件
  //  */
  // OnStopBetting: "OnStopBetting",
  // /**
  //  * 开始下注
  //  */
  // OnStartBetting: "OnStartBetting",
  // /**
  //  * 开局
  //  */
  // OnNewRound: "OnNewRound",
  // /**
  //  * 用户余额发生改变
  //  */
  OnBalanceChanged: "OnBalanceChanged",
  // /**
  //  * 通知发生改变
  //  */
  // OnNoticeChange: "OnNoticeChange",
  // /**
  //  * 系统维护
  //  */
  // OnSystemMaintenance: "OnSystemMaintenance",
  // /**
  //  * 与服务器断开连接
  //  */
  // OnDisconnect: "disconnect",
  // /**
  //  * 与服务器连接成功
  //  */
  // Onconnect: "connect",

  // /**
  //  * 与服务器重新连接成功
  //  */
  // Onreconnect: "reconnect",

  // /**
  // * 服务器连接错误
  // */
  // OnError: "error",

  // /**
  // * 向服务器发送我的位置
  // */
  // OnJoin: "join",

  // /**
  //  * 桌台数据发生变化
  //  */
  // OnTableModelHasChange: "OnTableModelHasChange",
  // /**
  //  * 计时器
  //  */
  // OnTimeTicker: "OnTimeTicker",

  // /**
  //  * 清注
  //  */
  // OnClearBeting: "OnClearBeting",

  // /**
  // * 踢下线
  // */
  // OnKick: "OnKick",

  // /**
  //  * 牌点显示
  //  */
  // OnCardReached: "OnCardReached",




  //更新用户的最新连接socket,旧的全部关闭
  Upsocket: "upsocket",

  // 删除用户订阅
  Deltopic: "Deltopic",

  // 更新用户余额
  upBalance: "upBalance",

  // 更新房间人数 
  UpCount: "UpCount",

  // 更新房间人数及总数并排序
  room_member_count: "room_member_count",

  // 更新台桌彩池信息及总数并排序
  table_pool_count: "table_pool_count",

  // 通知消息
  Notice: "Notice",

  // //开局状态
  Open_bureau_status: "Open_bureau_status",

  //开口状态
  Open_mouth_status: "Open_mouth_status",

  //封盘状态
  Close_status: "Close_status",

  //开奖状态
  Already_lottery_status: "Already_lottery_status",
  //清注状态
  clear_status: "clear_status",

  //好路推荐
  Good_way_recommend: "Good_way_recommend",

  //通知台桌彩池信息
  Table_pool_info: "Table_pool_info",

  //通知台桌牌点信息
  Table_brand_info: "Table_brand_info",

  //更新大厅人数
  Hall_member_count: 'Hall_member_count',


  CLEAR_TABEE_DATA: 'CLEAR_TABEE_DATA',

  // 房间用户信息
  Table_user_info: 'Table_user_info',

  //刷新用户用户
  RefreshBalance: 'RefreshBalance',


  //通知台桌当前我的投注信息
  Table_me_betting: 'Table_me_betting',

  //通知台桌投注列表信息
  Table_betting_list: "Table_betting_list",

  //通知台桌新的下注信息
  Table_betting_new: "Table_betting_new",

  // 桌子状态
  Table_status: 'Table_status',

  //更新用户信息
  Member_change_info: 'Member_change_info',


  // 修改播放地址
  Change_play_url: 'Change_play_url',

  // 切换免佣通知
  Change_free_bet: 'Change_free_bet',


  // 切换播放视频
  Change_live_line: 'Change_live_line',

  //通知多台桌面刷新下注
  More_Bet_Table_info: "More_Bet_Table_info",

  //视频加载完成
  Video_Loading_Done: "Video_Loading_Done",

  //断网重连视频切换
  Network_Player_Live: "Network_Player_Live",

  //声音切换通知
  Music_Change: "Music_Change",

  // 进入游戏通知
  Enter_Game: "Enter_Game",

  // 聊天消息通知
  Chat_Mes: "Chat_Mes",



  memberBalanceEvent: "memberBalanceEvent",
  //监听房间游戏的变化
  roomGameEvent: "roomGameEvent",
  //监听房间用户列表
  roomUserInfoListEvent: "roomUserInfoListEvent",
  //监听房间用户人数
  upCount: "upCount",
  //房间消息
  roomSendMsgEvent: "roomSendMsgEvent",
  //房间弹幕
  roomBarrageEvent: "roomBarrageEvent",
  // 所有用户下注记录信息
  allUserBetCodeEvent: "allUserBetCodeEvent",
  // 用户下注记录信息
  userBetCodeEvent: "userBetCodeEvent",
  //修改下逐项、赔率事件
  changeBetItem: "changeBetItem",
  //当前总投注
  userTotalBetAmountEvent: "userTotalBetAmountEvent",

  //客服显示
  customerShowEvent: "customerShowEvent",

  //自定义筹码
  customChipsEvent: "customChipsEvent",

  //未登录
  noLoginPC: "noLoginPC",
  //未登录
  registerPC: "registerPC",
  //找回密码
  findPsdPC: "findPsdPC",
  //pc header选择改变
  pcHeaderActiveIndexChange: "pcHeaderActiveIndexChange",
  // 游戏状态
  gameStatus: "fuckGameStatus",
  // 结算信息
  gameSettle: "gameSettle",
  // 实时下注信息
  realBet: "realBet",
  adminMsg: "adminMsg"
}       