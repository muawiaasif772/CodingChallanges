import React, { useState } from "react";
import "./FriendProject.css";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const FriendProject = () => {
	const [friends, setFriends] = useState([...initialFriends]);

  const [showFriend, setshowFriend] = useState(false);
  const[selectFriends,setSelectFriends]=useState(false)
  function hanldleForm() {
    setshowFriend((open) => !open);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setshowFriend(false);
  }
function handleSelect(friend){
	setSelectFriends((select)=>select.id===friend.id?false:friend)
	setshowFriend(false)
}
function handleSeplit(value) {
	setFriends((friends) =>
	  friends.map((friend) =>
		friend.id === selectFriends.id
		  ? { ...friend, balance: friend.balance + value }
		  : friend
	  )
	);
  }
  
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelect={handleSelect} selectFriends={selectFriends}/>
        {showFriend ? <FormAddFriend onAddFriend={handleAddFriend} /> : ""}
        <Button onClick={hanldleForm}>
          {showFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectFriends && <FormSplitBill  selectFriends={selectFriends} onSubmitSeplit={handleSeplit}/>} 
    </div>
  );
};
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
function FriendList({ friends,onSelect,selectFriends }) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} onSelect={onSelect}  selectFriends={selectFriends}/>
      ))}
    </ul>
  );
}
function Friend({ friend,onSelect,selectFriends }) {
	const isSelect=selectFriends.id===friend.id
	return (
	  <li className={isSelect?'selected':'friends'}>
		<img className="avatar" src={friend.image} alt={friend.name} />
		<div className="data">
		  <h2>{friend.name}</h2>
		  {friend.balance < 0 ? (
			<p className="red">
			  {" "}
			  you own {friend.name} $ {Math.abs(friend.balance)}{" "}
			</p>
		  ) : (
			<p className="green">
			  {" "}
			  you own {friend.name} $ {Math.abs(friend.balance)}{" "}
			</p>
		  )}
		  <Button onClick={()=>onSelect(friend)}>{isSelect?'Close':'Select'}</Button>
		</div>
	  </li>
	);
  }
  

function FormAddFriend({ onAddFriend }) {
	const [name, setName] = useState("");
	const [imgUrl, setImgUrl] = useState("");
  
	function HandleFormSubmit(e) {
	  e.preventDefault();
	  if (!name || !imgUrl) return;
	  const id = Date.now().toString().slice(-3);
  
	  const newFriend = {
		id, // Ensure the new friend has a unique ID
		name,
		image: `${imgUrl}?id=${id}`,
		balance: 0,
	  };
  console.log(newFriend)
	  setName("");
	  setImgUrl(""); // Reset to default URL
	  onAddFriend(newFriend);
	}
   
	return (
	  <form className="form-add-friend" onSubmit={HandleFormSubmit}>
		<label> 👨‍👦 Friend name </label>
		<input
		  type="text"
		  placeholder="Enter friend's name"
		  value={name}
		  onChange={(e) => setName(e.target.value)}
		/>
		<label> 🌍 Image URL</label>
		<input
		  type="text"
		  placeholder="Enter image url"
		  value={imgUrl}
		  onChange={(e) => setImgUrl(e.target.value)}
		/>
		<Button>Add Friend</Button>
	  </form>
	);
  }
  function FormSplitBill({ selectFriends, onSubmitSeplit }) {
	const [bill, setBill] = useState('');
	const [paidByUser, setPaidByUser] = useState('');
	const paipaidByFriend = bill ? bill - paidByUser : '';
  
	const [whoIsPaying, setWhoIsPaying] = useState('user');
  
	function HandleFormSubmit(e) {
	  e.preventDefault();
	  
	  // Ensure bill and paidByUser are valid numbers
	  if (!bill || !paidByUser) {
		return alert('Please enter both the bill value and your expense.');
	  }
  
	  // Perform the split calculation based on who is paying
	  const amountToSplit = whoIsPaying === 'user' ? paipaidByFriend : -paidByUser;
  
	  // Call the split logic
	  onSubmitSeplit(amountToSplit);
	}
  
	return (
	  <form className="form-split-bill" onSubmit={HandleFormSubmit}>
		<h2>Split a Bill with {selectFriends.name}</h2>
		<label>💰 Bill Value</label>
		<input
		  type="text"
		  value={bill}
		  onChange={(e) => setBill(Number(e.target.value))}
		  placeholder="Enter bill value"
		/>
		<label> 🕺 Your Expense</label>
		<input
		  type="text"
		  value={paidByUser}
		  onChange={(e) => setPaidByUser(Number(e.target.value))}
		  placeholder="Enter your expense"
		/>
		<label> 👨‍👦 {selectFriends.name}'s Expense</label>
		<input
		  type="text"
		  disabled
		  value={paipaidByFriend}
		  placeholder="Calculated"
		/>
		<label>🤑 Who is paying this bill</label>
		<select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
		  <option value="user">You</option>
		  <option value="friend">{selectFriends.name}</option>
		</select>
		<Button>Split Bill</Button>
	  </form>
	);
  }
  
export default FriendProject;
