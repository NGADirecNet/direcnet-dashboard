const express = require('express');
const router = express.Router();

const heroesService = require('../hero-service');
const testService = require('../testService');
const tduResService = require('../tduResService');
const calendarService = require('../calendarService');

router.get('/heroes', (req, res) => {
  heroesService.get(req, res);
});

router.put('/hero', (req, res) => {
  heroesService.create(req, res);
});

router.post('/hero', (req, res) => {
  heroesService.update(req, res);
});

router.delete('/hero/:id', (req, res) => {
  heroesService.destroy(req, res);
});

// router.get('/test', (req, res) => {
//     res.json('Testing backend')
// })

router.get('/test', (req, res) => {
  testService.get(req, res);
});

router.put('/createTest', (req, res) => {
  testService.create(req, res)
})

router.post('/updateTest', (req, res) => {
  testService.update(req, res)
})

router.delete('/deleteTest/:id', (req, res) => {
  testService.destroy(req, res)
})

router.get('/tduRes', (req, res) => {
  tduResService.get(req, res);
});

router.put('/createTduRes', (req, res) => {
  tduResService.create(req, res);
})

router.get('/getCalendar', (req, res) => {
  calendarService.get(req, res);
})

router.put('/createCalendar', (req, res) => {
  calendarService.create(req, res);
})

router.post('/updateCalendar', (req, res) => {
  calendarService.update(req, res);
})

router.delete('/deleteCalendar/:Id', (req, res) => {
  calendarService.destroy(req, res);
})

module.exports = router;