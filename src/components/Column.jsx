import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {
  return (
    <div className="container p-2">
      <h3>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div  {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
