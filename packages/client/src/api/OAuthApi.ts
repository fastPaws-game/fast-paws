import FetchApi from '../utils/fetchApi'

export const redirectUrl = 'http://localhost:3000'

class OAuthApi {
  public getServiceId() {
    return FetchApi.get(`/oauth/yandex/service-id/?redirect_uri=${redirectUrl}`)
  }

  public getOAuthUrl(serviceId: string) {
    return `https://oauth.yandex.ru/authorize/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`
  }

  public signin(code: string | number) {
    return FetchApi.post('/oauth/yandex/', {
      body: JSON.stringify({
        code,
        redirect_uri: redirectUrl,
      }),
    })
  }
}
export default new OAuthApi()
