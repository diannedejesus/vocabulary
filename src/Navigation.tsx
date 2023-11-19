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
            <a onClick={() => onClick("blank")}>Missing Letters</a>
          </li>
          <li>
            <a onClick={() => onClick("scramble")}>Word Scramble</a>
          </li>
          <li>
            <a onClick={() => onClick("form")}>Word List</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
