import helperfunctions from "../../services/helper-classes";
import ScrambleBox from "./ScrambleBox";

interface Props {
  vocabularyList: { word: string; hint: string; id: number }[];
}

const ScrambleList = ({ vocabularyList }: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(vocabularyList);

  return (
    <>
      <h2>Scrambled Vocabulary</h2>
      {randomizedList.map(
        (word: { word: string; hint: string; id: number }, index: number) => {
          return (
            <ScrambleBox
              key={word.id}
              vocabularyWord={helpers.scrambleWord(word.word, 10)}
              hintPhrase={word.hint}
              id={index + 1}
            />
          );
        }
      )}
    </>
  );
};

export default ScrambleList;