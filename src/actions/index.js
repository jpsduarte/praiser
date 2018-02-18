import * as constants from '../constants'

export const addLyric = (lyric) => {
  const action = {
    type: constants.ADD_LYRIC,
    lyric
  }

  return action
}

export const formatLyric = (formatLyric) => {
  const action = {
    type: constants.FORMAT_LYRIC,
    formatLyric
  }

  return action
}

