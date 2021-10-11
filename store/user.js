export const state = () => ({
  roleId: 0,
  token: '',
  isLogin: false,
})

export const mutations = {

  /**
   * 修改token，并将token存入localStorage
   * 'superAdmin', 'admin', 'user'
   * **/
  changeLogin (state, user) {
    state.token = user?.token;
    state.roleId = user?.role;
    state.isLogin = true;
    // console.log('vuex 登录:',user);
    localStorage.setItem('token', user.token);
    localStorage.setItem('roleId', user?.role);
  },
  logout(state) {
    state.token = '';
    state.roleId = 0;
    state.isLogin = false;
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
  }

}
