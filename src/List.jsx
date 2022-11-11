import React from "react";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title" onClick={() => removeItem(id)}> {title} </p>
          </article>
        );
      })}
    </div>
  );
};

export default List;
