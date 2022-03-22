import React from "react";
import { useEffect, useState } from "react";
import Words from "./Words";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../firebase.config";
import Spinner from "./Spinner";
import Tips from "./Tips";
import "materialize-css";
import {
  Button,
  Icon,
  Collapsible,
  CollapsibleItem,
  Pagination,
  Checkbox,
} from "react-materialize";
import FetchWordAPI from "./FetchWordAPI";
import { Link } from "react-router-dom";

function Main() {
  const [words, setWords] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [level, setLevel] = useState("level2");
  const [random, setRandom] = useState(false);

  useEffect(() => {
    // this is to store the words json into firebase firestore, only need
    // to run ONCE
    const outputs = Words();
    const upload = async () => {
      // console.log('test')
      outputs.forEach(async (output) => {
        // console.log(output.level)
        // console.log(output.words)
        const docRef = await addDoc(collection(db, "words"), {
          level: output.level,
          words: output.words,
        });
      });
    };
    // upload()

    // get the words from firebase firestore
    const getWords = async (level) => {
      const wordsCollection = collection(db, "words");

      const q = query(wordsCollection, where("level", "==", level), limit(10));

      const querySnap = await getDocs(q);

      const words = [];
      querySnap.forEach((doc) => {
        // console.log(doc.data());
        doc.data().words.forEach((word) => {
          return words.push(word);
        });
        setWords(words);
        setLoading(false);
      });
    };

    getWords(level);
  }, [level]);

  const handleClick = (e) => {
    // e.preventDefault();
    setCurrentPage(e);
  };

  const onClick = (e) => {
    console.log(e.target);
    e.preventDefault();
    setLevel(e.target.id);
  };

  const onRandom = (e) => {
    //   console.log(e.target.checked)
    setRandom(e.target.checked);
  };

  const AddNoteBook = (e) => {
    return (
      <>
        <form>
          <input>key in the word</input>
        </form>
      </>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  //   console.log(wordsSet)
  const lowerCaseWords = words.map((word) => word.toLowerCase());

  // check if random words enable
  //   if (random) {
  //     const wordsArray = [...new Set(lowerCaseWords)]
  //   } else {
  //     const wordsArray = [...new Set(lowerCaseWords)].sort()
  //   }

  const wordsArray = random
    ? [...new Set(lowerCaseWords)]
    : [...new Set(lowerCaseWords)].sort();

  // Logic for displaying page numbers
  const pageNumbers = [];
  const wordsPerPage = 5;

  // Logic for displaying todos
  const indexOfLastTodo = currentPage * wordsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - wordsPerPage;
  const currentWords = wordsArray.slice(indexOfFirstTodo, indexOfLastTodo);

  for (let i = 1; i <= Math.ceil(wordsArray.length / wordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div>
        <Button
          className="red lighten-2"
          floating
          icon={<Icon>add</Icon>}
          large
          node="button"
          waves="light"
          fab={{
            direction: "top",
            hoverEnabled: true,
            toolbarEnabled: true,
            tooltip: "Add to notebook",
          }}
          // style={{ bottom: "45px", right: "45px" }}
        >
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level2">filter_2</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level3">filter_3</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level4">filter_4</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level5">filter_5</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level6">filter_6</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level7">filter_7</Icon>}
            waves="light"
          ></Button>
          <Button
            className="red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level8">filter_8</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level9">filter_9</Icon>}
            waves="light"
          ></Button>
          <Button
            className=" red lighten-1"
            onClick={onClick}
            floating
            icon={<Icon id="level10">filter_9_plus</Icon>}
            waves="light"
          ></Button>

          <Button
            className=" blue lighten-1"
            floating
            icon={
              <Link to="/notebook">
                <Icon>event_note</Icon>
              </Link>
            }
            waves="light"
          ></Button>
        </Button>
      </div>
      <div className="container">
        <div>
          <h3>Tips of the day: </h3>
          <Tips></Tips>
        </div>
        <br />
        <hr />
        <div className="row">
          <div className="col s4 m4">
            <h5>
              Current level <Icon className="tips-icon">arrow_forward</Icon>{" "}
            </h5>
          </div>
          <div className="col s2 m2">
            <h5>{level}</h5>
          </div>
        </div>

        <div>
          <Checkbox
            checked
            id="checkbox_random"
            label="Random sort"
            value="random"
            onChange={onRandom}
          />
        </div>

        <ul>
          <Collapsible accordion>
            {currentWords.map((word) => (
              <CollapsibleItem
                key={word}
                expanded={false}
                header={word}
                icon={<Icon>arrow_forward</Icon>}
                // icon={<Icon id={word} onClick={AddNoteBook}>N</Icon>}
                node="div"
              >
                <FetchWordAPI word={word}></FetchWordAPI>
              </CollapsibleItem>
            ))}
          </Collapsible>
          <br></br>
          {/* <ul id="page-numbers">{renderPageNumbers}</ul> */}
        </ul>

        <Pagination
          activePage={1}
          items={pageNumbers.length}
          leftBtn={<Icon>chevron_left</Icon>}
          maxButtons={10}
          rightBtn={<Icon>chevron_right</Icon>}
          onSelect={handleClick}
        />
      </div>
    </>
  );
}

export default Main;
