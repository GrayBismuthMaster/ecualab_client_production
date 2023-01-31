import { useEffect, useState } from 'react'

export const useData = (array) => {
    const [arrayData, setArray] = useState([]);
    useEffect(() => {
        setArray(array)
      return () => {
        
      };
    }, [])
  return {
    arrayData
  }
}
