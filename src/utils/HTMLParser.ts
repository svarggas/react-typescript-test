import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

export const parseHTML = (htmlString: string) => {
  const sanitized = DOMPurify.sanitize(htmlString, {
    USE_PROFILES: { html: true },
  });
  return parse(sanitized);
};
