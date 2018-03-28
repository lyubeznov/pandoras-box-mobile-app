import { StyleSheet } from 'react-native'

import { colors, sizes } from 'styles'

export default StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    borderRadius: sizes.borderRadius,
    padding: 20,
  },
  text: {
    color: colors.light,
    fontSize: 18,
    textAlign: 'center'
  },
})
