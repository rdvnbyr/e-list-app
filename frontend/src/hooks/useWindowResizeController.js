import {useEffect, useState} from 'react';
import {isFunction} from 'lodash';

export function useWindowResizeController(callback) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (callback && isFunction(callback)) {
      callback(windowSize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  return windowSize;
}
