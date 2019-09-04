import MathLive from 'mathlive/dist/mathlive.js'
import 'mathlive/dist/mathlive.core.css'
import 'mathlive/dist/mathlive.css'

export default ({ app }, inject) => {
  inject('mathlive', MathLive)
}
