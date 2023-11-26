const InputWordField = () => {
  return (
    <section>
      <div className="vocabfield">
        <label htmlFor="word">Word</label>
        <input name="word" id="word" type="text" />
      </div>
      <div className="vocabfield">
        <label htmlFor="hint">Hint</label>
        <input name="hint" id="hint" type="text" />
      </div>
    </section>
  );
};

export default InputWordField;
