import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import { Paper, ToolbarGroup, Toolbar, RaisedButton, ToolbarSeparator, ToolbarTitle } from 'material-ui'
import _ from 'lodash'
import styles from './Toolbox.scss'

class Toolbox extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.array.isRequired,
    children: PropTypes.node.isRequired
  }

  render () {
    const { children, title, actions } = this.props

    return (
      <Paper>
        <Toolbar>
          <ToolbarTitle text={title} />
          <ToolbarGroup>
            <ToolbarSeparator />
            {actions.map((action, i) => {
              let { label, onClick, disabled } = action

              if (_.isFunction(label)) {
                label = label()
              }

              return (
                <RaisedButton
                  key={i}
                  label={label}
                  onClick={onClick}
                  disabled={disabled}
                  styleName='toolbar-button' />
              )
            })}
          </ToolbarGroup>
        </Toolbar>
        {children && (
          <div styleName='toolbox-content'>
            {children}
          </div>
        )}
      </Paper>
    )
  }
}

export default CSSModules(Toolbox, styles)
