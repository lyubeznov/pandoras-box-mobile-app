import { Animated } from 'react-native'
import { BlurView } from 'expo'

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

export {
  BlurView as default,
  BlurView,
  AnimatedBlurView,
}
