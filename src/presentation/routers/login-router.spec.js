class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.payload) {
      return {
        statusCode: 500
      }
    }

    const { email, password } = httpRequest.payload

    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
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
