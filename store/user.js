//用户管理
export const state = () => ({
    //返回的数据结构
    userInfo: {
        token: '',
        user: {}
    },
    registerInfo:{
        token: '',
        user: {}
    }
})
export const mutations = {
    //保存信息到state
    setUserInfo(state, data) {
        state.userInfo = data
    },
    //保存注册信息
    setRegisterInfo(state,data){
        state.registerInfo=data
    },
    //清除用户登录信息
    cleanUserInfo(state, info) {
        //这里是清空数据，所以没有外部参数传递
        if (process.browser) {
            // 这里需要环境判断，node环境没有本地存储
            // 这里的process是当前环境的判断
            // 这里的process为true，就是在浏览器环境下运行
            console.log(process.browser);
            localStorage.removeItem('userInfo')
        }
        state.userInfo={}
    }
};
export const actions = {
    //登录
    login({ commit }, data) {
        // 为什么要花括号，因为相等于有var {commit} =store
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
    },
    //封装注册功能
    register({commit},data){
       return this.$axios({
           url:`/accounts/register`,
           method:'POST',
           data:data
       })
       .then(res=>{
            console.log(res);
            commit('setRegisterInfo',data)
            return data
       })
    }
};