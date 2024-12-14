import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";

const Home = () => {
  return (
    <div>
      <h1>Add a note</h1>
      <div className="container my-3">
        <AddNote />
      </div>
      <Notes />
    </div>
  );
};




export default Home;
