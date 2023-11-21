import "./Navigation.css";

interface Props {
  onClick: (type: string) => void;
}

function Navigation({ onClick }: Props) {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <h1>WorkSheets:</h1>
          </li>
          <li>
            <a href="#" onClick={() => onClick("blank")}>
              Missing Letters
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onClick("scramble")}>
              Word Scramble
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onClick("wordsearch")}>
              Word Search
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onClick("form")}>
              Word List
            </a>
          </li>
          <li>
            <a href="#" onClick={() => window.print()}>
              Print
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
