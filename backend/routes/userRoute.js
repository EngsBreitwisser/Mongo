// backend/routes/userRoute.js
const express = require('express');
const { loginUser, getUserAgenda, addReminder } = require('../controllers/userController.js');

const router = express.Router();

router.post('/login', loginUser);
router.get('/agenda/:email', getUserAgenda);
router.post('/agenda/reminder', addReminder); // Rota para adicionar lembrete

module.exports = router;
