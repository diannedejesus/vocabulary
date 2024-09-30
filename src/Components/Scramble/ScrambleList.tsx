import helperfunctions from "../../services/helper-classes";
import TopSection from "../TopSection";
import ScrambleBox from "./ScrambleBox";

interface Props {
  vocabularyList: { word: string; hint: string; id: number }[];
  title: string;
  topSection: { name: string; date: string };
  formText: { hint: string };
}

const ScrambleList = ({
  vocabularyList,
  title,
  topSection,
  formText: { hint },
}: Props) => {
  const helpers = new helperfunctions();
  const randomizedList = helpers.randomizeWords(vocabularyList);

  return (
    <>
      <TopSection text={topSection} />
      <h2>{title}</h2>
      {randomizedList.map(
        (word: { word: string; hint: string; id: number }, index: number) => {
          return (
            <ScrambleBox
              key={word.id}
              fieldText={{ hint }}
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
