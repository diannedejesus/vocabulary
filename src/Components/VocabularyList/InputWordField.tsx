interface Props {
  fieldText: { word: string; hint: string };
}

const InputWordField = ({ fieldText: { word, hint } }: Props) => {
  return (
    <section>
      <div className="vocabfield">
        <label htmlFor="word">{word}</label>
        <input name="word" id="word" type="text" />
      </div>
      <div className="vocabfield">
        <label htmlFor="hint">{hint}</label>
        <input name="hint" id="hint" type="text" />
      </div>
    </section>
  );
};

export default InputWordField;
