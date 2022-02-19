import React, { useState } from "react";
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
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams, useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'

const schema = yup.object().shape({
    password: yup.string().required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&_])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    password_confirm: yup.string().required("Password confirm is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default function Reset() {
let { id } = useParams();
const history = useHistory();

const onSubmit = data => {
    console.log(id)
    const datas = {
        token: id,
        password: data.password,
        password_confirm: data.password_confirm
    }

    axios.post(process.env.REACT_APP_API_LINK_CUSTOM + 'reset',datas).then(
        res => {
            console.log(res)
            history.push('/')
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

const [passwordShown, setPasswordShown] = useState(false);
const [iconShow, iconClick] = useState(false);
const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
const [iconConfirmShow, iconConfirmClick] = useState(false);
const togglePasswordVisiblity = () => {
    iconClick(iconShow ? false : true)
    setPasswordShown(passwordShown ? false : true);
};
const togglePasswordConfirmVisiblity = () => {
    iconConfirmClick(iconConfirmShow ? false : true)
    setPasswordConfirmShown(passwordConfirmShown ? false : true);
};

  return (
    <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        initialValues={{
        password: '',
        password_confirm: '',
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
                    <h4 style={{textAlign:"center"}}>Reset Password</h4>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label><i className="fa fa-solid fa-gear"/> Password :</Form.Label>
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
                        <Form.Label><i className="fa fa-solid fa-gear"/> Confirm Password :</Form.Label>
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