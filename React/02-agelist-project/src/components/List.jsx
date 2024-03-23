import React from "react";
import ListItems from "./ListItems";

const List = (props) => {
  return (
    <div>
      {props.newUser.map((user) => {
        return <ListItems key={user.id} name={user.name} age={user.age} />;
      })}
    </div>
  );
};

export default List;
