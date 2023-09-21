import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Add,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowRightOutlined,
  Menu,
} from "@mui/icons-material";

// Define the ProjectItem states
enum ProjectItemState {
  Selected,
  NonSelected,
  Edit,
}
export interface Project {
  id: number;
  name: string;
}
const ProjectContainer: React.FC<{
  projects: Project[];
  handleActiveProjectChange: (project: Project) => void;
  handleProjectsChange: (projects: Project[]) => void;
}> = ({ projects, handleActiveProjectChange, handleProjectsChange }) => {
  const [activeProject, setActiveProject] = useState(
    projects.length > 0 ? projects[0] : undefined
  );
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (activeProject) {
      handleActiveProjectChange(activeProject);
    }
  }, [activeProject]);

  const handleEditClick = (projectId: number) => {
    setEditingProjectId(projectId);
  };

  const handleSaveEdit = (projectId: number, newName: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, name: newName } : project
    );
    handleProjectsChange(updatedProjects);
    setEditingProjectId(null);
  };

  const handleDeleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== projectId
    );
    handleProjectsChange(updatedProjects);
  };

  const handleAddProject = () => {
    const id = projects.length + 1;
    const newProject = {
      id: id,
      name: `untitled ${id}`,
    };
    const updatedProjects = [...projects, newProject];
    handleProjectsChange(updatedProjects);
    setActiveProject(newProject);
    handleEditClick(newProject.id);
  };

  return hidden ? (
    <Box
      style={{
        position: "fixed",
        left: "0",
        top: "0",
      }}
    >
      <IconButton
        style={{
          width: "72px",
          height: "72px",
          fontSize: "72px",
        }}
        onClick={() => {
          setHidden(false);
        }}
      >
        <Menu
          style={{
            fontSize: "32px",
          }}
        />
      </IconButton>
    </Box>
  ) : (
    <Container
      style={{
        height: "100vh",
        position: "fixed",
        background: "#00000008",
        boxShadow: "1px 0px 20px 1px black",
        transition: ".4s ease",
        left: "0",
        top: "0",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "30px",
        resize: "horizontal",
      }}
    >
      <ProjectsHeader
        hideProjectsContainer={() => {
          setHidden(true);
        }}
      />
      <Box
        style={{
          display: "flex",
          width: "100%",
          padding: "0px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          gap: "30px",
          flexShrink: 0,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "8px",
            gap: "16px",
          }}
        >
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              selected={activeProject === project}
              handleSelection={() => {
                setActiveProject(project);
              }}
              project={project}
              editing={editingProjectId === project.id}
              onEditClick={handleEditClick}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteProject}
            />
          ))}
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{
            marginTop: "auto",
            whiteSpace: "nowrap",
            width: "fit-content",
          }}
          onClick={handleAddProject}
          startIcon={<Add />}
        >
          Add Project
        </Button>
      </Box>
    </Container>
  );
};

const ProjectsHeader: React.FC<{
  hideProjectsContainer: () => void;
}> = ({ hideProjectsContainer }) => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        padding: "12px",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <Typography variant="h4">Projects</Typography>
      <IconButton
        style={{
          width: "36px",
          height: "36px",
        }}
        onClick={hideProjectsContainer}
      >
        <KeyboardDoubleArrowLeft fontSize="large" />
      </IconButton>
    </div>
  );
};

const EditProjectItem: React.FC<{
  project: Project;
  onSaveEdit: (projectId: number, newName: string) => void;
  selected: boolean;
}> = ({ project, onSaveEdit, selected }) => {
  const [newName, setNewName] = useState(project.name);

  const handleSaveClick = () => {
    onSaveEdit(project.id, newName);
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "59px",
        padding: "15px 10px",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        borderRadius: "8px",
        border: "1px solid black",
        color: "white",
        background: !selected ? "#FFFFFF" : "#9747FF",
      }}
    >
      <TextField
        value={newName}
        inputProps={{ style: { color: selected ? "white" : "" } }}
        onChange={(e) => setNewName(e.target.value)}
        inputRef={(input) => input && input.focus()}
      />
      <IconButton
        onClick={handleSaveClick}
        style={{
          width: "24px",
          height: "24px",
          padding: "2px 8px",
          color: selected ? "white" : "",
        }}
      >
        <DoneIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const ProjectItem: React.FC<{
  project: Project;
  selected: boolean;
  handleSelection: () => void;
  editing: boolean;
  onEditClick: (projectId: number) => void;
  onSaveEdit: (projectId: number, newName: string) => void;
  onDelete: (projectId: number) => void;
}> = ({
  project,
  editing,
  selected,
  handleSelection,
  onEditClick,
  onSaveEdit,
  onDelete,
}) => {
  const [newName, setNewName] = useState(project.name);

  const handleEditClick = () => {
    onEditClick(project.id);
  };

  const handleSaveClick = () => {
    onSaveEdit(project.id, newName);
  };

  const handleDeleteClick = () => {
    onDelete(project.id);
  };

  return (
    <>
      {editing ? (
        <EditProjectItem
          project={project}
          onSaveEdit={onSaveEdit}
          selected={selected}
        />
      ) : (
        <Box
          style={{
            display: "flex",
            height: "59px",
            padding: "15px 10px",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px",
            alignSelf: "stretch",
            borderRadius: "8px",
            background: editing || !selected ? "#FFFFFF" : "#9747FF",
            boxShadow: "1px 3px 3px 1px #00000020",
            cursor: "pointer",
            transition: ".4s ease",
            border: "1px solid black",
          }}
          onClick={handleSelection}
        >
          <Typography
            variant="h5"
            style={{ whiteSpace: "nowrap", color: selected ? "white" : "" }}
          >
            {project.name}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleEditClick();
              }}
              style={{ width: "24px", height: "24px" }}
            >
              <EditIcon
                style={{
                  color: selected ? "white" : "",
                }}
                fontSize="small"
              />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick();
              }}
              style={{ width: "24px", height: "24px" }}
            >
              <DeleteIcon
                style={{
                  color: selected ? "white" : "",
                }}
                fontSize="small"
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </>
  );
};
export default ProjectContainer;
