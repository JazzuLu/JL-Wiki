<template>
  <notifications :max='6' animation-name="v-fade-left" ref="m_notify" style="top:30px !important;">
    <template v-slot:body="props">
      <div @click="destroyNotify(props)">
        <v-alert :type="props.item.type" transition="scale-transition">
          <div class="subheading">{{props.item.title}}</div>
          <div class="body-2">{{props.item.text}}</div>
        </v-alert>
      </div>
    </template>
  </notifications>
</template>

<script>
export default {
  data:()=>{
    return{
      iconType:{
        success:'check',
        error:'error',
        info:'info',
        warning:'warning',
      }
    }
  },
  methods:{
    destroyNotify(props){
      props.close();
    }
  }
}
</script>

<style>
.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all .2s;
}
.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(200px) scale(0.2);
}
</style>
