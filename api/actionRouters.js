const express = require('express');

const db = require('../data/helpers/actionModel');
const router = express.Router();


router.get('/', async (req, res) => {
    try{
        const actions = await db.get();
            res.status(200).json(actions);
    }
     catch (error)  {
        res.status(500).json({ error: "The post information could not be retrieved." });
    }
  });


   // insert
   router.post("/", async(req, res) => {
      
    if (req.body.project_id && req.body.description && req.body.notes ) {
        try {
          const project = await db.insert(req.body);
          res.status(201).json(project);
              
          } catch (error) {
            res
            .status(500)
            .json({ error: "The project information could not be retrieved." })
        }          
    }  else {
        res.status(400).json({ errorMessage: "Please provide description, project id and notes for the project." });
      }
    
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
            } else if (!update.project_id || !update.description || !update.notes ){
              res.status(400).json({ errorMessage: "Please provide name to the project." });
            } else {
              res.status(404).json({ message: "The project with the specified ID does not exist." });
            } 
          })
          .catch(error => {
            res.status(500).json({ error: "The project information could not be modified." });
          });
      });


//   // Delete

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




  module.exports = router;