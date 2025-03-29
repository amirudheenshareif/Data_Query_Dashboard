import { keywordsMapping } from "../data/mockData";
import Dexie from "dexie";


export function findMockData(userInput){
    //you have to find the type of function to generate data first

    const userInputArray = userInput.toLowerCase().split(" ");
    console.log(userInputArray);
    
    //finds and returns that particular keyword if it is found in keywordsMapping 
    const matchedKeyword = userInputArray.find(keyword => keywordsMapping[keyword]);
    console.log(matchedKeyword);

    if(matchedKeyword){
        
        return keywordsMapping[matchedKeyword]();
    }
    else{
        console.log("No keyword found");
        return null;
    }

}

export const db = new Dexie("searchDB");
db.version(1).stores({
  history: "++id, term" 
});

export async function addSearchInput(searchInput){
    if(!searchInput){
        return;
    }
    await db.history.add({term: searchInput});

}

