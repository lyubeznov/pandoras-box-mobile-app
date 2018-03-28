import React from 'react'
import PropTypes from 'prop-types'

import { View, Text, TouchableOpacity } from 'react-native'

import tinycolor from 'tinycolor2'

import { colors } from 'styles'
import styles from './styles'

const getHsvString = color => tinycolor(color).toHsvString()
const getRgbString = color => tinycolor(color).toRgbString()
const getBrightnessString = brightness => `brightness(${Math.round(brightness * 100)}%)`

const calculatePreviewStyle = color => ({
  backgroundColor: getRgbString(color),
})

const calculateTextStyle = color => ({
  color: tinycolor(color).isDark() ? colors.light : colors.dark,
})

const ColorPreview = props => (
  <View style={ [ styles.container, props.style ] }>
    <TouchableOpacity
      style={ [ styles.colorPreview, calculatePreviewStyle(props.color) ] }
      activeOpacity={ 0.75 }
      onPress={ props.onPress }
      onLongPress={ props.onLongPress }
    >
      <Text style={ [ styles.colorText, calculateTextStyle(props.color) ] }>
        { getHsvString(props.color) }{'\n'}
        { getRgbString(props.color) }{'\n'}
        { getBrightnessString(props.brightness)}
      </Text>
      <View style={ styles.textContainer }>
        <Text style={ styles.text }>Tap to set color</Text>
        <Text style={ styles.text }>Tap long to set as default</Text>
      </View>
    </TouchableOpacity>
  </View>
)

ColorPreview.propTypes = {
  style: PropTypes.number,
  brightness: PropTypes.number.isRequired,
  color: PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    v: PropTypes.number.isRequired,
  }).isRequired,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
}

ColorPreview.defaultProps = {
  style: null,
  onPress: () => {},
  onLongPress: () => {},
}

export default ColorPreview
