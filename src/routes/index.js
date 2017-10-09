import CoreLayout from '../layouts/PageLayout/PageLayout'
import HomeRoute from './Home'
import GalleryRoute from './Gallery'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
    GalleryRoute(store)
  ]
})

export default createRoutes
