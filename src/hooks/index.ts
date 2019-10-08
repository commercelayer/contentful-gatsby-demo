import { useState } from 'react'

const useShoppingBag = (): any => {
  const [status, setStatus] = useState(false)
  const handleSetStatus = () => setStatus(!status)
  return [status, handleSetStatus]
}

export default useShoppingBag
