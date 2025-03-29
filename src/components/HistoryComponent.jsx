import {React,useState,useEffect} from 'react';
import { db } from '../apis/fetchData';


export const HistoryComponent = ({setOpenModal,setSearchInput}) => {

  const [histories, setHistories] = useState([]);

  const handleSearchFromHistory = (searchContentFromHistory) => { // Search from history
    setSearchInput(searchContentFromHistory);
    setOpenModal(false);
  }
  
   useEffect(() => {
          const fetchHistory = async () => {
            const data = await db.history.limit(6).toArray();
            setHistories(data.reverse()); // Show latest first
          };
          fetchHistory();
        }, []);
  
  return (
    <section
       className ='bg-black bg-opacity-75 fixed inset-0  flex items-center justify-center w-[100%] h-[100%]'
       onClick={()=>{setOpenModal(false)}}
      >
        <div 
          className = 'flex flex-col justify-center items-center gap-2 rounded-lg p-2 mx-5 my-2 shadow-xl shadow-[#00000066]  bg-[#1f1f1f]'>
            {histories.map((history,index)=>(
              <li
                 onClick={()=>{handleSearchFromHistory(history.term)}}
                 className='w-full rounded list-none p-3 bg-[#2a2a2a] hover:bg-[#333333]'
                 key={index}>{history.term}</li>
            ))}

          <button
            className='px-3 py-1 bg-[#2a2a2a] hover:bg-[#333333] text-[#3ecf8e] rounded-full'
            onClick={()=>{setOpenModal(false)}}>X    
          </button>

        </div>
    </section>
  )
}
