import React, { useCallback, useEffect, useState } from 'react';
import { Landing } from './Pages/Landing';
import { Main } from './Pages/Main';
import {useSpringRef, useTransition, animated} from '@react-spring/web';


const pages = [
  ({style, setParkingSlotCount, triggerTransitions}: any) => (
    <animated.div style={{...style}}>
      <Landing 
      triggerTransitions={triggerTransitions}
      setParkingSlotCount={setParkingSlotCount}
      />
    </animated.div>
   
  ),
  ({style, slotCount}: any) => (
    <animated.div style={{...style}}>
        <Main slotCount={slotCount}/>
    </animated.div>
  )
]
let i = 0;

function App() {

  const [parkingSlotCount, setParkingSlotCount] = useState(0);
  const [index, setIndex] = useState(0);
  const onClick = useCallback(() => setIndex((state: number)=> (state + 1) % 2), [])
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  })
  console.log("I have been rendered", i++)
  useEffect(() => {
    transRef.start()
  }, [index, transRef])

  return (
    <div className="App">
      {transitions((style, i) => {
          const Page = pages[i];
          return (
            <Page 
              style={style}
              triggerTransitions={onClick}
              slotCount={parkingSlotCount}
              setParkingSlotCount={setParkingSlotCount}
            />
          )
      })}
    </div>
  );
}

export default App;
