import { parse } from 'himalaya'
import pptxjs from 'pptxgenjs'

import pptxSlideOption from '../utils/pptxSlideOptions'

export default function(htmlSlides, options) {
  htmlSlides.forEach((item, index) => {
    if (item.includes('\n\n')) {
      htmlSlides[index] = item.trim()
    }
  })

  htmlSlides.pop()

  let pptx = new pptxjs()
  pptx.setBrowser(true)
  pptx.setLayout(options.format)
  pptx.defineSlideMaster({ title: 'Master', bkgd: options.bg })

  htmlSlides.map((htmlSlideItem) => {
    let slide = pptx.addNewSlide('Master')
    slide.color = options.inner.replace('#','')

    const lstHtmlJson = parse(htmlSlideItem)

    const textStyles = pptxSlideOption(lstHtmlJson)

    const textOptions = Object.assign({}, options, defaultPositions(), textStyles.styles)

    slide.addText(textStyles.text, textOptions)
  })

  pptx.save(`NomeMusica`)
}

function defaultPositions() {
  return {
    x: '10%',
    y: '15%',
    w: '80%',
    h: '70%',
    autoFit: true,
    valign: 'middle',
    fontSize: 16
  }
}
