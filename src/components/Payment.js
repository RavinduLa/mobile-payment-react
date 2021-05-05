import React from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row} from "react-bootstrap";

class Payment extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState;


        this.submitPayment = this.submitPayment.bind(this);
        this.resetPaymentDetails = this.resetPaymentDetails.bind(this);
        this.changeMobileNumber = this.changeMobileNumber.bind(this);
        this.changePin = this.changePin.bind(this);

    }

    initialState = {
        phoneNumber:'',
        pin:'',
        amount:2000.00,
        merchantId:121,

        paymentStatus:'',
        paymentMessage:'',
        validPinBool:'',
        paymentSuccessfulBool:'',

        paymentGateWayStatus:'up'
    }

    componentDidMount() {
    }

    resetPaymentDetails = ()=> {
        this.setState(() => this.initialState)
    }

    submitPayment = (event) => {
        event.preventDefault();

        const URL_MOBILEPAYENT_GATEWAY = "http://localhost:8080/tls-pay/api/makePayment";

        const PaymentRequest ={
            phoneNumber:this.state.phoneNumber,
            pin:this.state.pin,
            amount:this.state.amount,
            merchantId:this.state.merchantId
        }

        axios.post(URL_MOBILEPAYENT_GATEWAY,PaymentRequest)
            .then(response => response.data)
            .then((data) => {
                this.setState({paymentStatus:data.status})
                this.setState({paymentMessage:data.message})
            }).catch(error => {

            this.setState({paymentGateWayStatus:'down'})
            console.log( error);

        })
    }

    changeMobileNumber=(event)=>{
        event.preventDefault();

        this.setState({phoneNumber:event.target.value})
    }
    changePin = (event) => {
        event.preventDefault();
        this.setState({pin: event.target.value})
    }

    render() {
        const{phoneNumber,pin,amount} = this.state
        return (
            <div>
                <h2>Mobile Payment</h2>

                <Card className={'border border-dark bg-light'}>

                    <Card.Header>Payment Amount: Rs. {this.state.amount}</Card.Header>

                    <Form id={'mobilePaymentForm'} onSubmit={this.submitPayment.bind(this)}
                    onReset={this.resetPaymentDetails.bind(this)}>

                        <Card.Body>
                            <Form.Row>
                                <Form.Group controlId={'formMobileNumber'} as={Col}>
                                    <Form.Label>Mobile Number</Form.Label>

                                    <Form.Control
                                    required
                                    type={'text'}
                                    pattern={'[0-9]{10}'}
                                    name={'phoneNumber'}
                                    placeholder={'Enter your phone number'}
                                    value={phoneNumber}
                                    maxlength={10}
                                    onChange={this.changeMobileNumber.bind(this)}>

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>PIN</Form.Label>

                                    <Form.Control
                                    required
                                    type={'text'}
                                    pattern={'[0-9]{4}'}
                                    name={'pin'}
                                    placeholder={'Enter your PIN'}
                                    value={pin}
                                    maxlength={4}
                                    onChange={this.changePin.bind(this)}>

                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>

                        <Card.Footer>
                            <Row>
                                <Col>
                                    <Button className={'btn btn-primary'} type={'submit'}>Pay</Button>
                                </Col>

                                <Col>
                                    <Button className={'btn btn-secondary'} type={'reset'}>Reset</Button>
                                </Col>
                            </Row>
                        </Card.Footer>

                    </Form>

                </Card>

                {
                    this.state.paymentStatus != '' ?
                        <div>

                            {
                                this.state.paymentStatus === 'success'?
                                    <div>
                                        <h2>Payment Sucesful</h2>
                                    </div>:

                                    <div>
                                        <h2>Error when procssing payment</h2>
                                        <h3>{this.state.paymentMessage}</h3>
                                    </div>
                            }

                        </div>:

                        <div>
                            {
                                this.state.paymentGateWayStatus == 'down'?
                                    <div>
                                        <h2>Payment Gateway did not respond.</h2>
                                    </div>:
                                    <div></div>
                            }

                        </div>
                }

            </div>
        );
    }

}

export default Payment;