import type { FC } from 'react';
import { Link } from 'react-router';
import type { Article as ArticleType } from '../../../models/article';
import { formatDate } from '../../../utils/formatDate';
import { parseHTML } from '../../../utils/HTMLParser';

import './styles.css';

interface ArticleProps {
  article: ArticleType;
}

const Article: FC<ArticleProps> = ({ article }) => {
  const {
    title,
    image,
    category,
    description,
    author,
    published_at,
    source,
    url,
  } = article;

  return (
    <div className="detail-content">
      {image ? (
        <div className="detail-image">
          <img src={image} alt={title} />
        </div>
      ) : null}

      <span className="detail-category">{category}</span>
      <h1 className="detail-title">{title}</h1>
      <div className="detail-meta">
        <span>By {author || 'Unknown Author'}</span>
        <span>{formatDate(published_at)}</span>
        <span>Source: {parseHTML(source)}</span>
      </div>
      <div className="detail-text">
        <p>{parseHTML(description)}</p>
        <div className="detail-source-link">
          <Link to={url} target="_blank" rel="noopener noreferrer">
            Read full article on {parseHTML(source)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Article;
