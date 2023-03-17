import React, { useState } from 'react';
import { Landing } from './Pages/Landing';
import { Main } from './Pages/Main';

function App() {

  const [parkingSlotCount, setParkingSlotCount] = useState(0);
  const Pages = [
    <Landing 
      setParkingSlotCount={setParkingSlotCount}
      />,
      <Main slotCount={parkingSlotCount}/>
  ]

  return (
    <div className="App">
    {Pages.map(page => page)}
    </div>
  );
}

export default App;
