import { useState } from "react";

interface Props {
  vocabularyWord: string;
  hintPhrase?: { hint: string; definition: string };
  id?: number;
  fieldText: { hint: string };
}

function BlankBox({
  vocabularyWord,
  hintPhrase,
  id,
  fieldText: { hint },
}: Props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleToggle = () => {
    console.log(isSelected);
    setIsSelected(!isSelected);
  };

  return (
    <section className="mainContainer">
      <div className="wordContainer">
        <div className="numberIndex">{id}</div>
        <div className="word">{vocabularyWord}</div>
      </div>
      <div className="hintBox">
        <div></div>
        <div>
          {isSelected
            ? hintPhrase && hint + ": " + hintPhrase.hint
            : hintPhrase && hint + ": " + hintPhrase.definition}
          <button className="hintButton" onClick={handleToggle}>
            {isSelected ? "see hint" : "see definition"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlankBox;
