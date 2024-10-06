import helperfunctions from "../../services/helper-classes";
import "./blanks.css";
import TopSection from "../TopSection";
import BlankBox from "./BlanksBox";

interface Props {
  vocabularyList: {
    word: string;
    hint: string;
    id: number;
    definition: string;
  }[];
  title: string;
  topSection: { name: string; date: string };
  formText: { hint: string };
}

const BlankList = ({
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
        (
          word: { word: string; hint: string; id: number; definition: string },
          index: number
        ) => {
          return (
            <BlankBox
              key={word.id}
              fieldText={{ hint }}
              vocabularyWord={helpers.maskWord(word.word)}
              hintPhrase={{ hint: word.hint, definition: word.definition }}
              id={index + 1}
            />
          );
        }
      )}
    </>
  );
};

export default BlankList;
