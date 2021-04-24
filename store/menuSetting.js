export const state = () => ({
  clipped: false,
  drawer: false,
  miniVariant: false,
})


export const mutations = {
  triggerClipped(state){
    state.clipped = !state.clipped;
  },
  triggerDrawer(state){
    state.drawer = !state.drawer;
  },
  triggerMiniVariant(state){
    state.miniVariant = !state.miniVariant;
  },

}
