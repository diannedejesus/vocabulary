import { SyntheticEvent } from "react";
import "./VocabularyList.css";
import InputWordField from "./InputWordField";

interface Props {
  onSubmit: (data: SyntheticEvent) => void;
  onRemoveWord: (data: number) => void;
  words: { word: string; hint: string; id: number }[];
  formText: { word: string; hint: string; button: string };
  title: string;
}

function VocabularyForm({
  onSubmit,
  words,
  onRemoveWord,
  title,
  formText: { word, hint, button },
}: Props) {
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
          (word: { word: string; hint: string; id: number }, index: number) => (
            <div className="list" key={word.id}>
              <div>{index + 1}.</div>
              <div className="data">
                <div className="listWord">{word.word}</div>{" "}
                <div className="listHint">{word.hint}</div>
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
