import useRouteElement from './hooks/useRouteElements'

function App() {
  const routeElement = useRouteElement()

  return <div className='App'>{routeElement}</div>
}

export default App
