import React from "react";
import { useState } from "react";
import Item from "../Item/Item";
import { v4 as uuidv4 } from "uuid";
export default function Form() {
  const [myState, setState] = useState([]);
  const [tmpState, inputState] = useState();
  //   const [delState, updateDelState] = useState();
  const stats = {
    create: "Created",
    progress: "In progress",
    done: "Done",
  };
  const getDate = () => {
    var myCurrentDate = new Date();
    return (
      myCurrentDate.getFullYear() +
      "-" +
      (myCurrentDate.getMonth() + 1) +
      "-" +
      myCurrentDate.getDate() +
      " " +
      myCurrentDate.getHours() +
      ":" +
      myCurrentDate.getMinutes() +
      ":" +
      myCurrentDate.getSeconds()
    );
  };
  const updateInputState = (e) => {
    inputState(e);
  };
  const add2do = (e) => {
    e.preventDefault();
    if (tmpState !== "" && tmpState !== undefined) {
      const st = [...myState];
      const tmp = {
        txt: tmpState,
        state: stats.create,
        created_at: getDate(),
        updated_at: "",
        id: uuidv4(),
      };
      st.push(tmp);
      setState(st);
      inputState("");
    }
  };
  const updateState2do = (id) => {
    const findItem = myState.find((item) => {
      return item.id === id;
    });
    
    if (findItem.state === stats.create) {
      findItem.state = stats.progress;
      findItem.updated_at = getDate();
    } else if (findItem.state === stats.progress) {
      findItem.state = stats.done;
      findItem.updated_at = getDate();
    }
    console.log(findItem.updated_at);
    const filtredState = myState.filter((item) => {
      return item.id !== id;
    });
    const updatedState = [...filtredState, findItem];
    setState(updatedState);
  };
  const delete2do = (id) => {
    const filtredState = myState.filter((item) => {
      return item.id !== id;
    });

    setState(filtredState);
  };
  return (
    <div className="col-12 col-sm-10 col-lg-6 m-auto">
      <form className="mb-3" onSubmit={(e) => add2do(e)}>
        <label htmlFor="todo" className="form-label mt-3">
          To do:
        </label>
        <input
          value={tmpState !== undefined ? tmpState : ""}
          type="text"
          className="form-control"
          id="todo"
          onInput={(e) => updateInputState(e.target.value)}
        />
        <button className="btn btn-primary mt-3">Save</button>
      </form>
      <h4 className="text-center mt-3">Created todos</h4>
      <ul className="list-group">
        {myState.map((item, index) => {
          if (item.state === stats.create) {
            return (
              <Item
                txt={item.txt}
                key={index}
                id={item.id}
                state={item.state}
                delFunc={delete2do}
                updateFunc={updateState2do}
                created_at={item.created_at}
              />
            );
          }
          return "";
        })}
      </ul>
      <h4 className="text-center mt-3">In progress todos</h4>
      <ul className="list-group">
        {myState.map((item, index) => {
          if (item.state === stats.progress) {
            return (
              <Item
                txt={item.txt}
                key={index}
                id={item.id}
                state={item.state}
                delFunc={delete2do}
                updateFunc={updateState2do}
                created_at={item.created_at}
                updated_at={item.updated_at}
              />
            );
          }
          return "";
        })}
      </ul>
      <h4 className="text-center mt-3">Finished todos</h4>
      <ul className="list-group">
        {myState.map((item, index) => {
          if (item.state === stats.done) {
            return (
              <Item
                txt={item.txt}
                key={index}
                id={item.id}
                state={item.state}
                delFunc={delete2do}
                updateFunc={updateState2do}
                created_at={item.created_at}
                updated_at={item.updated_at}
              />
            );
          }
          return "";
        })}
      </ul>
    </div>
  );
}
