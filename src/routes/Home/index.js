import { injectReducer } from '../../store/reducers'
import { reducer as formReducer } from 'redux-form'

export default (store) => ({
  path: '',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Home = require('./containers/HomeContainer').default
      const reducer = require('../../store/rectangles').default

      injectReducer(store, { key: 'rect', reducer })
      injectReducer(store, { key: 'form', reducer: formReducer })

      cb(null, Home)
    }, 'home')
  }
})
