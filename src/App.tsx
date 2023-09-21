import "./App.css";
import ApiEndpointTester from "./ApiTester";
import React, { useState } from "react";
import ProjectContainer from "./ProjectContainer";
import { Box } from "@mui/material";

function App() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Api testing" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
  ]);
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <Box
      style={{
        padding: 64,
        display: "flex",
        alignContent: "center",
      }}
    >
      <ProjectContainer
        projects={projects}
        handleActiveProjectChange={(project): void => {
          setActiveProject(project);
        }}
        handleProjectsChange={(projects): void => {
          setProjects(projects);
        }}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "50px",
        }}
      >
        <ApiEndpointTester />
        <ApiEndpointTester />
      </Box>
    </Box>
  );
}

export default App;
