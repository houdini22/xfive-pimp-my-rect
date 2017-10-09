import React from 'react'
import PropTypes from 'prop-types'
import { Paper, GridList, GridTile, IconButton } from 'material-ui'
import CSSModules from 'react-css-modules'
import RectangleItem from '../../../components/RectangleItem'
import DeleteIcon from 'react-material-icons/icons/action/delete'
import { red300 } from 'material-ui/styles/colors'
import styles from './Gallery.scss'

export class Gallery extends React.Component {
  static propTypes = {
    rectangles: PropTypes.array.isRequired,
    removeItem: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { getAll } = this.props
    getAll()
  }

  renderItems () {
    const { rectangles, removeItem } = this.props

    return (
      <GridList
        cellHeight={260}
        cols={3}
      >
        {rectangles.map((item, i) => {
          return (
            <GridTile
              key={item.ID}
              styleName='grid-tile'
              title=' '
              actionIcon={<IconButton onClick={() => removeItem(item.ID)}><DeleteIcon color={red300} /></IconButton>}
              actionPosition='left'
              titlePosition='top'
              titleBackground='linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.1) 70%,rgba(0,0,0,0) 100%)'
            >
              <div styleName='grid-tile-rect-container'>
                <RectangleItem {...item} />
              </div>
            </GridTile>
          )
        })}
      </GridList>
    )
  }

  render () {
    return (
      <div>
        <h3 styleName='page-header'>Gallery</h3>
        <Paper styleName='gallery'>
          <div>
            {this.renderItems()}
          </div>
        </Paper>
      </div>
    )
  }
}

export default CSSModules(Gallery, styles)
