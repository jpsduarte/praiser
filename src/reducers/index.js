import * as type from '../actionTypes'

const initialState = {
  lyric: '',
  formattedLyric: '',
  backgroundStyle: {
    bg: '',
    inner: ''
  },
  fontStyle: {
    font: ''
  },
  screenStyle: {
    screenFormat: ''
  }
}

const praiserApp = (state = initialState, action) => {
  switch(action.type) {
    case type.ADD_LYRIC:
      return lyric(state, action)

    case type.FORMAT_LYRIC:
      return formatLyric(state, action)

    case type.BACKGROUND_STYLE:
      return changeBackground(state, action)

    default:
      return state
  }
}

const lyric = (state, action) => {
  return Object.assign({}, state, {
    lyric: action.lyric
  })
}

const formatLyric = (state, action) => {
  return Object.assign({}, state, {
    formattedLyric: action.formatLyric
  })
}

const changeBackground = (state, action) => {
  return Object.assign({}, state, {
    backgroundStyle: action.backgroundStyle
  })
}

export default praiserApp
