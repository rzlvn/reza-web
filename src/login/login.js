import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from 'react-bootstrap/Alert'
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import 'font-awesome/css/font-awesome.min.css'; 
import "./login.css";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Link,  useHistory } from "react-router-dom";
import axios from 'axios';

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
//   terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

export default function Login() {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [isError, setError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [iconShow, iconClick] = useState(false);
    const togglePasswordVisiblity = () => {
    iconClick(iconShow ? false : true)
    setPasswordShown(passwordShown ? false : true);
    };
  
  const onSubmit = async (data) => {
    await axios.post(process.env.REACT_APP_API_LINK_CUSTOM + 'login',data).then(
        res => {
            localStorage.setItem('token', res.data.token)
            history.push('/dashboard')
        }
    ).catch(
        err => {
            setShow(true)
            setError(err.response.data.message)
        }
    )
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
        email: '',
        password: '',
        terms: false,
        }}
    >
        {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
    <div className="Login">
    <Container>
    <Row>
        <Col lg={12} xs={12}>
        <Form noValidate onSubmit={handleSubmit}>
            <Card>
                <Card.Body style={{backgroundColor:"#e3e5e8"}}>
                    {error}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label><i className="fa fa-solid fa-user"/> Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="username/email"
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
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check 
                            required
                            name="terms"
                            label="Remember me"
                            onChange={handleChange}
                            isInvalid={!!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                            id="validationFormik0"
                        />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button type="submit" className="">LOGIN ADMIN</Button>
                        <Link
                            style={{color:"white"}}
                            className="btn btn-info" 
                            to="/register"
                        >Register Mahasiswa Baru</Link>
                        <Link to="/forget"><i className="fa fa-solid fa-eye"/>Lupa Password?</Link>
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