import App from './App'
import './styles.css'
import { mountEmbeddedApp } from './modules/embed/mountEmbeddedApp'
import { injectGlobalFonts } from './modules/styles/injectGlobalFonts'

injectGlobalFonts()
mountEmbeddedApp(App)
