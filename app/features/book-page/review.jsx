import React from "react";
import DeleteIcon from "../../images/delete.png";
import { getItem } from "../../services/localCache";

export default props => {
  let user = JSON.parse(localStorage.getItem("user"));
  let deleteIcon = "";
  if (user.type === "admin") {
    deleteIcon = (
      <img
        src={DeleteIcon}
        style={{ height: "30px", float: "right" }}
        onClick={() => {
          props.deleteReview(props.index, props.id);
        }}
      />
    );
  }
  return (
    <div>
      {deleteIcon}
      <div className="review-item">
        <div className="book">
          <h3>
            <b>
              {props.name} {props.surname}
            </b>
          </h3>
          <p>{props.review}</p>
          <br />
          <i style={{ textAlign: "right" }}>{props.date}</i>
        </div>
      </div>
    </div>
  );
};
