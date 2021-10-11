<template>
  <div class="full_screen" :style="`background: url(${login_bg}) no-repeat`">
    <v-card class="d-flex mx-auto wiki_login" style="margin-top:30vh;">
      <v-layout class="mx-auto title mb-4" align-center >
        <span class="font-weight-light mr-3">Jazzu WIKI</span>
      </v-layout>

      <v-text-field style="font-size: 12px;" outlined dense prepend-inner-icon="mdi-account" placeholder="账户" v-model="bbUsername" @keyup.enter="subLogin"/>
      <v-text-field style="font-size: 12px;" outlined dense prepend-inner-icon="mdi-form-textbox-password" placeholder="密码" type="password" v-model="bbPassword" @keyup.enter="subLogin"/>
      <v-text-field style="font-size: 12px;" outlined dense prepend-inner-icon="mdi-check-circle-outline" placeholder="验证码" v-model="code" :class="valid_code_class" @keyup.enter="subLogin">
        <template v-slot:append="">
          <span class="v-code-span mt-1" @click="refreshCode" style="cursor: pointer;font-size: 16px;">{{checkCode}}</span>
        </template>
      </v-text-field>

      <v-btn class="mt-0" color="secondary" @click="subLogin">登录</v-btn>
    </v-card>
  </div>
</template>

<script>

  import login_bg from 'assets/login_bg.svg'
  import {mapMutations} from 'vuex'

  export default {
    components: {

    },
    data:()=>{
      return {
        login_bg,

        bbUsername:'root',
        bbPassword:'123456',
        code:'',
        checkCode:'',
        loginBtn:false,

        errShow:false
      }
    },
    watch:{
      bbUsername(newVal){
        this.loginBtn = !!(newVal && this.bbPassword);
      },
      bbPassword(newVal){
        this.loginBtn = !!(newVal && this.bbUsername);
      },
    },
    computed:{
      valid_code_class(){
        let className = '';
        if(this.checkCode.toLocaleLowerCase()===this.code.toLocaleLowerCase()){ className = 'login-code-valid' }
        return className
      }
    },
    mounted() {
      this.loginBtn = !!(this.bbUsername && this.bbPassword);
      this.refreshCode()
      console.log('login',this)
    },
    methods:{
      ...mapMutations({ changeLogin:'user/changeLogin' }),
      async subLogin(){
        if(this.checkCode.toLocaleLowerCase()!==this.code.toLocaleLowerCase()){ this.$notify({ type: 'error', title: '请检查验证码' });return ; }
        let params = {
          username:this.bbUsername,
          password:this.bbPassword,
        };
        let fetchLogin = await this.$axios.$post('/api/login',params);
        if(fetchLogin.success){
          this.changeLogin({ ...fetchLogin.data })
          await this.$router.push('/')
        }else{
          this.$notify({ type: 'error', title: fetchLogin.message,});
        }

      },

      // 刷新验证码
      refreshCode(){ this.checkCode = this.createCode() },
      createCode(){
        let code = "";
        const codeLength = 4; //验证码的长度
        const random = [2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',  'M', 'N', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //随机数
        for(let i = 0; i < codeLength; i++) { //循环操作
          let index = Math.floor(Math.random() * 31); //取得随机数的索引（0~35）
          code += random[index]; //根据索引取得随机数加到code上
        }
        return code
      },

    }

  };
</script>

<style>
  .full_screen{width: 100%;height: 100%;}
  .wiki_login{flex-direction: column;width: 320px;padding: 28px 40px;}

  .login-code-valid .v-icon{ color: #91bc29 !important; }
</style>
