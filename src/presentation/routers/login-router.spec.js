class LoginRouter {
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
  }
}

class MissingParamError extends Error {
  constructor (paramName) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

class HttpResponse {
  static badRequest (result) {
    return { statusCode: 400, result }
  }

  static serverError (result) {
    return { statusCode: 500, result }
  }
}

describe('Login Router', () => {
  it('Should return 400 if no email is provided', () => {
    const httpRequest = {
      payload: {
        passowrd: 'any_password'
      }
    }

    const loginRouter = new LoginRouter()
    const httpResponse = loginRouter.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.result).toStrictEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', () => {
    const httpRequest = {
      payload: {
        email: 'any_email@mail.com'
      }
    }

    const loginRouter = new LoginRouter()
    const httpResponse = loginRouter.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.result).toStrictEqual(new MissingParamError('password'))
  })

  it('Should return 500 if  no httpRequest is provided', () => {
    const loginRouter = new LoginRouter()
    const httpResponse = loginRouter.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  it('Should return 500 if no httpRequest no has payload', () => {
    const loginRouter = new LoginRouter()
    const httpResponse = loginRouter.route({})
    expect(httpResponse.statusCode).toBe(500)
  })
})
