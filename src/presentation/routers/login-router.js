import { MissingParamError } from '../errors/missing-param-error'
import { HttpResponse } from '../helpers/http-response'

export class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.payload) {
      return HttpResponse.serverError()
    }

    const { email, password } = httpRequest.payload

    if (!email) {
      return HttpResponse.badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return HttpResponse.badRequest(new MissingParamError('password'))
    }

    this.authUseCase.auth(email, password)
  }
}
