import DefaultTheme from 'vitepress/theme'
import MyLayout from './components/MyLayout.vue'

import './styles/index.css'

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
}
