import { SyntheticEvent } from "react";
import "./vocabform.css";
import InputWordField from "./InputWordField";

interface Props {
  onSubmit: (data: SyntheticEvent) => void;
  onRemoveWord: (data: number) => void;
  words: { word: string; hint: string; id: number }[];
}

function VocabularyForm({ onSubmit, words, onRemoveWord }: Props) {
  return (
    <>
      <h2>Edit Vocabulary</h2>
      <section className="vocabForm">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}
        >
          <InputWordField />
          <button>Add</button>
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
