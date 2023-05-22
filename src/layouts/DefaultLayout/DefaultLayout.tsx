interface Props {
  children: JSX.Element
}

function DefaultLayout({ children }: Props) {
  return (
    <div className='layout-wrapper'>
      DefaultLayout
      {children}
    </div>
  )
}

export default DefaultLayout
