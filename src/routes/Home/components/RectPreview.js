import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import RectangleItem from '../../../components/RectangleItem'
import styles from './RectPreview.scss'

export class RectPreview extends React.Component {
  static propTypes = {
    rect: PropTypes.object.isRequired
  }

  render () {
    const { rect } = this.props

    return (
      <div styleName='rect-preview-container'>
        <h3>Preview</h3>
        <div styleName='rect-preview'>
          <RectangleItem
            styleName='rect'
            {...rect}
          />
        </div>
      </div>
    )
  }
}

export default CSSModules(RectPreview, styles)
