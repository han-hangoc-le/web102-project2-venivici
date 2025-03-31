import './App.css'
import MainCard from './components/MainCard.jsx'
import BanList from './components/BanList.jsx'
import History from './components/History.jsx'

function App() {
  return (
    <>
      <div className='styling'>
        <History/>
        <MainCard/>
        <BanList/>
      </div>
    </>
  )
}

export default App
