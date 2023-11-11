import React from "react";

const Description = () => {
  return (
    <small
      style={{
        color: "#005b96",
        fontSize: "large",
      }}
    >
      Hello! I'm <b>Tatinta</b>, a Large Language Model that has been trained by
      Professor Phanish Puranam and Dr Nghi Truong to assist you in solving
      organization design problems using{" "}
      <b>
        <a href="https://academic.oup.com/book/11340">
          Microstructural analysis
        </a>
      </b>
      . Please state your organization design problem as clearly as possible in
      the following format: "I am trying to (re)design an organization of size
      [add size here] with the following objectives: [add objectives here]. The
      key constraints I want you to bear in mind are [add all constraints here].
      What do you suggest?"
    </small>
  );
};

export default Description;
