import './App.css'
import { QueryInput } from './components/QueryInput'
import { ResultChart } from './components/ResultChart'
function App() {
  

  return (
    <div className='p-8 bg-[#1f1f1f] text-[#f8f9fa] h-[100%] w-[100%] flex flex-col items-center gap-4'>
    <QueryInput/>
    <ResultChart/>  
    </div>
  )
}

export default App
