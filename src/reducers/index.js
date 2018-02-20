import * as constants from '../constants'

const lyric = (action) => {
  return action.lyric
}

const formatLyric = (action) => {
  return action.formatLyric
}

const lyrics = (state = [], action) => {
  switch(action.type) {
    case constants.ADD_LYRIC:
      return lyric(action)

    case constants.FORMAT_LYRIC:
      return formatLyric(action)

    default:
      return state
  }
}

export default lyrics
