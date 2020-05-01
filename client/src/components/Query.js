import React from 'react'

export const Query = ({children, query, ...rest}) => {
  const { loading, error, data } = useQuery(query);
  return (
  
   {children}
  )
}
