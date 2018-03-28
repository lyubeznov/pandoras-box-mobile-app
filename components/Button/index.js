import React from 'react'
import PropTypes from 'prop-types'

import { Text, TouchableOpacity } from 'react-native'

import styles from './styles'

const Button = props => {
  const Component = TouchableOpacity

  return (
    <Component
      style={ [ styles.button, props.style ] }
      onPress={ props.onPress }
      disabled={ props.disabled }
    >
      <Text style={ styles.text }>
        { props.children }
      </Text>
    </Component>
  )
}

Button.propTypes = {
  // type: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  // type: 'opacity',
  children: '',
  onPress: () => {},
  disabled: false,
}

export default Button
