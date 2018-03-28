import React, { Component } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Animated,
  NetInfo,
} from 'react-native'

import { AnimatedBlurView } from 'components/BlurView'
import ColorPicker from 'components/ColorPicker'
import ColorPreview from 'components/ColorPreview'
import Button from 'components/Button'

import { BoxService } from 'services'
import { System as SystemUtils } from 'utils'

import { common, colors } from 'styles'

import styles from './styles'

const TEST = false

export default class Main extends Component {
  state = {
    online: false,
    blur: {
      enabled: false,
      intensity: new Animated.Value(0),
      opacity: new Animated.Value(0),
    },
    brightness: 0.3,
    color: {
      h: 0,
      s: 0,
      v: 0,
    },
    defaultValues: {
      brightness: 0,
      color: {
        h: 0,
        s: 0,
        v: 0,
      },
    },
  }

  checkConnectionInterval = null

  handleOnlineChanged = online => {
    if (online === this.state.online) {
      return
    }

    const {
      blur: {
        intensity,
        opacity,
      },
    } = this.state

    this.setState(state => ({
      online,
      blur: {
        ...state.blur,
        enabled: TEST ? false : (online ? state.blur.enabled : true), // eslint-disable-line
      },
    }))

    Animated.parallel([
      Animated.timing(intensity, {
        duration: 1000,
        toValue: online ? 0 : 90,
      }),
      Animated.timing(opacity, {
        duration: 1000,
        toValue: online ? 0 : 1,
      }),
    ]).start(() => {
      this.setState(state => ({
        blur: {
          ...state.blur,
          enabled: TEST ? false : !online,
        },
      }))
    })

    if (online) {
      BoxService.getConfiguration().then(res => {
        this.setState({
          brightness: res.brightness,
          color: res.color,
        })
      })
    }
  }

  handleConnectionStatusChanged = ({ type }) => {
    switch (type) {
      case 'none':
      case 'unknown': {
        this.handleOnlineChanged(false)

        break
      }
      default: {
        BoxService.ping().then(isOnline => {
          this.handleOnlineChanged(isOnline)
        })
      }
    }
  }

  checkConnection = () => {
    BoxService.ping().then(isOnline => {
      this.handleOnlineChanged(isOnline)
    })
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.handleConnectionStatusChanged)

    this.checkConnectionInterval = setInterval(this.checkConnection, 1000)
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionStatusChanged)

    if (this.checkConnectionInterval) {
      clearInterval(this.checkConnectionInterval)

      this.checkConnectionInterval = null
    }
  }

  handleColorBrightness = brightness => {
    this.setState({
      brightness,
    })

    // BoxService.setBrightness(brightness)
  }

  handleColorChange = color => {
    this.setState({ color })

    // BoxService.setColor(color)
  }

  handleSetAsDefault = () => {
    const {
      brightness,
      color,
    } = this.state

    BoxService.setConfiguration({
      brightness,
      color,
    }).then(res => BoxService.setDefault().then(() => res)).then(res => {
      this.setState({
        defaultValues: res,
      })
    })
  }

  handleSetConfiguration = () => {
    const {
      brightness,
      color,
    } = this.state

    BoxService.setConfiguration({
      brightness,
      color,
    }).then(res => {
      this.setState({
        brightness: res.brightness,
        color: res.color,
      })
    })
  }

  renderBlurView = (enabled, blurIntensity, opacity) => {
    if (enabled) {
      return (
        <AnimatedBlurView
          style={ common.absoluteFill }
          intensity={ blurIntensity }
          tint="dark"
        >
          <Animated.View style={ [ styles.notConnectedContainer, { opacity }] }>
            <Text style={ styles.notConnectedText }>
              You are not connected to device
            </Text>
            <View style={ styles.waitingForConnection }>
              <Text style={ [ styles.notConnectedText, { fontSize: 16, marginRight: 10 }] }>
                Waiting for connection...
              </Text>
              <ActivityIndicator size="small" color={ colors.white } />
            </View>
            <Button
              style={ { marginTop: 20 } }
              onPress={ () => SystemUtils.openSettings() }
            >
              Open settings
            </Button>
          </Animated.View>
        </AnimatedBlurView>
      )
    }

    return null
  }

  render() {
    const {
      blur: {
        enabled: blurEnabled,
        intensity: blurIntensity,
        opacity: blurOpacity,
      },
      brightness,
      color,
      defaultValues,
    } = this.state

    return (
      <SafeAreaView style={ styles.container }>
        <StatusBar
          barStyle="light-content"
        />
        <View style={ styles.content } tint="dark" intensity={ 100 }>
          <ColorPreview
            style={ styles.colorPreview }
            brightness={ brightness }
            color={ color }
            onPress={ this.handleSetConfiguration }
            onLongPress={ this.handleSetAsDefault }
          />
          <View style={ styles.picker }>
            <ColorPicker
              brightness={ brightness }
              color={ color }
              onChangeColor={ this.handleColorChange }
              onChangeBrightness={ this.handleColorBrightness }
            />
          </View>
        </View>
        { this.renderBlurView(blurEnabled, blurIntensity, blurOpacity) }
      </SafeAreaView>
    )
  }
}
