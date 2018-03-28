import { StyleSheet } from 'react-native'

import { colors } from 'styles'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  textRow: {
    color: colors.light,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  sliderRow: {
    alignSelf: 'stretch',
  },
  picker: {
    flex: 1,
  },
  slider: {
    marginTop: 20,
  },
  track: {
    height: 6,
    borderRadius: 3,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: colors.white,
  },
})
