// let's grab the reservations back from the API!
// if you need a state object, you need a class for your component
// if you need to work with the LIFECYCLE METHODS of a component, you need a class
// we need to work with a lifecycle method in order to FETCH DATA from the internet in our component

// REACT FETCHING LOGIC STEPS
// 1) render() will fire, outputting into the DOM the static elements
// 2) componentDidMount(), if present, fires! will launch the fetching data function
// 3) the data is fetched, and once we have the array of reservations we set the state with them
// 4) because we just set the state, render() fires again (because render() fires every time the state is set or every time a prop changes)

import { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Spinner, Alert } from 'react-bootstrap'
import { parseISO, format } from 'date-fns'

// a fetch() is potentially an expensive operation: we want to perform it the least
// amount of times possible, and in the less intrusive way possible: after presenting the
// STATIC content of the component

// we want to perform the fetch() once, and AFTER we present the user the static parts of our component

const ReservationList = () => {
  // state = {
  //   reservations: [],
  //   // singleObject: null // -> this can maybe become a real object, so let's put an explicit falsy value to begin with
  //   isLoading: true,
  //   isError: false,
  // }

  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log("I'm like componentDidMount!")
    // this is the perfect place for fetching our remote data in a sneaky way :)
    // long story short: componentDidMount is a lifecycle method that happens just ONCE,
    // after the initial invocation of render()
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation'
      )
      if (response.ok) {
        // our request was successfull!
        console.log(response)
        // response object looked fine, let's take the body out of it! (the array of reservations)
        let data = await response.json() // .json() extracts the body out of the response. it's ASYNCHRONOUS
        console.log('BODY OF THE RESPONSE', data)
        // GOLDEN RULE:
        // every time you grab some data from the internet, you're going to put it in the STATE of the component
        // this.setState({
        //   reservations: data,
        //   isLoading: false,
        // })
        setReservations(data)
        setIsLoading(false)
        // every time you set the state, render() fires AGAIN.
      } else {
        // our request got a problem
        // alert('something went wrong fetching the reservations :(')
        // this.setState({
        //   isLoading: false,
        //   isError: true,
        // })
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      console.log('error!', error)
      // this.setState({
      //   isLoading: false,
      //   isError: true,
      // })
      setIsLoading(false)
      setIsError(true)
    }
  }

  // render() is already a lifecycle method!
  // render() in a class component is in charge of returning the JSX
  console.log("I'm render")
  return (
    <Row className="justify-content-center my-4">
      <Col md={6} className="text-center">
        <h2>Booked Tables</h2>
        {isLoading && ( // SHORT-CIRCUIT
          <Spinner animation="border" variant="info" /> // <-- this will always be true
        )}
        {isError && (
          <Alert variant="danger">😭 An error happened, we're sorry!</Alert>
        )}
        <ListGroup>
          {/* reservations initially is [] */}
          {/* after setting the state, reservations is NOT [] anymore! */}

          {/* parseISO takes a string and returns you a Date (a moment in time) */}
          {reservations.map((r) => (
            <ListGroup.Item key={r._id}>
              {r.name} - {format(parseISO(r.dateTime), 'MMMM do yyyy | HH:mm')}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </Row>
  )
}

export default ReservationList
