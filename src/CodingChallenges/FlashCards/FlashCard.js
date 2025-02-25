import React from "react";
import "./FlashCards.css";
import { useState } from "react";
const questions = [
  {
    id: 101,
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language",
  },
  {
    id: 102,
    question: "How do you create a hyperlink in HTML?",
    answer: "Using the <a> tag",
  },
  {
    id: 103,
    question: "What is the purpose of the <head> element in HTML?",
    answer: "To contain meta-information about the document",
  },
  {
    id: 104,
    question: "How do you add a comment in HTML?",
    answer: "<!-- This is a comment -->",
  },
  {
    id: 105,
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets",
  },
  {
    id: 106,
    question: "How do you change the background color of an element in CSS?",
    answer: "Using the background-color property",
  },
  {
    id: 107,
    question: "How do you make a font bold in CSS?",
    answer: "Using the font-weight property",
  },
  {
    id: 108,
    question: "What is a CSS selector?",
    answer: "A pattern used to select the elements you want to style",
  },
  {
    id: 109,
    question: "How do you add a comment in CSS?",
    answer: "/* This is a comment */",
  },
  {
    id: 110,
    question: "What is JavaScript?",
    answer: "A programming language used to create dynamic content on websites",
  },
  {
    id: 111,
    question: "How do you declare a variable in JavaScript?",
    answer: "Using var, let, or const",
  },
  {
    id: 112,
    question: "What is the purpose of functions in JavaScript?",
    answer: "To encapsulate reusable code blocks",
  },
  {
    id: 113,
    question: "How do you write a comment in JavaScript?",
    answer: "// This is a comment",
  },
  {
    id: 114,
    question: "What is the DOM?",
    answer: "DOM, use for accessing and manipulating HTML documents",
  },
  {
    id: 115,
    question: "What is React?",
    answer: "A JavaScript library for building user interfaces",
  },
  {
    id: 116,
    question: "What is the virtual DOM in React?",
    answer: "A lightweight copy of the actual DOM that React uses to optimize updates",
  },
  {
    id: 117,
    question: "How do you create a component in React?",
    answer: "By defining a function or class that returns JSX",
  },
  {
    id: 118,
    question: "What is the use of props in React?",
    answer: "To pass data from parent to child components",
  },
  {
    id: 119,
    question: "How do you manage state in React functional components?",
    answer: "Using the useState hook",
  },
  {
    id: 120,
    question: "What is JSX?",
    answer: "A syntax extension that allows writing HTML-like code in JavaScript",
  },{
    id: 121,
    question: "What is Props?",
    answer: "Props is a data to pass Parent Component to children",
  },
];

const FlashCard = () => {
    function handleClick(id){
        setSelctid(id!==selectid?id:'')
        
    }
  const[selectid,setSelctid]=useState(null)
  return (
   <div className="flashcards">
{questions.map((quest)=><div key={quest.id } className={selectid===quest.id?'selected':''} onClick={()=>handleClick(quest.id)}><h1>{selectid===quest.id?quest.answer:quest.question}</h1></div>)}
   </div>
  );
};

export default FlashCard;
 