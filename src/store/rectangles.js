import database from '../modules/database'

// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_CURRENT_ITEM = 'Rect::UPDATE_CURRENT_ITEM'
export const SAVE_CURRENT_ITEM = 'Rect::SAVE_CURRENT_ITEM'
export const CREATE_NEW_IN_PROGRESS = 'Rect::CREATE_NEW_IN_PROGRESS'
export const RECTANGLES_LOADED = 'Rect::RECTANGLES_LOADED'
export const REMOVE_ITEM = 'Rect::REMOVE_ITEM'
const RECTANGLES_START_LOADING = 'Rect::RECTANGLES_START_LOADING'

// else
export let initialValues = {
  backgroundColor: '#000000',
  size: 100,
  borderRadius: 5,
  touched: false
}

// ------------------------------------
// Actions
// ------------------------------------
export const createNew = () => (dispatch) => {
  dispatch(updateCurrentItem({
    ...initialValues
  }))
}

export const updateCurrentItem = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_ITEM,
    payload: item
  })
}

export const createInProgress = (val) => (dispatch) => {
  dispatch({
    type: CREATE_NEW_IN_PROGRESS,
    payload: val
  })
}

const rectanglesStartLoading = () => (dispatch) => {
  dispatch({
    type: RECTANGLES_START_LOADING
  })
}

export const getAll = () => (dispatch) => {
  dispatch(rectanglesStartLoading())
  const rectangles = database.queryAll('rectangles', {
    sort: [['ID', 'DESC']]
  })
  dispatch({
    type: RECTANGLES_LOADED,
    payload: rectangles
  })
}

export const saveItem = (item) => (dispatch) => {
  dispatch(createInProgress(true))
  // async example
  setTimeout(() => {
    const { backgroundColor, borderRadius, size } = item
    database.insert('rectangles', {
      backgroundColor,
      borderRadius,
      size
    })
    database.commit()
    dispatch(createInProgress(false))
  }, 1000)
}

export const removeItem = (id) => (dispatch) => {
  // TODO: async
  database.deleteRows('rectangles', { ID: id })
  database.commit()
  dispatch({
    type: REMOVE_ITEM,
    payload: id
  })
}

export const actions = {
  createNew,
  updateCurrentItem,
  saveItem,
  getAll,
  removeItem,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_CURRENT_ITEM]: (state, { payload }) => {
    return {
      ...state,
      currentItem: { ...payload }
    }
  },
  [CREATE_NEW_IN_PROGRESS]: (state, { payload }) => {
    return {
      ...state,
      createNewInProgress: payload,
      currentItem: payload ? state.currentItem : null
    }
  },
  [RECTANGLES_LOADED]: (state, { payload }) => {
    return {
      ...state,
      rectangles: [...payload],
      rectanglesLoading: false
    }
  },
  [RECTANGLES_START_LOADING]: (state, { payload }) => {
    return {
      ...state,
      rectanglesLoading: true
    }
  },
  [REMOVE_ITEM]: (state, { payload }) => {
    return {
      ...state,
      rectangles: state.rectangles.filter((item) => {
        return item.ID !== payload
      })
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentItem: null,
  createNewInProgress: false,
  rectangles: [],
  rectanglesLoading: false
}

export default function rectReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
