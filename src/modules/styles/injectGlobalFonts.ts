import { GLOBAL_FONT_FACE_CSS } from './fontFaceCss'

const GLOBAL_FONTS_STYLE_ID = 'emily-global-fonts'

export function injectGlobalFonts(doc: Document = document) {
  if (!doc.getElementById(GLOBAL_FONTS_STYLE_ID)) {
    const globalFonts = doc.createElement('style')
    globalFonts.id = GLOBAL_FONTS_STYLE_ID
    globalFonts.textContent = GLOBAL_FONT_FACE_CSS
    doc.head.append(globalFonts)
  }

  if (doc.fonts && typeof doc.fonts.load === 'function') {
    Promise.allSettled([
      doc.fonts.load('400 16px "Work Sans"'),
      doc.fonts.load('400 16px "Archivo"'),
    ]).then(() => {
      const hasWorkSans = doc.fonts.check('16px "Work Sans"')
      const hasArchivo = doc.fonts.check('16px "Archivo"')

      if (!hasWorkSans || !hasArchivo) {
        console.warn('[emily-realestate] Custom fonts failed to load; browser fallbacks may be used.', {
          workSansLoaded: hasWorkSans,
          archivoLoaded: hasArchivo,
        })
      }
    })
  }
}
