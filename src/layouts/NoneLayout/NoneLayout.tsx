interface Props {
  children: JSX.Element
}

function NoneLayout({ children }: Props) {
  return <div className='layout-wrapper'>{children}</div>
}

export default NoneLayout
