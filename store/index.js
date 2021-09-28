export const state = () => ({
  roleId: 0,
  Authorization: 0,
})

export const mutations = {

  /**
   * 修改token，并将token存入localStorage
   * 'superAdmin', 'admin', 'user'
   * **/
  changeLogin (state, user) {
    state.Authorization = user?.Authorization;
    state.roleId = user?.role;
    console.log('vuex 登录:',user);
    state.isLogin = true;
    localStorage.setItem('Authorization', user.Authorization);
    localStorage.setItem('roleId', user?.role);
  },

}
