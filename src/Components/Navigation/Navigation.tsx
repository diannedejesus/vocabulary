import "./Navigation.css";

interface Props {
  onPageClick: (type: string) => void;
  onLanguageClick: (language: string) => void;
  text: {
    title: string;
    navigation: {
      scramble: string;
      missing: string;
      search: string;
      list: string;
      print: string;
    };
  };
}

function Navigation({
  onPageClick,
  onLanguageClick,
  text: { title, navigation },
}: Props) {
  return (
    <>
      <nav className="nav">
        <ul className="languages">
          <li>
            <a href="#" onClick={() => onLanguageClick("spanish")}>
              PR
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onLanguageClick("english")}>
              USA
            </a>
          </li>
          <li>
            <a href="#" onClick={() => window.print()}>
              {navigation.print}
            </a>
          </li>
        </ul>
        <ul>
          <li>
            <h1>{title}:</h1>
          </li>
          <li>
            <a href="#" onClick={() => onPageClick("blank")}>
              {navigation.missing}
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onPageClick("scramble")}>
              {navigation.scramble}
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onPageClick("wordsearch")}>
              {navigation.search}
            </a>
          </li>
          <li>
            <a href="#" onClick={() => onPageClick("form")}>
              {navigation.list}
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
