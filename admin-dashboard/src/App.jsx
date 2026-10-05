import './App.css'
import Dashboard from './Components/Dashboard'
import { Route, Routes} from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {

  return (
    <div className='flex flex-col w-screen min-h-full bg-slate-50'>
    <Navbar />
    <main className='flex-grow pt-20 p-6 w-full'>

      <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='*' element={<Dashboard/>} />
      </Routes>
    </main>
    <Footer />
    </div>
  )
}

export default App
