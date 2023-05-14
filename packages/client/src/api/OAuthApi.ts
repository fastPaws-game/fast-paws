import FetchApi from '../utils/fetchApi'
import isServer from '../utils/isServerChecker'

const CLIENT_URL = 'http://localhost:3000'

const getRedirectUrl = () => (!isServer ? window.location.origin : CLIENT_URL)

const redirectUrl = getRedirectUrl()
const oauthUrlBase = 'https://oauth.yandex.ru/authorize'

class OAuthApi {
  public getServiceId() {
    return FetchApi.get(`/oauth/yandex/service-id/?redirect_uri=${redirectUrl}`)
  }

  public getOAuthUrl(serviceId: string) {
    return `${oauthUrlBase}/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`
  }

  public signin(code: string) {
    return FetchApi.post('/oauth/yandex/', {
      body: JSON.stringify({
        code,
        redirect_uri: redirectUrl,
      }),
    })
  }
}
export default new OAuthApi()
