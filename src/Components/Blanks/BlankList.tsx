import helperfunctions from "../../services/helper-classes";
import TopSection from "../TopSection";
import BlankBox from "./BlanksBox";

interface Props {
  vocabularyList: { word: string; hint: string; id: number }[];
  title: string;
  topSection: { name: string; date: string };
}

const BlankList = ({ vocabularyList, title, topSection }: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(vocabularyList);

  return (
    <>
      <TopSection text={topSection} />
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
