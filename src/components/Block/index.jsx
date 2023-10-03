import { forwardRef } from 'react';

export const Block = forwardRef(({ isAnimated, children }, ref) => {
  return (
    <div className={'block' + (isAnimated ? ' animated' : '')} ref={ref}>
      {children}
    </div>
  );
});
Block.displayName = 'Block';
