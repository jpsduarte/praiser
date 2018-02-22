import * as type from '../actionTypes'

const lyrics = (state = {}, action) => {
  switch(action.type) {
    case type.ADD_LYRIC:
      return lyric(action)

    case type.FORMAT_LYRIC:
      return formatLyric(action)

    case type.BACKGROUND_STYLE:
      return changeBackground(action)

    default:
      return state
  }
}

const lyric = (action) => {
  return action.lyric
}

const formatLyric = (action) => {
  return action.formatLyric
}

const changeBackground = (action) => {
  return action.backgroundStyle
}

export default lyrics
