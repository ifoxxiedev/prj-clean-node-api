import { MissingParamError } from '../errors/missing-param-error'
import { LoginRouter } from './login-router'
class AuthUseCaseSpy {
  auth (email, password) {
    this.email = email
    this.password = password
  }
}

const makeSut = () => {
  const authUseCaseSpy = new AuthUseCaseSpy()
  const loginRouter = new LoginRouter(authUseCaseSpy)

  return {
    loginRouter,
    authUseCaseSpy
  }
}

describe('Login Router', () => {
  it('Should return 400 if no email is provided', () => {
    const httpRequest = {
      payload: {
        passowrd: 'any_password'
      }
    }

    const { loginRouter } = makeSut()
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

    const { loginRouter } = makeSut()
    const httpResponse = loginRouter.route(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.result).toStrictEqual(new MissingParamError('password'))
  })

  it('Should return 500 if  no httpRequest is provided', () => {
    const { loginRouter } = makeSut()
    const httpResponse = loginRouter.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  it('Should return 500 if no httpRequest no has payload', () => {
    const { loginRouter } = makeSut()
    const httpResponse = loginRouter.route({})
    expect(httpResponse.statusCode).toBe(500)
  })

  it.only('Should call AuthUseCase with correct params', () => {
    const { loginRouter, authUseCaseSpy } = makeSut()

    const httpRequest = {
      payload: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    //  SpyOn
    // jest.spyOn(authUseCase, 'auth').mockResolvedValue(httpRequest.payload.email)
    loginRouter.route(httpRequest)

    expect(authUseCaseSpy.email).toBe(httpRequest.payload.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.payload.password)
  })
})
