import React,{useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import 'font-awesome/css/font-awesome.min.css'; 
import "./register.css"
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required('Password is required')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  email: yup.string().email('Invalid email').required('Required'),
  password_confirm: yup.string().required("Password confirm is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function Register() {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [isError, setError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
    const [iconShow, iconClick] = useState(false);
    const [iconConfirmShow, iconConfirmClick] = useState(false);
    const togglePasswordVisiblity = () => {
        iconClick(iconShow ? false : true)
        setPasswordShown(passwordShown ? false : true);
    };
    
    const togglePasswordConfirmVisiblity = () => {
        iconConfirmClick(iconConfirmShow ? false : true)
        setPasswordConfirmShown(passwordConfirmShown ? false : true);
    };

    const onSubmit = async data => {
        console.log(data)
        await axios.post(process.env.REACT_APP_API_LINK_CUSTOM + 'register',data).then(
            res => {
                console.log(res)
                history.push('/')
            }
        ).catch(
            err => {
                setShow(true)
                setError(err.response.data.errors['email'][0])
            }
        )
    }

    const back = () => {
        history.push('/')
    }

  let error = '';

  if(show){
      error = (
        <div>
            <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                {isError}
            </Alert>
        </div>
      )
      console.log(setError)
  }
  return (
    <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
        username: '',
        email: '',
        password: '',
        password_confirm:'',
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
        {console.log(isSubmitting)}
        <Col lg={12} xs={12}>
        <Form noValidate onSubmit={handleSubmit}>
            <Card>
                <Card.Body style={{backgroundColor:"#e3e5e8"}}>
                    <h4 style={{textAlign:"center"}}>Register</h4>
                    {error}
                    <Form.Group className="mb-3" controlId="formBasicUsernames">
                    <Form.Label><i className="fa fa-solid fa-user"/> Full Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label><i className="fa fa-solid fa-envelope"/> Email:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Email"
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

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><i className="fa fa-solid fa-gear"/> Password:</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type={passwordShown ? "text" : "password"}
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <InputGroup.Text>
                            <i onClick={togglePasswordVisiblity} className={iconShow ? 'fa fa-solid fa-eye' : 'fa fa-solid fa-eye-slash'}></i>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                        <Form.Label><i className="fa fa-solid fa-gear"/> Confirm Password:</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type={passwordConfirmShown ? "text" : "password"}
                                placeholder="Confirm Password"
                                aria-describedby="inputGroupPrepend"
                                name="password_confirm"
                                value={values.password_confirm}
                                onChange={handleChange}
                                isInvalid={!!errors.password_confirm}
                            />
                            <InputGroup.Text>
                            <i onClick={togglePasswordConfirmVisiblity} className={iconConfirmShow ? 'fa fa-solid fa-eye' : 'fa fa-solid fa-eye-slash'}></i>
                            </InputGroup.Text>
                            <Form.Control.Feedback type="invalid">
                                {errors.password_confirm}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <div className="d-grid gap-2">
                        <ButtonGroup aria-label="Basic example">
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
                        <Button type="submit" className="">Register</Button>
                        )} 
                        <Button type="submit" variant="info" style={{color:"white",marginLeft:5}} onClick={back}>Back to Login</Button>
                        </ButtonGroup>
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