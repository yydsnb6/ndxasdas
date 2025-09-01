import { defineStore } from "pinia"
import { ref } from "vue"
import { config } from "../utils/config"
import { useRoomStore } from "./room"
import { IOptItem } from "@/utils/interface"
import { showNotify, showToast } from "vant"
import { useUserStore } from "./user"
import bus from "@/utils/bus"
import { showConfirmDialog } from 'vant';
import { useRoute, useRouter } from "vue-router"
import { encode } from 'js-base64';




export const useSocketStore = defineStore('socket', () => {

  const chatList = ref<{
    head: string,
    first_name: string,
    msg: string
  }[]>([])

  const socket = ref<WebSocket | null>(null)
  const roomStore = useRoomStore()
  const userStore = useUserStore()
  const router = useRouter()
  const route = useRoute()
  let heartTimer: any = null
  const maxTimeOutTimers = 3
  let timeOutTimers = 0
  const headrtSendTime = 1000 //*60*60*24 //3000
  const init = () => {
    userStore.loadingText = '正在加入房间。。。'
    userStore.showLoading = true

    console.log("连接服务器中。。。");
    const wsUrl = process.env.NODE_ENV === 'production' ? config.proWsUrl : config.devWsUrl
    socket.value = new WebSocket(wsUrl + '?tgid=' + userStore.tgid);
    socket.value.binaryType = "arraybuffer"
    socket.value.onopen = () => {
      console.log("连接服务器成功");
      userStore.showLoading = false

      joinRoomAction()
      clearInterval(heartTimer)
      heartTimer = setInterval(() => {
        timeOutTimers++
        sendHeartbeat()
        if (timeOutTimers >= maxTimeOutTimers) {
          // reconnect()
          timeOutTimers = 0
        }
      }, headrtSendTime)
    };
    // 接收到消息时触发
    socket.value.onmessage = (msg) => {
      const binaryData = msg.data; // event.data 是一个 ArrayBuffer
      // 使用 TextDecoder 解码 ArrayBuffer
      const decoder = new TextDecoder('UTF-8'); // 或者根据实际编码指定
      const message = decoder.decode(new Uint8Array(binaryData));

      const reslut = JSON.parse(message as string)
      let data: any

      if (reslut.action != 0) {
        const binaryData = atob(reslut.data)


        // 将二进制数据转换为Uint8Array
        const uint8Array = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        // 使用TextDecoder解码Uint8Array为UTF-8字符串
        console.log(new Date().toString() + reslut.action + "收到的消息结果", JSON.parse(new TextDecoder().decode(uint8Array)))
        data = JSON.parse(new TextDecoder().decode(uint8Array))
      }

      switch (reslut.action) {
        case 0:
          timeOutTimers = 0
          break;
        // 玩家进入房间
        case 1000:
          showToast({
            message: `欢迎玩家${data.first_name}进入房间～`,
            position: 'top',
          })
          // bus.emit('playSound', 'dohuanyin')
          break;
        // 场景消息
        case 1001:
          roomStore.sceneMsg = data
          if (data.is_open_insurance) {
            bus.emit('showBaoxian')
          }
          roomStore.setRoomUserInfo()
          break;
        // 用户坐下
        case 1002:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()
          // bus.emit('playSound', 'dozuoxia')

          break;
        // 开始游戏
        case 1003:
          bus.emit('EventGameStart')
          roomStore.winSeats = []
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()
          bus.emit('playSound', 'dostart')

          break;
        // 盲注通知
        case 1004:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()

          // if (Number(roomStore.sceneMsg.straddle_blind) > 0) {
          //   showToast({
          //     message: `小盲注$${roomStore.sceneMsg.little_blind},大盲注$${roomStore.sceneMsg.big_blind},额外盲注$${roomStore.sceneMsg.straddle_blind}`
          //   })
          // } else {
          //   showToast({
          //     message: `小盲注$${roomStore.sceneMsg.little_blind},大盲注$${roomStore.sceneMsg.big_blind}`
          //   })
          // }
          break;
        // 行动时间通知
        case 1005:
          roomStore.action_seat_id = data.action_seat_id
          roomStore.action_second = data.action_second
          roomStore.opt_items = data.opt_items
          break;
        // 手牌通知
        case 1006:
          if (data.seat_id == roomStore.sceneMsg.self_seat_id) {
            roomStore.roomUserInfo && (roomStore.roomUserInfo.hand_cards = data.hand_cards)
            bus.emit('EventFlyMe')
          } else {
            const seat = roomStore.sceneMsg.seats.find((item) => {
              return item.seat_id == data.seat_id
            })
            if (seat) {
              seat.user.hand_cards = data.hand_cards
            }
            bus.emit('Event1006' + data.seat_id, data)
          }
          break;
        // 操作通知
        case 1007:
          roomStore.action_seat_id = -2
          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()
          bus.emit('Event1007' + data.seat_id)

          switch (data.opt_items) {
            case IOptItem.OptItemAllIn:
              bus.emit('playSound', 'doallin')
              break;
            case IOptItem.OptItemBet:
              bus.emit('playSound', 'dogenzhu')
              break;
            case IOptItem.OptItemFirstBet:
              bus.emit('playSound', 'doxiazhu')
              break;
            case IOptItem.OptItemFold:
              bus.emit('playSound', 'doqipai')
              break;
            case IOptItem.OptItemPass:
              bus.emit('playSound', 'doguopai')
              break
            case IOptItem.OptItemRaise:
              bus.emit('playSound', 'dojiazhu')
              break;
            default:
              break;
          }

          break;
        // 公共牌通知
        case 1008:
          roomStore.sceneMsg!.public_card = data.public_card
          bus.emit('EventFlyPublic')
          // bus.emit('playSound', 'dofapai')

          break;
        // 结果通知
        case 1009:
          roomStore.can_look_card_seat_ids = data.can_look_card_seat_ids
          roomStore.look_card_amount = data.look_card_amount
          roomStore.winSeats = data.win_seat
          roomStore.win_card = data.win_card
          roomStore.sceneMsg = data.scene_msg
          roomStore.sceneMsg.seats.forEach((seat) => {
            if (seat.user) {
              seat.user.action = -1
              console.log(seat.user.action);
            }
          })
          roomStore.setRoomUserInfo()

          break;
        // 清理桌子
        case 1010:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()
          roomStore.initWinSeat()
          roomStore.winSeats = []
          bus.emit('clearTable')
          // bus.emit('playSound', 'doxipaizhong')

          break;
        // 站立通知
        case 1011:
          showToast({
            message: `玩家${data.first_name}离开了座位`
          })
          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()

          // bus.emit('playSound', 'dolikaizuowei')

          break;
        // 离开房间通知
        case 1012:
          showToast({
            message: `玩家${data.first_name}离开了房间`
          })

          if (data.tgid == userStore.userInfo.tgid) {
            router.replace('/home')
            disconnect()
          } else {
            roomStore.sceneMsg = data.scene_msg
            roomStore.setRoomUserInfo()
          }
          // bus.emit('playSound', 'dolikai')
          break;

        case 1013:
          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()

          roomStore.baoxianMaxAmount = data.max_buy_amount
          roomStore.baoxianMinAmount = data.min_buy_amount
          roomStore.baoxianSecond = data.action_second
          roomStore.baoxianSeatIds = data.ids

          bus.emit('playSound', 'domaibaoxian')
          break;
        case 1014:
          bus.emit('playSound', 'domairu')

          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()
          roomStore.buyWaitTime = data.wait_time
          roomStore.buySeatIds = data.buy_in_seat_id
          if (userStore.userInfo.balance < roomStore.sceneMsg.min_buy) {
            showNotify({
              message: '余额不足请充值'
            })
            router.replace('/home')
            disconnect()
            return
          }
          break;

        // 手牌记录
        case 1015:
          roomStore.handRecored = data
          break;
        // 盲注记录
        case 1016:
          roomStore.blindRecored = data
          break;
        // 玩家买入后
        case 1017:
          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()

          roomStore.buyWaitTime = data.wait_time
          roomStore.buySeatIds = data.buy_in_seat_id
          if (userStore.userInfo.balance < roomStore.sceneMsg.min_buy) {
            showNotify({
              message: '余额不足请充值'
            })
            router.replace('/home')
            disconnect()
            return
          }
          break;
        // 秀牌
        case 1018:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()

          break
        // 聊天
        case 1020:
          // if (data.) {

          // }
          chatList.value = chatList.value.concat(data)
          setTimeout(() => {
            bus.emit('chat')
          }, 500)

          if (data.length > 2) {
            return
          }
          if (data.length > 0) {
            bus.emit('chatInfo', data[0])
          }
          break

        // 玩家买入后
        case 1021:
          roomStore.sceneMsg = data.scene_msg
          roomStore.setRoomUserInfo()
          roomStore.baoxianMaxAmount = data.max_buy_amount
          roomStore.baoxianMinAmount = data.min_buy_amount
          roomStore.baoxianSecond = data.action_second
          roomStore.baoxianSeatIds = data.ids
          break;
        // 玩家买入后
        case 1022:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()
          break;
        // 玩家买入后
        case 1023:
          roomStore.sceneMsg = data
          roomStore.setRoomUserInfo()
          break;
        case 1024:
          roomStore.can_look_card_seat_ids = []
          roomStore.look_card_amount = 0
          roomStore.sceneMsg = data
          roomStore.sceneMsg.seats.forEach((seat) => {
            if (seat.user) {
              seat.user.action = -1
            }
          })
          bus.emit('EventFlyAll')
          roomStore.setRoomUserInfo()
          break;
        // 离开房间通知
        case 501:
          showToast({
            message: data.msg,
            position: 'top',
          })
          // bus.emit('playSound', 'dolikai')
          break;
        case 502:
          showToast({
            message: data.msg,
            position: 'top',
          })
          break;
        case 503:
          showToast({
            message: data.msg,
            position: 'top',
          })
          break;
        // 踢出房间
        case 504:
          showNotify({
            message: data.msg,
          })
          router.replace('/home')
          disconnect()
          break;

        default:
          console.log('从服务器接收到消息为未定义接受事件‌', event);
          break;
      }

      // if (msg.data instanceof Blob) {
      //   const reader = new FileReader()
      //   // console.log(msg.data);
      //   reader.readAsText(msg.data, 'UTF-8')
      //   reader.onload = () => {

      //   }
      // }
    }
    // 连接关闭时触发
    socket.value.onclose = () => {
      roomStore.initRoomSceneMsg()
      userStore.showLoading = false
      if (route.path == '/game') {
        // bus.emit('playSound', 'dowangluo')
        showConfirmDialog({
          width: '80%',
          title: '网络连接已断开，请重新连接',
          confirmButtonText: '重新连接',
          cancelButtonText: '退出房间',
          message:
            '',
        })
          .then(() => {
            // on confirm
            init()
          })
          .catch(() => {
            router.replace('/home')
            // on cancel
          });
        bus.emit('neterror')
      }
      console.log('WebSocket 连接已关闭');
    }
    // 发生错误时触发
    socket.value.onerror = (error) => {
      userStore.showLoading = false

      console.error('WebSocket 错误：‌', error);
      // reconnect();
    }
  }

  const sendHeartbeat = () => {
    if (socket.value?.readyState === socket.value?.OPEN) {
      socket.value?.send(JSON.stringify({ action: 0 }));
    }
  }

  // const inRoom = ref(false)


  const joinRoomAction = () => {
    const data = {
      action: 100,
      data: encode(JSON.stringify({
        room_id: roomStore.roomId
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        console.log(11111);

        socket.value.send(JSON.stringify(data));
      } catch (error: any) {
        // inRoom.value = false
      }
    } else {
      // inRoom.value = false
    }
  }

  const reconnect = () => {
    // inRoom.value = false;
    if (socket.value) {
      socket.value?.close()
      socket.value = null
    }
    init()
  }

  const disconnect = () => {
    roomStore.initRoomSceneMsg()
    // leave()
    clearInterval(heartTimer)
    socket.value?.close()
    socket.value = null
  }


  // 101
  const sitDown = (seat_id: number, buy_amount: number) => {

    standUp()


    if (roomStore.sceneMsg.self_seat_id == seat_id) {
      showToast({
        message: '已在当前座位',
        position: 'top',
      })
    }
    setTimeout(() => {
      const data = {
        action: 101,
        data: encode(JSON.stringify({
          seat_id,
          buy_amount
        }))
      }


      if (socket.value?.readyState === WebSocket.OPEN) {
        try {
          socket.value.send(JSON.stringify(data));
        } catch (error) {
          // inRoom.value = false
        }
      }
    }, 1000)
  }

  //102
  const doSomething = (opt: IOptItem, bet_amount?: number) => {
    const data = {
      action: 102,
      data: encode(JSON.stringify({
        action: opt,
        bet_amount
      }))
    }
    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        console.log(JSON.stringify(data));

        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  //103
  const standUp = () => {
    //
    if (roomStore.sceneMsg.self_seat_id <= -1) {
      // showToast({
      //   message: '当前状态无法站立',
      //   position: 'top',
      // })
      return
    }
    // 1-站立 2-坐下等待开局 3-游戏中 4-弃牌 5-allin
    if (roomStore.roomUserInfo?.status == 3 || roomStore.roomUserInfo?.status == 5) {
      showToast({
        message: '当前状态无法站立',
        position: 'top',
      })
      return
    }
    const data = {
      action: 103,
      data: ""
    }
    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }


  }

  // 104
  const leave = () => {
    const data = {
      action: 104,
      data: ""
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 106
  const buyMoney = (money: string) => {
    const data = {
      action: 106,
      data: encode(JSON.stringify({
        bet_amount: money,
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 105
  const buyBaoXian = (money: string) => {
    const data = {
      action: 105,

      data: encode(JSON.stringify({
        buy_amount: money,
        // gameId:roomStore.sceneMsg
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 107
  const getHand = () => {
    const data = {
      action: 107,
      data: ''
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 108
  const getBlind = () => {
    const data = {
      action: 108,
      data: ''
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 109
  const sendMsg = (msg: string) => {
    console.log(123123);

    const data = {
      action: 109,
      data: encode(JSON.stringify({
        content: msg,
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 110
  const sendBuMa = (amount: number) => {

    const data = {
      action: 110,
      data: encode(JSON.stringify({
        amount: amount,
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 111
  const sendCheMa = (amount: number) => {

    const data = {
      action: 111,
      data: encode(JSON.stringify({
        amount: amount,
      }))
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }

  // 112
  const lookCard = () => {
    const data = {
      action: 112,
      data: ''
    }

    if (socket.value?.readyState === WebSocket.OPEN) {
      try {
        socket.value.send(JSON.stringify(data));
      } catch (error) {
        // inRoom.value = false
      }
    }
  }



  return { chatList, lookCard, sendBuMa, sendCheMa, init, reconnect, joinRoomAction, disconnect, sitDown, doSomething, standUp, leave, buyMoney, getHand, getBlind, buyBaoXian, sendMsg }
})
