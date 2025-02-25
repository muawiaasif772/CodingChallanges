import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import FriendProject from "./FriendProject/FriendProject";
// import Movies from "./Movies/Movies";
// import Accordions from "./CodingChallenges/AccordionsComponents/Accordions";
import DateCounter from "./CodingChallenges/DateCounter/DateCounter";
function App() {

  return (
    <div>
    {/* <StarRating maxRating={5} messages={['Bad','Nice','Good','Amazing']}/>
    <StarRating maxRating={10} defaultRating={3} color="blue" size={'ssss'} messages={['Bad','Nice','Good','Amazing']}/>
    <StarRating maxRating={10} defaultRating={3} color="green" size={45} messagesColor={[]}  messages={['Terrible', 'Poor', 'Average', 'Fair', 'Good', 'Great', 'Excellent', 'Superb', 'Outstanding', 'Perfect']}/> */}
    {/* <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={4}
        ShowBtnText="Show text"
        CloseBtnText="Collapse text"
        buttonColor="#ff6622" 
        expander={true}
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander> */}
      <DateCounter/>
     </div>
  );
}


export default App;
