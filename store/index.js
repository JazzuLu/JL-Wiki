export const state = () => ({
  roleId: 0,
  Authorization: 0,
})

export const mutations = {

  /**
   * 修改token，并将token存入localStorage
   * roleId = 1: 管理员  最高权限
   * roleId = 2: 作者    部分权限   --  只能写自己的权限
   * roleId = 3: 读者    最低权限   --  readonly
   * **/
  changeLogin (state, user) {
    state.Authorization = user.Authorization;
    state.roleId = user.role_id;
    console.log('vuex 登录:',user);
    state.isLogin = true;
    localStorage.setItem('Authorization', user.Authorization);
    localStorage.setItem('roleId', user.role_id);
  },

}
