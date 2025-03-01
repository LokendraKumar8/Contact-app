const express = require('express');
const router = express.Router();
const {getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);//if we want to protect all the routes and need a token to validate
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;