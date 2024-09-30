interface Props {
  vocabularyWord: string;
  hintPhrase?: string;
  id?: number;
  fieldText: { hint: string };
}

function BlankBox({
  vocabularyWord,
  hintPhrase,
  id,
  fieldText: { hint },
}: Props) {
  return (
    <section className="mainContainer">
      <div className="wordContainer">
        <div className="numberIndex">{id}</div>
        <div className="word">{vocabularyWord}</div>
      </div>
      <div className="hintBox">
        <div></div>
        <div>{hintPhrase && hint + ": " + hintPhrase} </div>
      </div>
    </section>
  );
}

export default BlankBox;
