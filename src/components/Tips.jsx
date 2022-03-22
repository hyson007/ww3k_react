import React from "react";
import { Icon } from "react-materialize";

function Tips() {
  const tips = [
    "Keep an organised vocabulary notebook.",
    "Look at the words again after 24 hours, after one week and after one month.",
    "Read, read, read. The more times you ‘see’ a word the more easily you will remember it.",
    "Use the new words. You need to use a new word about ten times before you remember it!",
    "Do word puzzles and games like crosswords, anagrams and wordsearches.",
    "Make word cards and take them with you. Read them on the bus or when you are waiting for your friends.",
    "Learn words with a friend. It can be more fun and easier to learn with someone else.",
    "Learn a few words but not too many. About eight new words a day is a good number.",
    "Visually remembering words is very helpful. Try writing words on small sticky notes and adding them to items around the house so that you will associate new words with their relevant images."
  ];

  const randomTips = tips[Math.floor(Math.random() * tips.length)];

  return (
    <>
      <Icon small className="tips-icon">visibility</Icon> {randomTips}
    </>
  );
}

export default Tips;
