import helperfunctions from "./services/helper-classes";
import BlankBox from "./ScrambleWords/BlanksBox";

interface Props {
  vocabularyList: { word: string; hint: string; id: number }[];
}

const BlankList = ({ vocabularyList }: Props) => {
  const helpers = new helperfunctions();

  const randomizedList = helpers.randomizeWords(vocabularyList);

  return (
    <>
      <h2>Missing Letters</h2>
      {randomizedList.map(
        (word: { word: string; hint: string; id: number }, index: number) => {
          return (
            <BlankBox
              key={word.id}
              vocabularyWord={helpers.maskWord(word.word)}
              hintPhrase={word.hint}
              id={index + 1}
            />
          );
        }
      )}
    </>
  );
};

export default BlankList;
