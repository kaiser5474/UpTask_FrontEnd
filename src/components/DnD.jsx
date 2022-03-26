import React from "react";
import initialData from "../helpers/initial-data";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";

const DnD = () => {
  let Qstate = initialData;
  const onDragEnd = result => {
    //TODO: reorder our column
  }
  return (
    <>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        {Qstate.columnOrder.map((columnId) => {
          const column = Qstate.columns[columnId];
          const tasks = column.taskIds.map((taskId) => Qstate.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </DragDropContext>
    </>
  );
};

export default DnD;
