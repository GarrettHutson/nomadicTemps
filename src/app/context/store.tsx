
'use client';

import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface Job {
    id: string;
    title: string;
    description?: string;
    email: string;
    profession?: string;
    budget?: string;
    location?: string;
    start?: string;
    end?: string;
    img?: string;

  }
  

interface ContextProps {
    allJobs: Job[] | null,
    setAllJobs: Dispatch<SetStateAction<Job[] | null>>,

}

const GlobalContext = createContext<ContextProps>({

    allJobs: null,
    setAllJobs: (): void => {} 
})

export const GlobalContextProvider = ({ children }) => {
    const [allJobs, setAllJobs] = useState<Job[] | null>(null);
 
    
    return (
        <GlobalContext.Provider value={{ allJobs, setAllJobs}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);