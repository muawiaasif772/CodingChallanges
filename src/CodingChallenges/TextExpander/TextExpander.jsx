import React, { useState } from 'react';
import { Children } from 'react';

const TextExpander = ({buttonColor='blue',ShowBtnText='show Text',CloseBtnText='Show less',children,expander=false,NumberOfWorShow=10}) => {
  const buttonStyle = {
    background: "none",
    border: "none",
    font: "inherit",
    cursor: "pointer",
    marginLeft: "6px",
    color: buttonColor
  };
 const [isExpand,setExpand]=useState(expander)
 const ShowText=isExpand?children:children.split(" ").slice(0,NumberOfWorShow).join( " ")+ "..."
  return (
    <div >
     <span>{ShowText}</span>
     <button style={buttonStyle} onClick={()=>setExpand(expo=>!expo)}>{isExpand?CloseBtnText:ShowBtnText}</button>
    </div> 
  );
};

export default TextExpander;