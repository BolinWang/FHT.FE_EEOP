import Vue from 'vue'
import SvgIcon from '@/components/Icon-svg'

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)

// eslint-disable-next-line
const iconMap = requireAll(req)
