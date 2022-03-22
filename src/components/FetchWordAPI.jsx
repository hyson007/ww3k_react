import React from "react";
import { useEffect, useState } from "react";
import { Icon } from "react-materialize";
function FetchWordAPI({ word }) {
  const [result, setResult] = useState(null);
  const [example, setExample] = useState("");

  useEffect(() => {
    const getAPI = async () => {
      setExample(`https://www.dictionary.com/browse/${word}`);
      const result = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!result.ok) {
        throw new Error("Something went wrong");
      }

      const data = await result.json();
      //   console.log(word);
      // console.log(data);
      setResult({
        word: data[0]?.word,
        wordMeaning: data[0]?.meanings,
        audio: data[0]?.phonetics?.filter(
          (phonetic) => phonetic.audio.length > 5
        )[0]?.audio,
      });
    };

    getAPI();
  }, [word]);

  const playAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  //   const notebookHandler = (e) => {
  //     e.preventDefault();
  //     setNoteBook([...notebook, e.target.id]);
  //   }

  //   console.log(notebook)
  return (
    <div>
      <div className="links">
        <></>
      </div>
      {result &&
        result.wordMeaning &&
        result.wordMeaning.map((meaning, index) => {
          return (
            // type of words
            <div key={index}>
              <div className="header">
                {meaning.partOfSpeech}

                {/* {meaning.antonyms.length > 0 && (
                  <p>
                    <Icon Tiny>A</Icon>{" "}
                    {meaning.antonyms.map((antonym) => antonym + ";")}
                  </p>
                )}
                {meaning.synonyms.length > 0 && (
                  <p>
                    <Icon Tiny>S</Icon>{" "}
                    {meaning.synonyms.map((synonym) => synonym + ";")}
                  </p>
                )} */}

                {result && result.audio && (
                  <div onClick={() => playAudio(result.audio)}>
                    <Icon small>audiotrack</Icon>
                  </div>
                )}

                <div>
                  <a href={example} target="_blank" rel="noopener noreferrer">
                    More Examples{" "}
                  </a>
                </div>

                {/* <div>
                  <Icon small onClick={notebookHandler} id={result.word}>N</Icon>
                </div> */}
              </div>
              <hr />

              {/* definition and examples */}
              {result &&
                result.wordMeaning &&
                result.wordMeaning.map((meaning) => {
                  return meaning.definitions.map((definition, index) => {
                    return (
                      <div key={index}>
                        <p>
                          {index + 1}
                          {" : "}
                          {definition.definition}
                        </p>

                        {definition.example && (
                          <p>
                            <Icon small className="tips-icon">
                              chrome_reader_mode
                            </Icon>{" "}
                            {definition.example}
                          </p>
                        )}
                      </div>
                    );
                  });
                })}
            </div>
          );
        })}
    </div>
  );
}

export default FetchWordAPI;
