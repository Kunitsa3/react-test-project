import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Ball } from './components/Ball';
import { Block } from './components/Block';
import { StartButton } from './components/StartButton';

const BALL_ANIMATION_DURATION = 2000;

function App() {
  const [isBallMoving, setBallMoving] = useState(false);
  const [ballPosition, setBallPosition] = useState({ top: 0, left: 0 });
  const timeLeftRef = useRef(BALL_ANIMATION_DURATION);
  const startBlockRef = useRef();
  const deltaTopRef = useRef();
  const deltaLeftRef = useRef();
  const finishBlockRef = useRef();
  const ballMovingTimerRef = useRef();

  const startBallMoving = () => {
    if (startBlockRef.current && finishBlockRef.current) {
      const {
        x: startX,
        y: startY,
        width: startWidth,
        height: startHeight,
      } = startBlockRef.current.getBoundingClientRect();

      const startTop = startY + startHeight / 2;
      const startLeft = startX + startWidth / 2;
      setBallPosition({
        top: startTop,
        left: startLeft,
      });
      const {
        x: finishX,
        y: finishY,
        width: finishWidth,
        height: finishHeight,
      } = finishBlockRef.current.getBoundingClientRect();

      const finishTop = finishY + finishHeight / 2;
      const finishLeft = finishX + finishWidth / 2;

      deltaTopRef.current = (finishTop - startTop) / (timeLeftRef.current / 4);
      deltaLeftRef.current = (finishLeft - startLeft) / (timeLeftRef.current / 4);

      ballMovingTimerRef.current && clearInterval(ballMovingTimerRef.current);

      ballMovingTimerRef.current = setInterval(() => {
        setBallPosition(oldBallPosition => {
          const newTop = oldBallPosition.top + deltaTopRef.current;
          const newLeft = oldBallPosition.left + deltaLeftRef.current;

          if (timeLeftRef.current <= 0) {
            setBallMoving(false);
            ballMovingTimerRef.current && clearInterval(ballMovingTimerRef.current);
            timeLeftRef.current = BALL_ANIMATION_DURATION;
            return { top: 0, left: 0 };
          }

          timeLeftRef.current = timeLeftRef.current - 4;

          return {
            top: newTop,
            left: newLeft,
          };
        });
      }, 4);
      setBallMoving(true);
    }
  };

  useEffect(() => {
    const recalculate = () => {
      const {
        x: finishX,
        y: finishY,
        width: finishWidth,
        height: finishHeight,
      } = finishBlockRef.current.getBoundingClientRect();

      const finishTop = finishY + finishHeight / 2;
      const finishLeft = finishX + finishWidth / 2;

      deltaTopRef.current = (finishTop - ballPosition.top) / (timeLeftRef.current / 4);
      deltaLeftRef.current = (finishLeft - ballPosition.left) / (timeLeftRef.current / 4);
    };

    window.addEventListener('resize', recalculate);

    return () => {
      window.removeEventListener('resize', recalculate);
    };
  }, [ballPosition]);

  return (
    <div className="main-field">
      <div className="block-section">
        <Block isAnimated ref={startBlockRef}>
          1
        </Block>
        <Block ref={finishBlockRef}>2</Block>
      </div>
      {isBallMoving && <Ball position={ballPosition}></Ball>}
      <StartButton onClick={startBallMoving}></StartButton>
    </div>
  );
}

export default App;
