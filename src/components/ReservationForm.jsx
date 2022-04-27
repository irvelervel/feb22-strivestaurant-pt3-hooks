// this will be a component for booking a table in Strivestaurant
// it will generate a form that the user can submit to an API

import { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

// do I need a state object in this component? it's a form, so YES I do

// reservation properties:
// name <-- string
// phone <-- string | number
// numberOfPeople <-- string | number
// smoking <-- boolean
// dateTime <-- string
// specialRequests <-- string

const ReservationForm = () => {
  // state = {
  //   reservation: {
  //     name: '',
  //     phone: '',
  //     numberOfPeople: 1,
  //     smoking: false,
  //     dateTime: '',
  //     specialRequests: '',
  //   },
  // }

  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    numberOfPeople: 1,
    smoking: false,
    dateTime: '',
    specialRequests: '',
  })

  const handleChange = (propertyName, targetValue) => {
    // propertyName, the first argument, can be 'name', 'phone', etc.
    // this.setState({
    //   reservation: {
    //     ...this.state.reservation,
    //     [propertyName]: targetValue,
    //     // when declaring object keys, if you want to assign its name from a variable, an argument etc.
    //     // you need to EVALUATE that variable, that argument. That needs square brackets
    //   },
    // })

    setReservation({
      ...reservation,
      [propertyName]: targetValue,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // now we can do our stuff!
    // https://striveschool-api.herokuapp.com/api/reservation
    // this is a unauthorized endpoint

    // how to deal with async ops (Promises)?
    // 1) chained then(s) method
    // fetch().then(() => console.log('47'))

    // 2) async/await pattern
    // await fetch()
    // console.log('47')

    // 1)
    // fetch('https://striveschool-api.herokuapp.com/api/reservation', {
    //   method: 'POST', // POST is for creating a new resource, a new reservation
    //   body: JSON.stringify(this.state.reservation),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((response) => {
    //     console.log(response)
    // if (response.ok) {
    //   // this means SUCCESS! 🥳
    //   alert('SUCCESS! 🥳')
    // this.setState({
    //     reservation: {
    //       name: '',
    //       phone: '',
    //       numberOfPeople: 1,
    //       smoking: false,
    //       dateTime: '',
    //       specialRequests: '',
    //     },
    //   })
    // } else {
    //   // this means you were able to contact the server, but something got wrong 😔
    //   alert('ERROR HAPPENED 😔')
    // }
    //   })
    //   .catch((error) => {
    //     // you'll fall here if you are not even able to contact the endpoind
    //     // maybe you don't have internet connection?
    //     console.log(error)
    //   })

    // var let const

    // 2)
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation',
        {
          method: 'POST', // POST is for creating a new resource, a new reservation
          body: JSON.stringify(reservation),
          headers: {
            'Content-Type': 'application/json',
          }, // this header must be in place if you're sending an object to the API
        }
      )
      console.log(response)
      // .ok will be a boolean value in your Response object
      if (response.ok) {
        // this means SUCCESS! 🥳
        alert('SUCCESS! 🥳')
        // this.setState({
        //   reservation: {
        //     name: '',
        //     phone: '',
        //     numberOfPeople: 1,
        //     smoking: false,
        //     dateTime: '',
        //     specialRequests: '',
        //   },
        // })
        setReservation({
          name: '',
          phone: '',
          numberOfPeople: 1,
          smoking: false,
          dateTime: '',
          specialRequests: '',
        })
      } else {
        // this means you were able to contact the server, but something got wrong 😔
        alert('ERROR HAPPENED 😔, pls try again')
        // let's not reset the form here, we want to let the user to try again
      }
    } catch (error) {
      // you'll fall here if you are not even able to contact the endpoind
      // maybe you don't have internet connection?
      console.log(error)
    }
  }

  return (
    <Row className="justify-content-center my-3">
      <Col md={6} className="text-center">
        <h2>Book your table NOW!</h2>
        <Form className="mt-3" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insert your name"
              value={reservation.name}
              onChange={
                // from here, I'll need to set the state
                // I need from here to change the name property into the reservation obj
                // into the state
                (e) =>
                  // this.setState({
                  //   reservation: {
                  //     ...this.state.reservation,
                  //     name: e.target.value, // <-- this is the character
                  //     // I'm losing the other fieds in this way!
                  //     // I should bring in also ALL the other values
                  //     // phone: this.state.reservation.phone,
                  //     // numberOfPeople: this.state.reservation.numberOfPeople,
                  //     // smoking: this.state.reservation.smoking,
                  //     // dateTime: this.state.reservation.dateTime,
                  //     // specialRequests: this.state.reservation.specialRequests,
                  //   },
                  // })
                  handleChange('name', e.target.value)
              }
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Your phone</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Insert your phone"
              value={reservation.phone}
              onChange={(e) =>
                //   this.setState({
                //     reservation: {
                //       ...this.state.reservation,
                //       phone: e.target.value,
                //     },
                //   })
                handleChange('phone', e.target.value)
              }
              required
              // FUNNY EXPERIMENT
              // disabled={this.state.reservation.name === 'Stefano'}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>How many are you?</Form.Label>
            <Form.Control
              as="select"
              value={reservation.numberOfPeople}
              onChange={(e) =>
                //   this.setState({
                //     reservation: {
                //       ...this.state.reservation,
                //       numberOfPeople: e.target.value,
                //     },
                //   })
                handleChange('numberOfPeople', e.target.value)
              }
              required
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            {/* CHECKBOX VERSION */}
            {/* in checkboxes 'value' can be 'true' or 'false' (not what you need) */}
            {/* let's use 'checked' instead! */}
            {/* <Form.Check
                type="checkbox"
                label="Do you smoke?"
                checked={this.state.reservation.smoking}
                onChange={(e) =>
                  this.setState({
                    reservation: {
                      ...this.state.reservation,
                      smoking: e.target.checked,
                    },
                  })
                }
              /> */}

            {/* RADIO VERSION */}
            <Form.Check
              type="radio"
              label="Smoking"
              name="smoking-radio"
              checked={reservation.smoking}
              onChange={(e) => handleChange('smoking', e.target.checked)}
            />
            <Form.Check
              type="radio"
              label="Not Smoking"
              name="smoking-radio"
              checked={!reservation.smoking}
              onChange={(e) => handleChange('smoking', !e.target.checked)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Time & Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={reservation.dateTime}
              onChange={(e) =>
                // this.setState({
                //   reservation: {
                //     ...this.state.reservation,
                //     dateTime: e.target.value,
                //   },
                // })
                setReservation({
                  ...reservation,
                  dateTime: e.target.value,
                })
              }
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Any special request?</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={reservation.specialRequests}
              onChange={(e) =>
                // this.setState({
                //   reservation: {
                //     ...this.state.reservation,
                //     specialRequests: e.target.value,
                //   },
                // })
                setReservation({
                  ...reservation,
                  specialRequests: e.target.value,
                })
              }
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default ReservationForm
