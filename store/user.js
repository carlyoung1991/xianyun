//用户管理
export const state = () => ({
    //返回的数据结构
    userInfo: {
        token: '',
        user: {}
    }
})
export const mutations = {
    //保存信息到state
    setUserInfo(state, data) {
        state.userInfo = data
    },
    //清除用户登录信息
    cleanUserInfo(state, info) {
        if (process.browser) {
            console.log(process.browser);
            localStorage.removeItem('userInfo')
        }
        state.userInfo={}
    }
};
export const actions = {
    //登录
    login({ commit }, data) {
        return this.$axios({
            url: "/accounts/login",
            method: 'POST',
            data: data
        })
            .then(res => {
                console.log(res);
                const data = res.data;
                //保存到state
                commit('setUserInfo', data)
                return data
            })
    }
};