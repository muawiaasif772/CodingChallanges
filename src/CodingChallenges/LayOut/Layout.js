import React, { useState } from "react";
import "./layout.css";

const Layout = () => {
  const [items, setItems] = useState([]);
  function handlNewItems(newItems) {
    setItems((itemss) => [...itemss, newItems]);
  }
  function handlDelet(id) {
    setItems((items) => items.filter((item) => item.id !== id));
    console.log(id);
  }
  function UpdateItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function DeleteAllListItems(){
   const confirm=window.confirm('are you sure to delete all items ')
    if(confirm) setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handlNewItems} />
      <PackingList
        item={items}
        OnDelete={handlDelet}
        UpdateItems={UpdateItems}
        ClearList={DeleteAllListItems}
      />
      <Stats items={items} />
    </div>
  );
};
function Logo() {
  return <h1>🚗For Away🚗</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      alert("Please put item name");
      return;
    }

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now().toString().slice(-3),
    };
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <option value={i + 1} key={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ item, OnDelete, UpdateItems,ClearList }) {
  const [sortBy, setSortBy] = useState('input');
  
  let sortItems = [...item];
  if (sortBy === 'packed') {
    sortItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (sortBy === 'description') {
    sortItems.sort((a, b) => a.description.localeCompare(b.description));
  }

 

  return (
    <div className="list">
      <ul>
        {sortItems.map((initial) => (
          <Item
            item={initial}
            key={initial.id}
            OnDelete={OnDelete}
            UpdateItems={UpdateItems}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed Status</option>
        </select>
        
      <button onClick={ClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, OnDelete, UpdateItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => UpdateItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}{" "}
      </span>
      <button onClick={() => OnDelete(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length) return <p className="stats">Adding items in your list</p>;
  const numItems = items.length;
  const PakItems = items.filter((item) => item.packed).length;
  let percentage = 0;
  percentage = Math.round((PakItems / numItems) * 100);
  Number(percentage);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got Everthing ready ✈!"
          : `🚗 you have ${numItems} items in your list, and you already packed ${PakItems} ( ${percentage}%)`}
      </em>
    </footer>
  );
}
export default Layout;
