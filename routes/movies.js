const express = require('express');
const connection = require('./../db');

const router = express.Router();

/**
 * GET all movies
 */
router.get('/', function (req, res, next) {
  connection.query('SELECT * FROM `movies`', function (err, rows, fields) {
    if (err) throw err;

    /**
     * Outputs only ID and TITLE for each movie to get a lighter response
     */
    const data = rows.map(e => ({ 
      id: e.id, 
      title: e.title 
    }));

    res.json(data);
  });

});

/**
 * GET a single movie by "id"
 */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;

  connection.query(`SELECT * FROM \`movies\` WHERE id = ${id}`, function (err, rows, fields) {
    if (err) throw err;
    res.json(rows[0]);
  });
  
});

/**
 * Create a new movie entry
 */
router.post('/', function (req, res, next) {
  const { title, year, description, poster } = {...req.body};

  connection.query(`INSERT INTO \`movies\` (\`id\`, \`title\`, \`poster\`, \`year\`, \`description\`) VALUES (NULL, '${title}', '${poster}', '${year}', '${description}')`,
    function (err, rows, fields) {
      if (err) throw err;

      res.json({
        message: 'Movie added to the DB'
      });
    });
});

/**
 * Update a movie data
 */
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

/**
 * Delete a movie
 */
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
