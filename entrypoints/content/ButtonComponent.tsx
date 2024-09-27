import React, { useState, useRef, useEffect } from 'react';
import birdsEyeLogo from '@/assets/icons/icon128.png';
import './ButtonComponent.scss';
import { State } from '../content';

// accept props in the functional component
// const ButtonComponent: React.FC = () => {
const ButtonComponent = ( { state } : { state:State } ) => {
  const {innerWidth, innerHeight} = window;
  const [position, setPosition] = useState({ x: innerWidth-50, y: innerHeight-50 });
  const [dragging, setDragging] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // This useEffect will handle mouse move events even outside the button container
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        if(e.clientX < 25 || e.clientY < 25) return;
        if(e.clientX > innerWidth-25 || e.clientY > innerHeight-25) return;
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);
      }
    };

    // Add event listeners to handle dragging
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup the listeners when the component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  return (
    <div className="base-position">
      <button
        ref={buttonRef}
        style={{
          left: `calc(${position.x}px - 25px)`,
          top: `calc(${position.y}px - 25px)`,
          position: 'absolute',
        }}
        className="floating-button"
        onMouseDown={handleMouseDown}
        onClick={() => {
          state.level += 1;
          console.log(state);
        }
        }
      >
        <img src={birdsEyeLogo} alt="Birds Eye Logo" />
      </button>
    </div>
  );
};

export default ButtonComponent;
