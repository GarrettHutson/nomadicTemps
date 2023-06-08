
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
    userId: string | null,
    setUserId: Dispatch<SetStateAction<string | null>>,
  }

  const GlobalContext = createContext<ContextProps>({
    allJobs: null,
    setAllJobs: (): void => {},
    userId: null,
    setUserId: (): void => {},
  })

  export const GlobalContextProvider = ({ children }) => {
    const [allJobs, setAllJobs] = useState<Job[] | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
  
    return (
      <GlobalContext.Provider value={{ allJobs, setAllJobs, userId, setUserId }}>
        {children}
      </GlobalContext.Provider>
    )
  };

export const useGlobalContext = () => useContext(GlobalContext);