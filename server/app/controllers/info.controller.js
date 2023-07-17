const db = require("../models");
const Info = db.infos;

// Create and Save a new Info
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Info
  const info = new Info({
    name: req.body.name,
    surname: req.body.surname,
    image: req.body.image,
    birthdate: req.body.birthdate,
    citizenship: req.body.citizenship,
    genres: req.body.genres,
    history: req.body.history,
  });

  // Save the Info in the database
  info.save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new Information."
      });
    });
};


// Retrieve all Infos from the database.
exports.findAll = (req, res) => {
  Info.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving informations."
      });
    });
};

// Get artists by genre
exports.getArtistsByGenre = (req, res) => {
  const genre = req.params.genre;
  Info.find({ genres: genre })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "Error retrieving artists by genre: " + genre
      });
    });
};

// Find a single Info with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Info.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found info with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving info with id=" + id });
    });
};



// Update a Info 
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  Info.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Info with id=${id}. Maybe Info was not found!`
        });
      } else res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Info with id=" + id
      });
    });
};


// Delete a Info with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Info.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Info with id=${id}. Maybe Info was not found!`
        });
      } else {
        res.send({
          message: "Info was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Info with id=" + id
      });
    });
};

// Find a Info usando il fulltext come fa google
exports.findString = (req, res) => {

  const testo = req.params.text;


  Info.find(
    { $text: { $search : testo } },
    { score : { $meta: "textScore" } 
  } 
).sort( 
  {  score: { $meta : 'textScore' } }
    )
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found info with testo " + testo });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving info with testo=" + testo });
    });
};


