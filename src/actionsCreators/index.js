import * as type from '../actionTypes'

export const addLyric = (lyric) => {
  const action = {
    type: type.ADD_LYRIC,
    lyric
  }

  return action
}

export const formatLyric = (formatLyric) => {
  const action = {
    type: type.FORMAT_LYRIC,
    formatLyric
  }

  return action
}

export const changeBackground = (backgroundStyle) => {
  const action = {
    type: type.BACKGROUND_STYLE,
    backgroundStyle
  }

  return action
}

export const changeFont = (fontStyle) => {
  const action = {
    type: type.FONT_STYLE,
    fontStyle
  }

  return action
}

export const changeFormat = (formatStyle) => {
  const action = {
    type: type.FORMAT_STYLE,
    formatStyle
  }

  return action
}
