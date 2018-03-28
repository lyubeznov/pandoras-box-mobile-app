import { Linking } from 'react-native'

const openSettings = () => {
  const url = 'App-prefs:root=WIFI'

  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    }
  }).catch(() => {})
}

export { openSettings }
