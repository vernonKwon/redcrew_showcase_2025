import React, { FC } from 'react'

interface EmptyLayoutProps {
  children: React.ReactNode
}

const EmptyLayout: FC<EmptyLayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default EmptyLayout
