const express = require('express');

const server = express();

server.use(express.json());


// store all projects
const projects = [];

// total number of requests made to the API
let totalRequests = 0;


/* Middlewares */
/* Global middleware */
server.use((req, res, next) => {
  /* 
  Logs the total number of requests made to API.
  
    Returns:
      Allows the request to continue.
  */

  totalRequests += 1;
  console.log('Total de requisições: ', totalRequests);
  return next();
});

/* Local middleware */
function checkExists(req, res, next) {
  /*
  Checks if a project exists.

    Args:
      id: The id of the project to find.
    
    Returns:
      Error if not found. If found allow request to continue.
  */

  const { id } = req.params;

  // search for project
  const project = projects.find(p => p.id === id);

  if (!project) {
    // project not found
    return res.status(404).json({ message: 'Project was not found.' });
  }

  // project exists
  return next();
}


/* Routes */
server.post('/projects', (req, res) => {
  /*
  Creates a new project.
  
    Args:
      id: An id for the new project.
      title: A title for the new project.

    Returns:
      Returns all existing projects.
  */

  const { id, title } = req.body;

  // create new project
  const newProject = {
    id,
    title,
    tasks: [],
  };

  // add to db
  projects.push(newProject);

  // return all projects
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  /*
  Lists all projects.
  
    Returns:
      Returns all existing projects.
  */
  return res.json(projects);
});

server.put('/projects/:id', checkExists, (req, res) => {
  /*
  Updates project title.
  
    Args:
      id: The id of the project to be updated.
      title: The new title for the project.

    Returns:
      Returns updated project.
  */

  const { id } = req.params;
  const { title } = req.body;

  // find project with maching id and update
  projects.map(proj => {
    if (proj.id === id) {
      // project found
      proj.title = title;
      return res.json(proj);
    }
  });
});

server.delete('/projects/:id', checkExists, (req, res) => {
  /*
  Deletes a project.
  
    Args:
      id: The id of the project to be deleted.

    Returns: -
  */

  const { id } = req.params;

  projects.map(proj => {
    if (proj.id === id) {
      // get index of project in projects array
      const index = projects.indexOf(proj);
      // delete project
      projects.splice(index, 1);

      return res.send();
    }
  });
});

server.post('/projects/:id/tasks', checkExists, (req, res) => {
  /*
  Adds a new task to an existing project.
  
    Args:
      id: The id of the project that the task will be added.
      title: The task to be added.
  
    Retuns:
      Returns all projects.
  */

  const { id } = req.params;
  const { title } = req.body;

  projects.map(proj => {
    if (proj.id === id) {
      // add task to project
      proj.tasks.push(title);

      return res.json(projects);
    }
  });
});


// start server on port 3000
server.listen(3000);