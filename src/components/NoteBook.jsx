import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { Icon, Button } from "react-materialize";

function NoteBook() {
  const [word, setWord] = useState("");
  const [formData, setFormData] = useState([]);

  const storeNoteBook = localStorage.getItem("formData");

  useEffect(() => {
    if (storeNoteBook) {
      setFormData(JSON.parse(storeNoteBook));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(word, notebook)
    if (word.length === 0) {
      toast.error("enter a valid word");
      return;
    }

    const isFound = formData.findIndex((fm) => fm.word === word);

    if (isFound === -1) {
      setFormData((formData) => [
        ...formData,
        {
          word: word,
          example: `https://www.dictionary.com/browse/${word}`,
        },
      ]);
      toast.success("added to notebook");
    } else {
      toast.error("already in notebook");
    }

    // setNoteBook([...notebook, word]);
  };

  //   console.log(notebook);

  const onChange = (e) => {
    setWord(e.target.value);
  };

  const DeleteOnClick = (e) => {
    e.preventDefault();
    const newFormData = formData.filter((item) => item.word !== e.target.id);
    setFormData(newFormData);
  };

  //   const renderWords = () => {
  //     return notebook.map((word, index) => {
  //       return (
  //         <table>
  //           <tr>
  //             <th>Word</th>
  //             <th>More example</th>
  //             <th>Delete</th>
  //           </tr>
  //           {notebook.map((word) => {
  //             return (

  //             );
  //           })}
  //         </table>
  //       );
  //     });
  //   };

  //   formData.map((word) => console.log(word));

  // console.log(formData)

  const renderWords = () => {
    // console.log(notebook);
    return formData.map((word, index) => {
      return (
        <tr key={index}>
          <td>{word.word}</td>
          <td>
            <Icon className="tips-icon">launch</Icon>
            <a href={word.example} target="_blank" rel="noopener noreferrer">
              Go
            </a>
          </td>
          <td>
            <Icon className="tips-icon" id={word.word} onClick={DeleteOnClick}>
              delete
            </Icon>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div>
        <h3>Words NoteBook! </h3>
        <div>
          <Icon>keyboard_return </Icon>
          <Link to="/">Back to main page</Link>
        </div>
      </div>
      <br />
      <div className="row">
        <form action="" onSubmit={onSubmit}>
          <p>Add a new word</p>
          <input
            icon={<Icon>short_text</Icon>}
            id="notebook"
            label="Word to remember!"
            onChange={onChange}
          />
          <Button onClick={onSubmit}>submit</Button>
        </form>
      </div>
      <br />
      <br />
      <p>my saved words:</p>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Word</th>
              <th>More Example</th>
              <th>Delete</th>
            </tr>
            {formData && renderWords()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NoteBook;
