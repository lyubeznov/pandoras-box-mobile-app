import { StyleSheet } from 'react-native'

import { sizes, colors } from 'styles'

export default StyleSheet.create({
  container: {

  },
  colorPreview: {
    paddingVertical: 25,
    alignSelf: 'stretch',
    borderRadius: sizes.borderRadius,
  },
  colorText: {
    fontSize: 26,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
})
