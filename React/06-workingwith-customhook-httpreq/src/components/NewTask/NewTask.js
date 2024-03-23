import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTasksRequest } = useFetch();

  const enterTaskHandler = async (taskText) => {
    const enteredTask = (data) => {
      const generatedId = data.name;
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };
    
    sendTasksRequest(
      {
        url: "https://todoapp-516a8-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      enteredTask
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
