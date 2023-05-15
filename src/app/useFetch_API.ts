
import { useEffect, useState } from "react";

interface Data {
    playerPrice: number;
    name: string;
    description?: string;
}
  

export default function useFetchAPI(url: string) {
  const [Data, setData] = useState(null)
  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then((data: Data[]) => console.log(data))
    .catch((error: Error) => console.error(error))
  }, [])

  return ( Data )
}  
  