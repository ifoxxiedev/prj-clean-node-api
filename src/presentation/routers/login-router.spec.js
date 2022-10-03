class LoginRouter {
  route (httpRequest) {
    if (!httpRequest.payload.email) {
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

  // it('Should return 400 if no password is provided', () => {
  //   const httpRequest = {
  //     payload: {
  //       email: 'any_email'
  //     }
  //   }

  //   const loginRouter = new LoginRouter()
  //   const httpResponse = loginRouter.route(httpRequest)

  //   expect(httpResponse.statusCode).toBe(400)
  // })
})
