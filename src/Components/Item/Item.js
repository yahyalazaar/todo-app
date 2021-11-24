import React from "react";

export default function Item(props) {
  let btn = "btn btn-sm btn-primary float-end";
  if (props.state === "In progress") {
    btn = "btn btn-sm btn-warning float-end";
  } else if (props.state === "Done") {
    btn = "btn btn-sm btn-success float-end";
  }
  return (
    <div>
      <li className="border d-flex p-2 mb-3">
        <div className="p-3 col-sm-6">
          <a
            data-bs-toggle="collapse"
            href={"#".concat(props.id)}
            role="button"
            aria-expanded="false"
            aria-controls={props.id}
          >
            {props.txt}
          </a>
          <div className="collapse" id={props.id}>
            <div className="card card-body">
              Created at: {props.created_at} <br />
              {props.updated_at !== undefined
                && props.state + " at: " + props.updated_at
                }
            </div>
          </div>
        </div>
        <div className="p-2 mb-3 col-sm-6">
          <button
            className="btn btn-danger btn-sm float-end"
            onClick={() => props.delFunc(props.id)}
          >
            Delete
          </button>
          <button className={btn} onClick={() => props.updateFunc(props.id)}>
            {props.state}
          </button>
        </div>
      </li>
    </div>
  );
}
