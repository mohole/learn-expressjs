const express = require('express');
const mysql = require('mysql');

var router = express.Router();

const connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'expressjs'
});

connection.connect();

/* GET all movies listing. */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM `movies`', function (err, rows, fields) {
    if (err) throw err;
    res.json(rows);
  });

});

/* GET single movie */
router.get('/:id', function (req, res, next) {
  //console.log(req.params);
  const id = req.params.id;
  connection.query(`SELECT * FROM \`movies\` WHERE id = ${id}`, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows[0]);
  });
  
});

/* Create a new movie entry */
router.post('/', function (req, res, next) {
  //console.log(req.body);
  const { title, year, description, poster } = {...req.body};
  connection.query(`INSERT INTO \`movies\` (\`id\`, \`title\`, \`poster\`, \`year\`, \`description\`) VALUES (NULL, '${title}', '${poster}', '${year}', '${description}')`,
    function (err, rows, fields) {
      if (err) throw err;

      res.json({
        message: 'Movie added to the DB',
        messageCode: 'movie-add-ok'
      });
    });
});

router.put('/:id', function (req, res, next) {
  const id = req.params.id;
  const { title, year, description, poster } = { ...req.body };
  
  connection.query(`UPDATE \`movies\` SET \`title\` = '${title}', \`year\` = '${year}', \`description\` = '${description}', \`poster\` = '${poster}' WHERE \`movies\`.\`id\` = ${id}`,
    function (err, rows, fields) {
      if (err) throw err;

      res.json({
        message: `Movie ${id} aupdated`,
      });
    });
});

router.delete('/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(`DELETE FROM \`movies\` WHERE id = ${id}`, function (err, rows, fields) {
    if (err) throw err;
    res.json({
      message: `The entry with ID ${id} has been deleted`
    });
  });
});

module.exports = router;
