const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const Projects  = require('./project-model.js');
const Actions  = require('./actions-model.js');






const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
    res.send(`
    <h2>Webpt4 db challenge</h2
    `)
})

// list all projects
server.get('/api/projects', async (req, res) => {
    // get the roles from the database
    try {
      const projects = await db('project'); // all the records from the table
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  // GET by id 
server.get('/api/projects/:id', async (req, res) => {
    
    try {
        const project = await Projects.getProjectById(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "The project with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(500).json({ message: "The project has a Server Error", error: error });
    }
})

// // list a project by id
// server.get('/api/projects/:id', async (req, res) => {
//     // get the projects from the database
//     try {
//       const project = await db('project')
//         .where({ id: req.params.id })
//         .first();
//       res.status(200).json(project);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   });

  const errors = {
    '19': 'Another record with that value exists',
  };
  
  // create projects
  server.post('/api/projects', async (req, res) => {
    try {
      const [id] = await db('project').insert(req.body);
  
      const project = await db('project')
        .where({ id })
        .first();
  
      res.status(201).json(project);
    } catch (error) {
      const message = errors[error.errno] || 'We ran into an error';
      res.status(500).json({ message, error });
    }
  });

  // list all actions
server.get('/api/actions', async (req, res) => {
    // get the roles from the database
    try {
      const actions = await db('actions'); // all the records from the table
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json(error);
    }
  });

  //  // create actions
  //  server.post('/api/actions', async (req, res) => {
  //   try {
  //     const [id] = await db('actions').insert(req.body);
  
  //     const action = await db('actions')
  //       .where({ id })
  //       .first();

  //     res.status(201).json(action);
  //   } catch (error) {
  //     const message = errors[error.errno] || 'We ran into an error';
  //     res.status(500).json({ message, error });
  //   }
  // });

  // POST for the /api/actions
// returns an id of the new action
server.post('/api/actions', async (req, res) => {
  try {
    const action = await Actions.addAction(req.body);
    res.status(201).json(action);  
  } catch (error) {
    res.status(500).json({ message: "There was an error while saving the action", error: error });
  }
})

// add action 
// {
//   "description": "2",
//   "notes": "1",
//   "completed": 0,
//   "project_id": 1
// }

  




  
module.exports = server;



