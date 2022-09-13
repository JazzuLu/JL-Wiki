import Vue from "vue";

export default function ({ $axios, redirect },inject) {

  const isServer = Vue.prototype.$isServer || process.server
  const baseURL = isServer ? `${process.env.DOMAIN}/api` : `${window.location.origin}/api`
  const api = $axios.create({
    baseURL,
    responseType: 'json',
    withCredentials: true,
  })

  api.onRequest(config => {
    // console.log('Making request to ' + config.url)
  })

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  // Inject to context as $api
  inject('api', api)
}
