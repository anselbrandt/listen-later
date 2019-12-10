import { useEffect, useState } from 'react';
import ytpl from 'ytpl';

export default function useValidator(submittedInput) {
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    setIsValid();
    if (submittedInput) {
      if (ytpl.validateURL(submittedInput)) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [submittedInput]);

  return { isValid };
}
