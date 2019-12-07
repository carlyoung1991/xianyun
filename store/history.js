//用户管理
export const state = () => ({
    //返回的数据结构
    historyList:[]
})
export const mutations = {
    //保存信息到state
    addHistoryItem(state, data) {
        state.historyList.push(data)
    }
};
