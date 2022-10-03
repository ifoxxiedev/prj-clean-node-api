const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const AccountModel = mongoose.model('Account')

/*
Some problmes
*/

module.exports = () => {
  // 1) Strong coupling with framework (in this case express)
  router.post('/signup', async (req, res) => {

    if (password === repeatPassword) {
      // 2) Database access
      const user = await AccountModel.create({ email, password });
      return res.json(user);
    }

    // 3) Validation
    res.status(500).json({
      error: 'Password must be equal to repeatPassword'
    })
  }); 
}