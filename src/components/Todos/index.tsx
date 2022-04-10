import React from "react";
//import { userOut } from '../../interface/user.interface';
import Spinner from "../Spinner";
import { Transition } from "@headlessui/react";
import Todo from "../Todo";

interface Props {
  user: string;
  todos: any;
  loading: boolean;
  fetchTodo: () => void;
  setEdit?: any;
}

const Todos = (props: Props) => {
  const todos = props.todos.filter(
    (todo: any) => todo?.fields?.Name === props.user
  );
  
  return (
    <div className="mt-4">
      <div className="w-full bg-gray-300 p-2">Todo</div>
      {props.loading ? (
        <Spinner className="text-6xl mx-auto mt-16" />
      ) : todos?.length === 0 ? (
        <div className="flex items-center justify-center mt-4">
          <p>No Todo created</p>
        </div>
      ) : (
        todos?.map((todo: any, index: any) => {
          return (
            <Transition
              appear
              as="div"
              show={true}
              key={todo?.id}
              style={{ transitionDelay: `${100 * index}ms` }}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 translate-y-10"
              enterTo="transform opacity-100 translate-y-0"
            >
              <Todo
                todo={todo}
                fetchtodo={props.fetchTodo}
                setEdit={props.setEdit}
              />
            </Transition>
          );
        })
      )}
    </div>
  );
};

export default Todos;
