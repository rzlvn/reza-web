import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import 'font-awesome/css/font-awesome.min.css'; 
import "./login.css"
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

const schema = yup.object().shape({
  email: yup.string().email('invalid email').required(),
});

export default function Forget() {
    const history = useHistory()
    const [showErr, setShowErr] = useState(false);
    const [showSuc, setShowSuc] = useState(false);
    const [isError, setError] = useState('');
    const [isSuccess, setSuccess] = useState('');
    const onSubmit = async data => {
        await axios.post(process.env.REACT_APP_API_LINK_CUSTOM + 'forgot',data).then(
            res => {
                setShowSuc(true)
                setShowErr(false)
                console.log(res.data.message)
                setSuccess(res.data.message)
            }
        ).catch(
            err => {
                console.log(err)
                setShowErr(true)
                setError(err.response.data.message)
            }
        )
    }

    const back = () => {
        history.push('/')
    }

    let error,sukses = '';

    if(showErr){
        error = (
            <Alert variant="danger" onClose={() => setShowErr(false)} dismissible>
                {isError}
            </Alert>
        )
    }

    if(showSuc){
        sukses = (
            <Alert variant="success" onClose={() => setShowSuc(false)} dismissible>
                {isSuccess}
            </Alert>
        )
    }
  return (
    <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
        email: '',
        redirectUrl: 'PasswordReset',
        }}
    >
        {({
        isSubmitting,
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
    <div className="Register">
    <Container>
    <Row>
        <Col lg={12} xs={12}>
        <Form noValidate onSubmit={handleSubmit}>
            <Card>
                <Card.Body style={{backgroundColor:"#e3e5e8"}}>
                    <h4 style={{textAlign:"center"}}>Forgot Password</h4>
                    {error}{sukses}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><i className="fa fa-solid fa-envelope"/> Email:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Email yang anda gunakan"
                        aria-describedby="inputGroupPrepend"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        {isSubmitting && (
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Submitting...
                        </Button>
                        )}
                        {!isSubmitting && (
                        <Button type="submit" className="">Submit</Button>
                        )} 
                        <Button type="submit" variant="info" style={{color:"white"}} onClick={back}>Back to Login</Button>
                    </div>
                </Card.Body>
            </Card>
        </Form>
        </Col> 
    </Row>        
    </Container>    
    </div>
    )} 
    </Formik>
  );
}