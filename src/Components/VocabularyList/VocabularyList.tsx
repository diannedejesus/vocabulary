import { SyntheticEvent, useEffect, useState } from "react";
import "./VocabularyList.css";
import InputWordField from "./InputWordField";

interface Props {
  onSubmit: (data: SyntheticEvent) => void;
  onRemoveWord: (data: number) => void;
  words: { word: string; hint: string; id: number }[];
  formText: { word: string; hint: string; button: string };
  title: string;
}
interface Definitions {
  [key: string]: string;
}

function VocabularyForm({
  onSubmit,
  words,
  onRemoveWord,
  title,
  formText: { word, hint, button },
}: Props) {
  const [data, setData] = useState<Definitions>();

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const fetchDefinitionWithDelay = async (word: string, delayTime: number) => {
    await delay(delayTime);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) throw new Error(`No definition found for "${word}".`);
      const data = await response.json();
      return { word, data: data[0].meanings[0].definitions[0].definition };
    } catch (error) {
      return { word, data: `Error fetching definition for "${word}".` };
    }
  };

  useEffect(() => {
    const fetchDefinitions = async () => {
      //loading
      const fetchedDefinitions: Definitions = {};

      for (let i = 0; i < words.length; i++) {
        const word = words[i].word;
        const result = await fetchDefinitionWithDelay(word, 1000);
        fetchedDefinitions[result.word] = result.data;
      }
      setData(fetchedDefinitions);
      //loading
    };

    fetchDefinitions();
  }, [words]);

  //console.log(data);

  return (
    <>
      <h2>{title}</h2>
      <section className="vocabForm">
        <form
          id="addword"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}
        >
          <InputWordField fieldText={{ word, hint }} />
          <button>{button}</button>
        </form>
      </section>

      <section>
        {words.map(
          (
            word: {
              word: string;
              hint: string;
              id: number;
            },
            index: number
          ) => (
            <div className="list" key={word.id}>
              <div>{index + 1}.</div>
              <div className="data">
                <div className="listWord">{word.word}</div>{" "}
                <div className="listHint">hint: {word.hint}</div>
                <div className="listHint">
                  definition: {data && data[word.word]}
                </div>
              </div>
              <button onClick={() => onRemoveWord(word.id)}>-</button>
            </div>
          )
        )}
      </section>
    </>
  );
}

export default VocabularyForm;
