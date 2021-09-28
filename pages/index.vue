<template>
  <v-row justify="center" align="center">
    111
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  async mounted() {
    // let fetchLogin = await this.$axios.$post('/api/api/register',{code:'123',username:'test1',password:'1234567',});
  }
}
</script>
