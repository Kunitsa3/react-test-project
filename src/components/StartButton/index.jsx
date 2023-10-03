import { useRef, useState } from 'react';

export const StartButton = ({ onClick }) => {
  const BLOCK_ANIMATION_DURATION = 2000;
  const [isClicked, setClicked] = useState(false);
  const [countDownLabel, setCountDownLabel] = useState(BLOCK_ANIMATION_DURATION);
  const countDownTimerRef = useRef();

  const handleClick = () => {
    onClick();
    setClicked(true);

    countDownTimerRef.current = setInterval(() => {
      setCountDownLabel(oldLabelValue => {
        const newLabelValue = oldLabelValue - 1;

        if (newLabelValue === -1) {
          setClicked(false);
          countDownTimerRef.current && clearInterval(countDownTimerRef.current);
          return 5;
        } else {
          return newLabelValue;
        }
      });
    }, 1000);
  };

  return (
    <button className="button start" onClick={handleClick} disabled={isClicked}>
      {isClicked ? countDownLabel : 'START'}
    </button>
  );
};
StartButton.displayName = 'StartButton';
