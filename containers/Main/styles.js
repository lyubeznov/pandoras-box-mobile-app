import { StyleSheet } from 'react-native'

import { colors } from 'styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  content: {
    flex: 1,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },
  colorPreview: {
    // flex: 1,
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  picker: {
    alignSelf: 'stretch',
    height: 400,
  },
  buttons: {
    // flex: 1,
    alignSelf: 'stretch',
    marginTop: 30,
  },
  notConnectedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notConnectedText: {
    fontSize: 20,
    color: 'white',
  },
  waitingForConnection: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
})
