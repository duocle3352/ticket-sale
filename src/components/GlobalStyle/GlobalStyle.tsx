import './GlobalStyle.scss'
import React from 'react'

interface Props {
  children: JSX.Element
}

function GlobalStyle({ children }: Props) {
  return React.Children.only(children)
}

export default GlobalStyle
