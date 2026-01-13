import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/useTheme';

const Toggle = ({
  options,
  activeIndex: controlledIndex,
  onChange,
  sizeSmall = false,
}) => {
  // If parent does not control, default to 0
  const [uncontrolledIndex, setUncontrolledIndex] = useState(0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : uncontrolledIndex;

  const [dimensions, setDimensions] = useState({
    width: 0,
    transform: 0,
  });

  const buttonRefs = useRef([]);
  const mainParentRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (buttonRefs.current[activeIndex] && mainParentRef.current) {
        const selectedButton = buttonRefs.current[activeIndex];
        const width = selectedButton.offsetWidth + 5;
        const transform = selectedButton.offsetLeft;

        setDimensions({
          width: width,
          transform: transform - 2,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [activeIndex, options]);

  const handleClick = (index) => {
    if (!isControlled) setUncontrolledIndex(index);
    onChange?.(index);
  };

  return (
    <div
      ref={mainParentRef}
      className={`flex gap-1 text-sm cursor-pointer ${
        isDarkMode ? ' text-white' : 'text-black'
      } relative overflow-hidden w-fit`}
    >
      <div
        className=''

      />
      {options.map((option, index) => {
        const Tag = option?.url ? Link : 'button';
        const params = {
          ...(option?.url && { to: option?.url }),
        };

        return (
          <Tag
            key={index}
            ref={(el) => (buttonRefs.current[index] = el)}
            className={` font-semibold cursor-pointer ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            } ease-in-out z-1 capitalize
              ${activeIndex === index && `${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              ${sizeSmall ? 'text-xs  px-3' : 'px-4'}`}
            onClick={() => handleClick(index)}
            {...params}
          >
            {option?.title}
          </Tag>
        );
      })}
    </div>
  );
};

export default Toggle;
