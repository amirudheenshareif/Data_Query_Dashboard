import { createContext, React,useEffect,useState } from 'react'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HistoryComponent } from './HistoryComponent';
import axios from 'axios';
import { findMockData } from '../apis/fetchData';
import { ResultChart } from './ResultChart';
import { BarLoader } from 'react-spinners';
import { addSearchInput } from '../apis/fetchData';

export const DataContext = createContext({});

export const QueryInput = () => {

    const [searchInput, setSearchInput] = useState('');
    const[suggestionArray, setSuggestionArray] = useState([]);
    const[loading, setLoading] = useState(false);
    const[data, setData] = useState([]);
    const[openModal, setOpenModal] = useState(false);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY ;
    

    const handleSearch =  async (searchInput) => {
         setLoading(true);
         setSuggestionArray([]); // suggestions shouldn't be shown after search
         
        try{
            await addSearchInput(searchInput); // Add successful search input to history
            const functionFinder = findMockData(searchInput); // finds a specific function first to generate data for specific keyword
                                                              //  and returns relevant data
            const result = functionFinder;
            console.log(functionFinder);
            //console.log(result);

            setData(result); // resultant data is set to data state and passed to ResultChart component
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    const handleSugggestion = async (searchInput)=>{
        setLoading(true);

        try{ // Google Gemini API call to generate suggestions based on user input
            const response = await axios({
                method : "post",
                url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                data: {
                    contents: [{ parts: [{ text: `Generate 4 single line and relevant questions specifically designed for data visualization. 
                                                  The questions should focus on quantitative data, trends, comparisons, breakdowns, and distributions related to sales, customer analytics, marketing performance, operational efficiency, and financial metrics. 
                                                  Ensure that each question explicitly includes the user input's corrected phrase without adding unnecessary punctuation or quotes.
                                                  Provide the questions as a JSON array of strings without any introduction or extra text.
                                                  UserInput: ${searchInput}


                                                  ` }] }],
                  },
            })

            let stringData = response.data.candidates[0].content.parts[0].text;
            // console.log(stringData);

            stringData = stringData.replace(/```json|```/g, ""); //removing unnecessary characters
            const JSONData = JSON.parse(stringData); // converting string to JSON
            // console.log(JSONData);

            setSuggestionArray(JSONData); // setting suggestions to suggestionArray state
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (searchInput.trim() === ''){
            setSuggestionArray([]);// if search input is empty, suggestions should be empty
            setData([]); // if search input is empty, data should also be empty prevents rendering charts of previous data
            return;
        }

        const timer = setTimeout(() => { // debounce function to prevent multiple API calls
            handleSugggestion(searchInput);
        }, 500);

        return () => clearTimeout(timer);

    }, [searchInput]); 

  return (
    <>
    {openModal ? ( <HistoryComponent setOpenModal={setOpenModal} setSearchInput={setSearchInput}/> )
    
     :(
        <>
        <div className='flex flex-col sm:flex-row w-full gap-4  '>
             <header className='flex gap-2 w-full '>
                 <input 
                   className='p-2 w-[90%] bg-[#2a2a2a] border-[#404040] focus:border-[#3ecf8e] focus:shadow-md focus:shadow-[#3ecf8e33] hover:border-[#3ecf8e] text-[#f8f9fa] ' 
                   type='text' 
                   value={searchInput} 
                   onChange={(e) => setSearchInput(e.target.value)} 
                   placeholder='Enter a query'/>
   
                  <button className='rounded-md px-3 py-2 bg-[#6f6f6f] ' onClick={()=>{handleSearch(searchInput)}}>
                    <FontAwesomeIcon icon={faSearch} />
                 </button>
             </header>
      
        <button 
          className='w-full sm:w-[20%] md:w-[40%] p-2 rounded-md bg-[#3ecf8e] hover:bg-[#30b879] text-black shadow-md shadow-[#00000033]'
          onClick={()=>{setOpenModal(true)}}>
             View Previous Queries
       </button>

       <button 
          className='w-full sm:w-[20%] md:w-[40%] p-2 rounded-md bg-[#2a2a2a] hover:bg-[#333333] text-[#6f6f6f] hover:text-[#f8f9fa] shadow-md shadow-[#00000033]'
          onClick={()=>{setSearchInput("")}}>
             Clear Search
       </button>
      </div>

   <div className='flex flex-col rounded-md w-full bg-[#2a2a2a] shadow-lg shadow-[#00000040] '>
    {loading && <div className="w-full flex justify-center items-center">
                  <BarLoader color='#3ecf8e'width='100%'/>
                    </div>}

    {!loading && suggestionArray.map((suggestion,index)=>(
        <li
        onClick={()=>setSearchInput(suggestion)}
        className='w-full  list-none p-3 text-[#f8f9fa] hover:bg-[#333333] cursor-pointer'
        key={index}>{suggestion}</li>
    ))}
   </div>

<DataContext.Provider value ={{data,setData}}>
  <ResultChart/>
</DataContext.Provider>
    </> 
)}
</>

  )
}
