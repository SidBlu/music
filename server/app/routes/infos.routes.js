module.exports = app => {
    const infos = require("../controllers/info.controller.js");
    var router = require("express").Router();
    // Create a new Info
    router.post("/", infos.create);

    // Retrieve all infos
    router.get("/", infos.findAll);

    // Retrieve a single Info with id
    router.get("/:id", infos.findOne);

    // Update a Info with id
    router.put("/:id", infos.update);

    // Delete a Info with id
    router.delete("/:id", infos.delete);

    // Retrieve a single Info with text
    router.get("/cerca/:text", infos.findString);


    app.use('/api/infos', router);
  };
