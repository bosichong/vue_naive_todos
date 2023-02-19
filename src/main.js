/*
 * @Author: J.sky bosichong@qq.com
 * @Date: 2023-02-18 08:47:12
 * @LastEditors: J.sky bosichong@qq.com
 * @LastEditTime: 2023-02-19 18:00:56
 * @FilePath: /vue_naive_todos/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'

const app = createApp(App)
app.use(naive)
app.mount('#app')

