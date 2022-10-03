const express = require('express');
const router = express.Router();

module.exports = () => {
  const signUpController = new SignUpController(req, res);
  router.post('/signup', ExpressRouterAdpter.adapt(signUpController)); 
}

// 4) Refactor - Express Route Adapter [Main Layer]
class ExpressRouterAdpter {
  static adapt (controller) {
    return async (req, res /* Req/Res do Express */) => {
      const httRequest = {
        payload: req.body
      }
      const httpResponse = await controller.handle(httRequest)
      res.status(httpResponse.statusCode).json(httpResponse.result)
    }  
  } 
}


// 2) Refactor - Separate Controllers (sign-up-controller) [Presentation Layer]
class SignUpController { // Controller/Router/HttpDispatcher 

  async handle (httpRequest /* Custom HttpRequest */ ) {
    const { email, password, repeatPassword } = httpRequest.payload;

    const signUpUseCase = new SignUpUseCase()
    const user  = await signUpUseCase.execute(email, password, repeatPassword)
    
    /* Custom HttpResponse */
    return {
      statusCode: 200,
      result: user
    }
  }
}

// 1) Refactor - Separate our 'Business Rules' in use case's (sign-up.usecase) [Domain Layer | Application Layer]
class SignUpUseCase {
  async execute (email, password, repeatPassword) {
    // If we need change database, well, change the repository(implementation)
    const repository = new AddAccountRepository();
    if (password === repeatPassword) {
      await repository.add(email, password, repeatPassword)
    }
  }
}

// 3) Refactor - Separate our Database Access in repositories (add-account.repository) [Infrastructure Layer]
const mongoose = require('mongoose');
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async add (email, password, repeatPassword) {
    const user = await AccountModel.create({ email, password });
    return user;
  }
}
