export function normalizeEmbeddedDom() {
  const wrapper = document.getElementById('wrapper')
  const pageWrapper = wrapper?.querySelector('.wrapper.responsive.page-wrapper')
  const main = document.querySelector('main#emily-realestate')
  const pushFooter = wrapper?.querySelector('.push-footer')
  const customFooter = document.querySelector('.custom-footer')

  if (!wrapper || !pageWrapper || !main) {
    return
  }

  wrapper.removeAttribute('class')

  pageWrapper.id = 'react-root'
  pageWrapper.removeAttribute('class')

  if (pushFooter && customFooter && customFooter.previousElementSibling !== pushFooter) {
    customFooter.parentElement?.insertBefore(pushFooter, customFooter)
  }

  if (main.parentElement !== pageWrapper) {
    pageWrapper.replaceChildren(main)
  }
}
