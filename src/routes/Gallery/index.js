import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'gallery',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      const Gallery = require('./containers/GalleryContainer').default
      const reducer = require('../../store/rectangles').default

      injectReducer(store, { key: 'rect', reducer })

      cb(null, Gallery)
    }, 'gallery')
  }
})
