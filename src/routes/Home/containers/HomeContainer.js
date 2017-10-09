import { connect } from 'react-redux'
import { createNew, saveItem } from '../../../store/rectangles'
import Home from '../components/Home'

const mapDispatchToProps = {
  createNew,
  saveItem
}

const mapStateToProps = (state) => ({
  ...(state.rect)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
