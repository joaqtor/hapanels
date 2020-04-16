import { useEffect } from 'react';

import { DEFAULT_TITLE, POST_TITLE } from '../constants';

const useTitle = (title) => {
  useEffect(() => {
    if (title) {
      document.title = `${title}${POST_TITLE}`;
    } else {
      document.title = `${DEFAULT_TITLE}`;
    }
  }, [title]);
};

export default useTitle;
