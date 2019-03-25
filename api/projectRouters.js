const express = require('express');

const db = require('../data/helpers/projectModel');
const router = express.Router();

//get
router.get('/', async (req, res) => {
    try{
        const project = await db.get();
            res.status(200).json(project);
    }
     catch (error)  {
        res.status(500).json({ error: "The project information could not be retrieved." });
    }
  });

  router.get('/:id/list', async (req, res) => {
    try {
        let resp = await db.getProjectActions(req.params.id);
        res.status(200).json(resp);
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Error accessing list of actions for project.' });
    }
});



  // insert
  router.post("/", async(req, res) => {
      
    if (req.body.name && req.body.description ) {
        try {
          const project = await db.insert(req.body);
          res.status(201).json(project);
              
          } catch (error) {
            res
            .status(500)
            .json({ error: "The project information could not be retrieved." })
        }          
    }  else {
        res.status(400).json({ errorMessage: "Please provide name and description for the project." });
      }
    
  });

  // Delete

  router.delete("/:id", (req, res) => {
      
    const id = req.params.id;  
    db
      .remove(id)
      .then(remove => {
          if (remove) {
          res.status(204).end(); 
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." });    
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The project could not be removed" });
      });
  });




  // update
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
  
    db
      .update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else if (!update.name || !update.description ){
          res.status(400).json({ errorMessage: "Please provide name to the project." });
        } else {
          res.status(404).json({ message: "The project with the specified ID does not exist." });
        } 
      })
      .catch(error => {
        res.status(500).json({ error: "The project information could not be modified." });
      });
  });

  module.exports = router;