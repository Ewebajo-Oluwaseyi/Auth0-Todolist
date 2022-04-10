import React from "react";
import toast from "react-hot-toast";
import table from "src/utils/Airtable";

interface Props {
  todo: any;
  fetchtodo: () => void;
  setEdit: any;
}

const Todo = (props: Props) => {
  console.log(props.todo);
  //delete user
  async function deleteTodo(id: any) {
    try {
      await table.destroy(id);
      toast.success(`${props.todo?.fields.todo} successfully deleted`);
      //fetch users
      props.fetchtodo();
    } catch (error: any) {
      if (error) throw new Error(error.message);
      toast.success("todo not deleted");
    }
  }
  const handleToggleCompleted = async (id: any) => {
    try {
      await table.update([
        {
          id: id,
          fields: {
            completed: !props.todo?.fields.completed,
          },
        },
      ]);
      toast.success(`${props.todo?.fields.todo} successfully completed`);
      //fetch users
      props.fetchtodo();
    } catch (error: any) {
      if (error) throw new Error(error.message);
      toast.success("todo not deleted");
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full flex items-center justify-between px-4 mt-4 border-b-2 border-gray-100">
        <div className="mb-2 flex items-center">
          <input
            type="checkbox"
            name="completed"
            id="completed"
            checked={props.todo?.fields.completed}
            onChange={() => handleToggleCompleted(props.todo?.id)}
            className="form-checkbox mr-3 h-5 w-5"
          ></input>

          <div className="flex flex-col">
            <span className="text-sm">id: {props.todo?.id}</span>
            <h2
              className={`md:mt-0 text-lg font-bold ${
                props.todo?.fields.completed ? "line-through" : ""
              }`}
            >
              Topic: {props.todo?.fields.topic}
            </h2>
            <p
              className={`md:mt-0 ${
                props.todo?.fields.completed ? "line-through" : ""
              }`}
            >
              Todo: {props.todo?.fields.todo}
            </p>
          </div>
        </div>
        <div className="mb-2 flex flex-col md:flex-row justify-around items-center ml-auto">
          <span className="text-sm">{props.todo?.fields.date}</span>
          <div>
            <i
              className="far fa-pen ml-3 text-red-500 cursor-pointer"
              onClick={() => props.setEdit(props.todo)}
            ></i>
            <i
              onClick={() => deleteTodo(props.todo?.id)}
              className="far fa-trash ml-3 text-red-500 cursor-pointer"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
