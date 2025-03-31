import './App.css'
import MainCard from './components/MainCard.jsx'
import BanList from './components/BanList.jsx'
import History from './components/History.jsx'
import { useState } from 'react';

function App() {
  const [banList, setBanList] = useState([])
  const [seenArtworks, setSeenArtworks] = useState([])

  const addToBanList = (attribute) => {
    setBanList((prev) => [...prev, attribute])
  };

  const removeFromBanList = (attribute) => {
    setBanList((prev) => prev.filter((item) => item !== attribute))
  };

  return (
    <>
      <div className="styling">
        <History seenArtworks={seenArtworks} />
        <MainCard
          addToBanList={addToBanList}
          setSeenArtworks={setSeenArtworks}
          banList={banList}
        />
        <BanList banList={banList} removeFromBanList={removeFromBanList} />
      </div>
    </>
  );
}

export default App
