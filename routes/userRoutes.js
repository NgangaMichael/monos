const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createUser', authMiddleware, UserController.createUser);
router.get('/fetchingUsers', authMiddleware, UserController.fetchingUsers);
router.get('/fetchingOneUser/:id', authMiddleware, UserController.fetchingOneUser);
router.patch('/updateUser/:id', authMiddleware, UserController.updateUser);
router.delete('/deleteUser/:id', authMiddleware, UserController.deleteUser);

module.exports = router;