import React, { useState } from "react";
import TextInput from "../TextInput";
import { Controller, useForm } from "react-hook-form";
import Spinner from "../Spinner";
import DateInput from "../DateInput";
import { format } from "date-fns";
import toast from "react-hot-toast";
import table from "src/utils/Airtable";
import { useEffect } from "react";

interface Props {
  fetchTodo: () => void;
  user: string;
  edit?: any;
}

const Form = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm(); //react-hook-form
  const [isSubmit, setSubmit] = useState(false);
  const [dateError, setDateError] = useState("");

  //create a todo
  async function createTodo(values: any) {
    if (!values.date_of_todo) {
      setDateError("date is required");
      setTimeout(() => {
        setDateError("");
      }, 1000);
    } else
      try {
        setSubmit(true);
        const date = format(new Date(values.date_of_todo), "yyyy-dd-MM"); //format date
        if (!props.edit?.fields) {
          await table.create([
            {
              fields: {
                Name: props.user,
                todo: values.todo,
                topic: values.topic,
                date: date,
                completed: false,
              },
            },
          ]);
          //fetch todo
          props.fetchTodo();
          toast.success("Todo created successfully");
        } else {
          setSubmit(true);
          await table.update([
            {
              id: props.edit?.id,
              fields: {
                todo: values.todo,
                topic: values.topic,
                date: date,
              },
            },
          ]);
          //fetch todo
          props.fetchTodo();
          toast.success("Todo created updated");
        }
        let defaultValues: any = {};
        defaultValues.todo = "";
        // defaultValues.date_of_todo = "";
        reset({ ...defaultValues });
      } catch (error: any) {
        if (error) throw new Error(error.message);
        toast.error(error.message);
      } finally {
        setSubmit(false);
      }
  }
  useEffect(() => {
    if (props.edit?.fields) {
      let defaultValues: any = {};
      defaultValues.todo = props.edit?.fields?.todo;
      defaultValues.topic = props.edit?.fields?.topic;
      reset({ ...defaultValues });
    }
  }, [props.edit, reset]);

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit(createTodo)} className="formWrapper">
        <div className="flex flex-wrap gap-6 lg:gap-10">
          <div className="flex-grow">
            <Controller
              name="topic"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  id="topic"
                  label="Title"
                  placeholder="ex. Learn react"
                  isInValid={!!errors.topic}
                  validationMessage={errors.topic?.message}
                  {...register("topic", {
                    required: "Topic is required",
                  })}
                  required
                />
              )}
            />
          </div>

          <div className="flex-grow">
            <Controller
              name="date_of_todo"
              control={control}
              render={({ field }) => (
                <DateInput
                  id="date_of_date"
                  label="Date of Todo"
                  field={field}
                />
              )}
            />
            {dateError && <p className="text-red-600">{dateError}</p>}
          </div>

          <div className="flex-grow">
            <Controller
              name="todo"
              control={control}
              render={({ field: { value } }) => (
                <TextInput
                  id="todo"
                  label="Description"
                  placeholder="ex. Learn react"
                  isInValid={!!errors.todo}
                  validationMessage={errors.todo?.message}
                  {...register("todo", {
                    required: "Todo is required",
                  })}
                  required
                />
              )}
            />
          </div>
        </div>
        <div>
          <button
            className="btn bg-primary w-full lg:w-full mt-8"
            type="submit"
            disabled={isSubmit}
          >
            {isSubmit ? (
              <Spinner className="text-2xl" />
            ) : props.edit?.fields ? (
              "UPDATE"
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
