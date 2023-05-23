const express = require('express')

const contactsService = require("../../models/contacts/contacts");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if(!result) {
      res.status(404).json({
      message: `Contact with ${id} not found`
      })
    }
  res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
