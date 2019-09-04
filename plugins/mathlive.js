import MathLive from 'mathlive/dist/mathlive.js'

export default ({ app }, inject) => {
  inject('mathlive', MathLive)
}
