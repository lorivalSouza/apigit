import './styles.css';

type Props = {
  title: string;
  href: string;
};

const ResultCardLink = ({ title, href }: Props) => {
  return (
      <div className="result-container-link-info">
        <h3 className="result-link-title">{title}</h3>
        <a className="result-link-description" href={href}>
          {href}
        </a>
      </div>
  );
};

export default ResultCardLink;
