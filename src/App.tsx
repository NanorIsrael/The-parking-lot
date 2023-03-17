import React, { useState } from 'react';
import { Landing } from './Pages/Landing';
import { Main } from './Pages/Main';

function App() {

  const [parkingSlotCount, setParkingSlotCount] = useState(0);

  return (
    <div className="App">
    <Landing 
      setParkingSlotCount={setParkingSlotCount}
      />
      <Main slotCount={parkingSlotCount}/>
    </div>
  );
}

export default App;
