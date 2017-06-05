var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  bigQuery.startQuery(req.body.options)
    .then((results) => {
      job = results[0];
      return job.promise();
    })
    .then(() => {
      return job.getQueryResults();
    })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

module.exports = router;
