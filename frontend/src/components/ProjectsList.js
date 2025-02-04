/* Nomenclature: when creating a new project, the intended name */
/* of the project is called "title", until it is sent to database */
/* and created, after which the project's name is referred to as "id" */

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/ProjectsList.css";
import { apiDomain as URL } from "../utils/apiDomain";
import createRequest from "../utils/createRequest";

export default function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.user.projects, shallowEqual);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user, shallowEqual);

  async function handleCreateProject(e) {
    e.preventDefault();
    // TODO add blank title error handling
    const request = createRequest("POST", user.token, {
      title: `${document.getElementById("new-project-title").value}`,
    });
    const response = await fetch(`${URL}/api/projects/`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({ type: "project/created", payload: result });
    } else {
      console.log(response.status);
    }
  }

  async function handleDeleteProject(id) {
    const request = createRequest("DELETE", user.token);
    const response = await fetch(`${URL}/api/projects/${id}`, request);
    if (response.ok) {
      dispatch({ type: "project/deleted", payload: { id: id } });
    } else {
      console.log(response.status);
    }
  }

  async function handleLoadProject(id) {
    const request = createRequest("GET", user.token);
    const response = await fetch(`${URL}/api/projects/${id}`, request);
    if (response.ok) {
      const result = await response.json();
      console.log(result);
      dispatch({
        type: "project/loaded",
        payload: { id: id, stages: result },
      });
      navigate(`../project/${id}`);
    }
  }

  const listProjects = projects
    ? projects.map((id) => {
        return (
          //TODO: Change to project.id
          <li key={id}>
            {id}
            <button onClick={() => handleLoadProject(id)}>Edit</button>
            <button onClick={() => handleDeleteProject(id)}>Delete</button>
          </li>
        );
      })
    : null;

  return (
    <div id="projects-menu">
      {projects && <ul id="projects-list">{listProjects}</ul>}
      <form id="new-project-creator" onSubmit={handleCreateProject}>
        <h3>Create a new project</h3>
        <h3>Titled:</h3>
        <input id="new-project-title" />
        <button id="submit">Create Project</button>
      </form>
    </div>
  );
}
