import { useRef, useState } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import Switch from 'react-switch';

import news from './assets/news.png';
import man from './assets/happy-man-3.svg';
import deadMan from './assets/dead-man-3.svg';
import mask from './assets/mask.svg';
import redGirl from './assets/girl-circle-red.svg';
import girl from './assets/girl-circle.svg';
import redDude from './assets/man-circle-red.svg';
import dude from './assets/man-circle.svg';
import police from './assets/grim-reaper.svg';

import covids from './assets/covids.gif';
import covid from './assets/covid.gif';
import oldMan from './assets/old-home.gif';
import stayHome1 from './assets/stay-home-1.gif';
import stayHome2 from './assets/stay-home-2.gif';

function App() {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1.4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.1], [8, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.1], [0, 80]);
  const translateX = useTransform(scrollYProgress, [0, 0.1], [0, 0]);

  const [isMaskOnDrag, setIsMaskOnDrag] = useState(false);
  const [isDistant, setIsDistant] = useState(true);
  const [isOnDrag, setIsOnDrag] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [isPoliceOut, setIsPoliceOut] = useState(false);
  const [isPeek, setIsPeek] = useState(false);

  const girlRef = useRef();
  const ref = useRef();

  const calculateX = () => {
    setIsOnDrag(true);

    const girlPosition = girlRef.current.getBoundingClientRect().x;
    const dudePosition = ref.current.getBoundingClientRect().x;

    if (dudePosition - girlPosition < 254) {
      setIsDistant(false);
    } else {
      setIsDistant(true);
    }
  };

  const handleSwitch = (isTurnedOn) => {
    if (!isTurnedOn && !isPoliceOut) {
      setIsPeek(false);
      setIsPoliceOut(true);
      setIsSwitchOn(false);
      setTimeout(() => {
        setIsPoliceOut(false);
        setIsSwitchOn(true);
      }, 1000);
    }
  };

  const handleOnMouseEnterSwitch = () => {
    const random = Math.random() * 100;
    if (random > 50) {
      setIsPeek(true);
      setIsPoliceOut(true);
    }
  };

  const handleOnMouseLeaveSwitch = () => {
    if (isSwitchOn) {
      setIsPoliceOut(false);
    }
  };

  let content = 'Drag this dude';

  if (isOnDrag && isDistant) {
    content =
      'I know condition make you have to go outside, keep this distance';
  }

  if (isOnDrag && !isDistant) {
    content = 'Too close! Respect others';
  }

  return (
    <>
      <div className={isMaskOnDrag ? 'container' : ''}>
        <section className='alert'>
          <h1>
            <strong>Red</strong> Alert: New Variant!
          </h1>
          <motion.img
            src={news}
            alt=''
            className='alert__img'
            style={{ translateX, translateY, scale, perspective: 150, rotateX }}
          />
        </section>
        <section className='mask'>
          <h1 className='mask__title'>
            <strong>Masks</strong> Matter
          </h1>
          <img
            src={isMaskOnDrag ? deadMan : man}
            alt=''
            className='mask__img-men'
          />
          {isMaskOnDrag && (
            <>
              <img src={covids} className='mask__gif-covids' />
              <img src={covid} className='mask__gif-covid' />
            </>
          )}
          <motion.img
            onDrag={() => setIsMaskOnDrag(true)}
            onDragEnd={() => setIsMaskOnDrag(false)}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            src={mask}
            className='mask__img-mask'
          />
          <p>*ps: dont drag his mask away</p>
        </section>
        <section className='distancing'>
          <h1>
            Physical <strong>Distancing</strong>
          </h1>
          <div className='distancing__svg-container'>
            <img
              ref={girlRef}
              src={isDistant ? girl : redGirl}
              alt=''
              className='distancing__img-girl'
            />
            <motion.img
              ref={ref}
              onDrag={calculateX}
              onDragEnd={() => setIsOnDrag(false)}
              drag='x'
              src={isDistant ? dude : redDude}
              alt=''
              className='distancing__img-dude'
            />
          </div>
          <p>{content}</p>
        </section>
        <section className='home'>
          <h1>
            Would You Stay at <strong>Home</strong>?
          </h1>
          <div className='switch-container'>
            <img
              src={police}
              alt=''
              className={
                isPoliceOut
                  ? isPeek
                    ? 'home__police-peek-out'
                    : 'home__police-out'
                  : isPeek
                  ? 'home__police-peek'
                  : 'home__police'
              }
            />
            <div
              onMouseEnter={handleOnMouseEnterSwitch}
              onMouseLeave={handleOnMouseLeaveSwitch}
            >
              <Switch
                onChange={(isTurnedOn) => handleSwitch(isTurnedOn)}
                checked={isSwitchOn}
                onColor='#F36B17'
                height={112}
                width={224}
              />
            </div>
            <h2>{isSwitchOn ? 'Absolutely!' : 'Nope..'}</h2>
          </div>
          <div className='home__gif-container'>
            <img src={oldMan} alt='' />
            <img src={stayHome2} alt='' />
            <img src={stayHome1} alt='' />
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
