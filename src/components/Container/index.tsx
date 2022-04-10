import React, { useEffect, useState } from "react";
import Form from "../Form";
import Todos from "../Todos";
import { useAuth0 } from "@auth0/auth0-react";
import table from "src/utils/Airtable";

const Container = ({ user }: any) => {
  const [todos, setTodo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth0();
  const [edit, setEdit] = useState([]);

  //fetch users
  async function fetchTodos() {
    setLoading(true);
    await table
      .select({
        view: "Grid view",
      })
      .all(function (err, records: any) {
        if (err) {
          console.error(err);
          throw new Error(err.message);
        }
        setTodo(records);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchTodos();
    //eslint-disable-next-line
  }, []);
  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-primary text-2xl font-bold">Auth0-Todo</h1>
        <button
          className="btn bg-red-400 hover:outline-none"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
      <div className="mb-4">
        {hour < 12 ? (
          <h1 className="md:text-xl">
            Good Morning <span className="font-bold mr-2">{user?.name}</span>{" "}
            create a TodoList
          </h1>
        ) : hour >= 12 ? (
          hour < 17 && (
            <h1 className="md:text-xl">
              Good Afternoon{" "}
              <span className="font-bold mr-2">{user?.name}</span>
              create a TodoList
            </h1>
          )
        ) : (
          hour < 12 && (
            <h1 className="md:text-xl">
              Good Evening <span className="font-bold mr-2">{user?.name}</span>
              create a TodoList
            </h1>
          )
        )}
      </div>
      <Form user={user?.name} fetchTodo={fetchTodos} edit={edit} />
      <Todos
        user={user?.name}
        todos={todos}
        loading={loading}
        fetchTodo={fetchTodos}
        setEdit={setEdit}
      />
    </div>
  );
};

export default Container;
