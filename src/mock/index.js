import Mock from 'mockjs'
import authorizeApi from './authorize'

// Mock.setup({
//   timeout: '350-600'
// })

// OTA
Mock.mock(/\/market\/ota\/list/, 'post', authorizeApi.list)
Mock.mock(/\/market\/ota\/account\/binding/, 'post', authorizeApi.bind)
Mock.mock(/\/market\/account\/binding\/status/, 'post', authorizeApi.status)
Mock.mock(/\/market\/account\/acquire\/picture/, 'post', authorizeApi.picture)

export default Mock
