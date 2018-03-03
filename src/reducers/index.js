import * as type from '../actionTypes'

const initialState = {
  lyric: 'Roboto Light',
  formattedLyric: '',
  backgroundStyle: {
    bg: '#000000',
    inner: '#8393ca'
  },
  fontStyle: '',
  formatStyle: ''
}

const praiserApp = (state = initialState, action) => {
  switch(action.type) {
    case type.ADD_LYRIC:
      return lyric(state, action)

    case type.FORMAT_LYRIC:
      return formatLyric(state, action)

    case type.BACKGROUND_STYLE:
      return changeBackground(state, action)

    case type.FONT_STYLE:
      return changeFont(state, action)

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

const changeFont = (state, action) => {
  return Object.assign({}, state, {
    fontStyle: action.fontStyle
  })
}

const changeFormat = (state, action) => {
  return Object.assign({}, state, {
    formatStyle: action.formatStyle
  })
}

export default praiserApp
