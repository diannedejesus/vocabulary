interface Props {
  vocabularyWord: string;
  hintPhrase?: string;
  id?: number;
}

function ScrambleBox({ vocabularyWord, hintPhrase, id }: Props) {
  return (
    <section className="mainContainer">
      <div className="wordContainer">
        <div className="numberIndex">{id}</div>
        <div className="word">{vocabularyWord}</div>
        <div className="writingBox">
          <div className="topWrite"></div>
          <div></div>
        </div>
      </div>
      <div className="hintBox">
        <div></div>
        <div>{hintPhrase && "hint: " + hintPhrase} </div>
      </div>
    </section>
  );
}

export default ScrambleBox;
