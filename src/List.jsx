import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, removeItem ,editItem}) => {
  return (
    <div className="grocery-list">
      {list.map((item) => {
        return (
          <article key={item.id} className="grocery-item">
            <p className="title">{item.name}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(item.id)}
              >
                <FaEdit />
              </button>
              <button type="button" className="delete-btn">
                <FaTrash onClick={() => removeItem(item.id)} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
