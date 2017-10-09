import { connect } from 'react-redux'
import { getAll, removeItem } from '../../../store/rectangles'
import Gallery from '../components/Gallery'

const mapDispatchToProps = {
  getAll,
  removeItem,
}

const mapStateToProps = (state) => ({
  ...(state.rect)
})

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
