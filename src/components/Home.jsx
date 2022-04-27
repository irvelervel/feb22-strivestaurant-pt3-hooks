import { useState } from 'react'
import { Carousel, Container, Row, Col, ListGroup } from 'react-bootstrap'
// we want to generate dynamic carousel slides from an array of dishes
// a super common thing!

// let's import the array of pastas and give it a name
import dishes from '../data/menu.json'
import ReservationForm from './ReservationForm'
import ReservationList from './ReservationList'

// our last task will be to show the reviews for one pasta at a time
// I want to be able to click on one pasta dish and set it as the "selected" one
// below the carousel we're going to show the reviews of the selected pasta

// for remembering the selected pasta, we need a state object
// for having a state object, we need a Class Component

const Home = () => {
  // Component is the main Class Component we're taking properties from
  // that's declared in the React Library
  // state = {
  //   selectedPasta: null,
  //   // the initial value of selectedPasta will be the assigned one
  //   // every time the page reload, so every time the component gets mounted
  // }

  const [selectedPasta, setSelectedPasta] = useState(null)

  return (
    <Container className="my-3" fluid>
      <ReservationList />
      <ReservationForm />
      <Row className="justify-content-center">
        <Col md={6}>
          {/* this is how you can hide the reviews every time the slide changes */}
          {/* <Carousel onSlide={() => this.setState({ selectedPasta: null })}> */}
          <Carousel>
            {dishes.map((pasta) => (
              // we have to put a unique key prop for performance reasons
              <Carousel.Item key={pasta.id}>
                <img
                  className="d-block w-100"
                  src={pasta.image}
                  alt="Third slide"
                  onClick={() =>
                    // this.setState({
                    //   selectedPasta: pasta,
                    // })
                    setSelectedPasta(pasta)
                  }
                />
                <Carousel.Caption>
                  <h3>{pasta.name}</h3>
                  <p>{pasta.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} className="text-center">
          <ListGroup>
            {/* our logic should work, but initially the value of this.state.selectedPasta
                is null! so we're trying to map a property of null --> ERROR  */}
            {
              // let's tell the JSX to map the comments just if selectedPasta is a truthy value.
              // if selectedPasta is null, let's output a static message instead without even trying
              // to read .comments (because that will crash everything...!)

              // let's use a technique called CONDITIONAL RENDERING in jsx
              selectedPasta ? (
                // this means I already clicked on a pasta...
                // let's map the reviews for it!
                selectedPasta.comments.map((review) => (
                  <ListGroup.Item key={review.id}>
                    {review.comment}
                  </ListGroup.Item>
                ))
              ) : (
                // this instead means I just refreshed the page, because
                // this.state.selectedPasta is still null
                <ListGroup.Item>Click on a pasta!</ListGroup.Item>
              )
            }
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
