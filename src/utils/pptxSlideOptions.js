let styleOptions = defaultStyles()

function slideOptions(htmlJson) {
  let htmlElement = htmlJson[0]

  if(htmlElement.type === 'text'){
    return Object.assign(styleOptions, { text: htmlElement.content })
  }

  switch (htmlElement.tagName) {
    case 'div':
    case 'span':
      let attribute = htmlElement.attributes[0].value

      if (attribute.includes('text-align')) {
        let align = attribute.substring(12, attribute.length - 1)
        styleOptions.styles.align = align
      }
      else {
        let fontSize = attribute.substring(11, attribute.length - 3)
        styleOptions.styles.fontSize = parseInt(fontSize)
      }
      break

    case 'b':
      styleOptions.styles.bold = true;
      break

    case 'i':
      styleOptions.styles.italic = true;
      break

    case 'u':
      styleOptions.styles.underline = true;
      break
  }

  return slideOptions(htmlElement.children)
}

function defaultStyles() {
  return {
    text: '',
    styles: {
      fontSize: 16,
      bold: false,
      italic: false,
      underline: false,
      align: 'left'
    }
  }
}

export default slideOptions;
