import { useState, useEffect } from 'react'

const useShoppingBag = (): any => {
  const [status, setStatus] = useState(false)
  const handleSetStatus = () => setStatus(!status)
  return [status, handleSetStatus]
}

export const usePriceLoading = (event: string) => {
  const [ loading, setLoading ] = useState(true)
	useEffect(() => {
		const listener = () => {
			setLoading(false)
		}
		document.addEventListener(event, listener)
		return () => {
			document.removeEventListener(event, listener)
		}
  }, [])
  return loading
}

export default useShoppingBag
