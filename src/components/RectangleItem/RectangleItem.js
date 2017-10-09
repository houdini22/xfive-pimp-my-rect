import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './RectangleItem.scss'

class RectangleItem extends React.Component {
  static propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    borderRadius: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }

  render () {
    const { backgroundColor, borderRadius, size } = this.props

    return (
      <div
        styleName='rectangle-item'
        style={{ backgroundColor, width: `${size}px`, height: `${size}px`, borderRadius: `${borderRadius}px` }}
      />
    )
  }
}

export default CSSModules(RectangleItem, styles)
