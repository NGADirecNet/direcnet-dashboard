const express = require('express');
const router = express.Router();

const heroesService = require('../hero-service');
const testService = require('../testService');
const tduResService = require('../tduResService');
const calendarService = require('../calendarService');
const atlassianservice = require('../atlassianservice');
const weatherService = require('../weatherService');
const sceneService = require('../sceneService');
const dashService = require('../dashService');

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

router.delete('/deleteTest/:_id', (req, res) => {
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

router.get('/bitbucket/branches', (req, res) => {
  atlassianservice.get(req, res);
})

router.get('/bitbucket/commits/:branch(*)', (req, res) => {
  atlassianservice.getCommits(req, res);
})

router.get('/bitbucket/progress', (req, res) => {
  atlassianservice.getProgress(req, res);
})

router.get('/weather/:lat/:long', (req, res) => {
  weatherService.get(req, res);
})

router.get('/map', (req, res) => {
  sceneService.get(req, res);
});

router.put('/createMap', (req, res) => {
  sceneService.create(req, res)
})

router.post('/updateMap', (req, res) => {
  sceneService.update(req, res)
})

router.delete('/deleteMap/:_id', (req, res) => {
  sceneService.destroy(req, res)
})

router.get('/dash', (req, res) => {
  dashService.get(req, res);
});

router.post('/updateDash', (req, res) => {
  dashService.update(req, res);
});

module.exports = router;