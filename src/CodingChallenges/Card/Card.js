import React from 'react';
import img1 from '../Card/WhatsApp Image 2024-03-20 at 1.08.07 AM.jpeg';
import '../Card/Card.css';

const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "#2662EA"
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "#EFD81D"
  },
  {
    skill: "Web Design",
    level: "advanced",
    color: "#C3DCAF"
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "#E84F33"
  },
  {
    skill: "React",
    level: "advanced",
    color: "#60DAFB"
  },
  {
    skill: "Svelte",
    level: "beginner",
    color: "#FF3B00"
  }
];

const Card = () => {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
};

function Avatar() {
  return (
    <img className='avatar' src={img1} alt='Muawia' />
  );
}

function Intro() {
  return (
    <div>
      <h1>Muawia Asif</h1>
      <p>Frontend Web Developer and teacher at Alif-lam Mim online Quran Academy. I am a student of BS Computer Science at Islamia University Of Bahawalpur.</p>
    </div>
  );
}

function SkillList() {
  return (
    <div className='skill-list'>
      {skills.map((skil, index) => (
        <Skill key={index} skil={skil} />
      ))}
    </div>
  );
}

function Skill({ skil }) {
  return (
    <div className='skill' style={{ backgroundColor: skil.color }}>
      <span>{skil.skill}</span>
      <span>
        {skil.level==='advanced' &&'💪'}
        {skil.level==='beginner'&&'👶'}
        {skil.level==='intermediate'?'👍':''}

      </span>
    </div>
  );
}

export default Card;
