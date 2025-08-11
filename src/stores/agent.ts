import { defineStore } from "pinia"
import { ref } from "vue"
import type { IAgentRakeBackResp, IBackRecord } from "@/utils/interface"
import api from "@/api/api"

export const useAgentStore = defineStore('agent', () => {

  const agentInfo = ref<IAgentRakeBackResp>()
  const backRecordList =ref<IBackRecord>()
  const subordList =ref([])

  // 配置
  const getAgentInfo = async () => {
    const { data } = await api.agent_rake_back()
    agentInfo.value = data
  }


  // 提现
   const get_rake_back = async () => {
    const { data } = await api.get_rake_back()
    console.log('发起提现',data);

  }

  // 记录
   const get_rake_back_record = async () => {
    const { data } = await api.get_rake_back_record()
    backRecordList.value = data
  }

  // 下级
   const get_subord_list = async (level:number,is_sort:number) => {
    const { data } = await api.get_subord_list(
      level,is_sort
    )
    subordList.value = data.subord_list
  }

  return {
    agentInfo,
    backRecordList,
    subordList,
    getAgentInfo,
    get_rake_back,
    get_subord_list,
    get_rake_back_record
  }
})
