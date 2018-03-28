import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { View } from 'react-native'

import { TriangleColorPicker } from 'react-native-color-picker'
import Slider from 'react-native-slider'

import { colors } from 'styles'
import styles from './styles'

export default class ColorPicker extends Component {
  static propTypes = {
    brightness: PropTypes.number.isRequired,
    color: PropTypes.shape({
      h: PropTypes.number.isRequired,
      s: PropTypes.number.isRequired,
      v: PropTypes.number.isRequired,
    }).isRequired,
    onChangeBrightness: PropTypes.func,
    onChangeColor: PropTypes.func,
  }

  static defaultProps = {
    onChangeBrightness: () => {},
    onChangeColor: () => {},
  }

  updateState = props => ({
    color: props.color,
  })

  state = this.updateState(this.props)

  componentWillReceiveProps(props) {
    this.setState(this.updateState(props))
  }

  handleChangeBrightness = value => {
    this.props.onChangeBrightness(value)
  }

  handleChangeColor = component => value => {
    const {
      color,
      onChangeColor,
    } = this.props

    onChangeColor({
      ...color,
      [component]: value,
    })
  }

  handleColorChanged = color => {
    this.props.onChangeColor(color)
  }

  render() {
    const {
      style,
      color,
      brightness,
    } = this.props

    return (
      <View style={ [ styles.container, style ] }>
        <TriangleColorPicker
          style={ styles.picker }
          showColorPreviews={ false }
          color={ color }
          onColorChange={ this.handleColorChanged }
        />
        <Slider
          style={ styles.slider }
          trackStyle={ styles.track }
          thumbStyle={ styles.thumb }
          minimumTrackTintColor={ colors.orange }
          maximumTrackTintColor={ colors.grey }
          value={ brightness }
          onValueChange={ this.handleChangeBrightness }
        />
      </View>
    )
  }
}
