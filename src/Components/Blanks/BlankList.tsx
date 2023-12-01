import helperfunctions from "../../services/helper-classes";
import BlankBox from "./BlanksBox";

interface Props {
  vocabularyList: { word: string; hint: string; id: number }[];
  title: string;
}

const BlankList = ({ vocabularyList, title }: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(vocabularyList);

  return (
    <>
      <h2>{title}</h2>
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
