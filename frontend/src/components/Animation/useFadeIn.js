import { useState, useEffect } from 'react';

function useFadeIn(duration = 1000) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (opacity === 0) {
      timeoutId = setTimeout(() => setOpacity(0.8), 100);
    }
    return () => clearTimeout(timeoutId);
  }, [opacity]);

  const style = {
    opacity,
    transition: `opacity ${duration}ms ease-in-out`,
  };

  return style;
}

export default useFadeIn;