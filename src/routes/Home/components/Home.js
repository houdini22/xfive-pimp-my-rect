import React from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import RectFormContainer from '../containers/RectFormContainer'
import RectPreview from './RectPreview'
import Toolbox from '../../../components/Toolbox'
import LoadingIndicator from '../../../components/LoadingIndicator'
import styles from './Home.scss'

export class HomeView extends React.Component {
  static propTypes = {
    createNew: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
    currentItem: PropTypes.object,
    createNewInProgress: PropTypes.bool
  }

  getActions () {
    const { createNew, saveItem, currentItem, createNewInProgress } = this.props

    return [
      {
        label: () => {
          if (!currentItem) {
            return 'New'
          }
          return 'Reset'
        },
        onClick: () => createNew(),
      },
      {
        label: () => {
          if (createNewInProgress) {
            return <LoadingIndicator />
          }
          return 'Save'
        },
        onClick: () => saveItem(currentItem),
        disabled: !currentItem || createNewInProgress
      }
    ]
  }

  render () {
    const { currentItem } = this.props

    return (
      <div>
        <Toolbox
          title='Create'
          actions={this.getActions()}
        >
          {!!currentItem && (
            <div>
              <RectFormContainer currentItem={currentItem} />
              <RectPreview rect={currentItem} />
            </div>
          )}
        </Toolbox>
      </div>
    )
  }
}

export default CSSModules(HomeView, styles)
