import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    messageData: {
      total: '0',
      distribute: 0,
      concentrate: 0
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    UPDATE_MESSAGEDATA: (state, params) => {
      state.messageData = params
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    UpdateMessageData: ({ commit }, params) => {
      commit('UPDATE_MESSAGEDATA', params)
    }
  }
}

export default app
