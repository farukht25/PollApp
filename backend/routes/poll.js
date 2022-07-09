const router = require('express').Router();
let Poll = require('../models/poll.model');

router.route('/').get((req, res) => {
  Poll.find()
    .then(polls => res.json(polls))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const pollName = req.body.pollName;
  const optionCount = Number(req.body.optionCount);
  const option1 = req.body.option1;
  const option2 = req.body.option2;
  const option3 = req.body.option3;
  const option4 = req.body.option4;
  const vote1 = req.body.vote1;
  const vote2 = req.body.vote2;
  const vote3 = req.body.vote3;
  const vote4 = req.body.vote4;

  const newPoll = new Poll({
    pollName,
    optionCount,
    option1,
    vote1,
    option2,
    vote2,
    option3,
    vote3,
    option4,
    vote4,
  });

  newPoll.save()
  .then(() => res.json('poll added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Poll.findById(req.params.id)
    .then(poll => res.json(poll))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Poll.findByIdAndDelete(req.params.id)
    .then(() => res.json('poll deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Poll.findById(req.params.id)
    .then(poll => {
        poll.pollName = req.body.pollName;
        poll.optionCount = Number(req.body.optionCount);
        poll.option1 = req.body.option1;
        poll.option2 = req.body.option2;
        poll.option3 = req.body.option3;
        poll.option4 = req.body.option4;
        poll.vote1 = req.body.vote1;
        poll.vote2 = req.body.vote2;
        poll.vote3 = req.body.vote3;
        poll.vote4 = req.body.vote4;

      Poll.save()
        .then(() => res.json('poll updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;