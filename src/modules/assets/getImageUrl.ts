const REPO_OWNER = 'joanca'
const REPO_NAME = 'realstate-website'
const REPO_BRANCH = 'main'
const REPO_IMAGES_PATH = 'src/assets/images'
const PROD_IMAGE_PROXY_BASE = 'https://aravena.me/img?src='

function getRepoImageSource(filename: string) {
  return `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${REPO_IMAGES_PATH}/${filename}`
}

export function resolveIsViteDev(viteEnv?: { DEV?: unknown }) {
  return Boolean(viteEnv?.DEV)
}

export function getImageUrl(
  filename: string,
  options: {
    isViteDev?: boolean
    localUrl?: string
  } = {},
) {
  const {
    isViteDev = resolveIsViteDev(import.meta.env),
    localUrl = `/assets/images/${filename}`,
  } = options

  if (isViteDev) {
    return localUrl
  }

  return `${PROD_IMAGE_PROXY_BASE}${encodeURIComponent(getRepoImageSource(filename))}`
}
