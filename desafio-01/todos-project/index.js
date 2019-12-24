const express = require('express');

const server = express();

server.use(express.json());

// store projects
const projects = [];

// number of requests made to API
let totalRequests = 0;


/* Middlewares */
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
  const project = projects.find(project => project.id === id);

  if (!project) {
    // project not found
    return res.status(404).json({ message: 'Project not found.' });
  }

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
      Returns all projects.
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

  // return projects
  return res.json(projects);
});

server.get('/projects', (req, res) => {
  /*
  Lists all projects.
  
    Returns:
      Returns projects.
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
  projects.map(project => {
    if (project.id === id) {
      // project found
      project.title = title;

      return res.json(project);
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

  projects.map(project => {
    if (project.id === id) {
      // get index of project in projects array
      const index = projects.indexOf(project);
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
      id: The id of the project to add the task.
      title: The task to be added.
  
    Retuns:
      Returns all projects.
  */

  const { id } = req.params;
  const { title } = req.body;

  projects.map(project => {
    if (project.id === id) {
      // add task to project
      project.tasks.push(title);

      return res.json(projects);
    }
  });
});


server.listen(3000);