import { MissingParamError } from '../errors/missing-param-error'
import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
  constructor (authUseCase) { // Composition && Inversion Control
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.payload || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest.payload

    if (!email) {
      return HttpResponse.badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return HttpResponse.badRequest(new MissingParamError('password'))
    }

    const accessToken = this.authUseCase.auth(email, password)

    if (!accessToken) {
      return HttpResponse.unauthorized()
    }

    return HttpResponse.ok()
  }
}
