interface Props {
  text: { name: string; date: string };
}

function TopSection({ text }: Props) {
  return (
    <section className="topsection">
      <p>{text.name}:&nbsp;</p>
      <p className="fill-name-date"></p>
      <p>{text.date}:&nbsp;</p>
      <p className="fill-name-date"></p>
    </section>
  );
}

export default TopSection;
