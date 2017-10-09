import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, ToolbarGroup, IconButton, RaisedButton } from 'material-ui'
import Home from 'react-material-icons/icons/action/home'
import CSSModules from 'react-css-modules'
import styles from './PageLayout.scss'

const muiTheme = getMuiTheme({})

class PageLayout extends React.Component {
  render () {
    const { children } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
            <AppBar
              title='Pimp My Rect ( ͡° ͜ʖ ͡°)'
              iconElementLeft={(
                <IconButton
                  containerElement={<Link to='/' />}
                >
                  <Home />
                </IconButton>
              )}
            >
              <ToolbarGroup>
                <RaisedButton
                  primary
                  label='Gallery'
                  containerElement={<Link to='gallery' />}
                />
              </ToolbarGroup>
            </AppBar>
          </div>
          <div styleName='content-container'>
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired
}

export default CSSModules(PageLayout, styles)
