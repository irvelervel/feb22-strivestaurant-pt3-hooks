import './App.css'
// let's import the bootstrap .css file
import 'bootstrap/dist/css/bootstrap.min.css' // this is needed since react-bootstrap doesn't bring
// automatically the bootstrap css file
import MyNavbar from './components/MyNavbar'
import Home from './components/Home'

function App() {
  return (
    <div>
      {/* the props are useful for passing a dynamic value upon invocation of the component */}
      <MyNavbar payoff="The best pasta on the internet!" />
      <Home />
    </div>
  )
}

export default App
