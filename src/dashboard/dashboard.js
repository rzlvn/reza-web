import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import 'font-awesome/css/font-awesome.min.css'; 
import Button from "react-bootstrap/Button";
import "../login/login.css";
import { Form } from "formik";
import axios from "axios";
import Table from 'react-bootstrap/Table'

export default class Dashboard extends Component {
  constructor(){
    super()
    this.state = { 
      data: [],
      user: '' 
    };
  }  

  logout = () => {
    localStorage.removeItem("token");
    localStorage.clear(); 
    window.location.href = '/'
  }

  async componentDidMount(){
    const config = {
      headers:{
        Authorization: 'Bearer ' + localStorage.getItem('token') 
      }
    }
    await axios.get(process.env.REACT_APP_API_LINK_CUSTOM + 'user', config).then(
      res => {
        this.setState({
          user: res.data
        })
      },
      err => {
        console.log(err)
      }
    )

    const response = await fetch(`https://testing-dinar.herokuapp.com/api/AllUser`);
    const json = await response.json();
    this.setState({ data: json });
  } 

  render(){
    if(this.state.user){
      return (
        <div className="dashboard">
        <Container>
        <Row>
            <Col lg={12} xs={12}>
              <form>
                <Card>
                    <Card.Body style={{backgroundColor:"#e3e5e8"}}>
                        <h3>
                          Welcome Admin - <span className="user__name">{this.state.user.username}</span>
                        </h3>
                        <span>Berikut Data 10 Mahasiswa Pendaftar Terakhir :</span>
                        <Table striped bordered hover size="sm">
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>Username</th>
                              <th>Email</th>
                              <th>Created at</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.data.map((el,index) => (
                              <tr>
                                <td key={index}>{index + 1}</td>
                                <td>{el.username}</td>
                                <td>{el.email}</td>
                                <td>{el.created_at}</td>
                              </tr>
                            ))}                            
                          </tbody>
                        </Table>
                        <Button variant="dark" className="logout__button" onClick={this.logout}>Logout</Button>
                    </Card.Body>
                </Card>
              </form>
            </Col> 
        </Row>        
        </Container>    
        </div>
      )
    }
    return (
      <div className="dashboard">
      <Container>
      <Row>
          <Col lg={12} xs={12}>
            <form>
              <Card>
                  <Card.Body style={{backgroundColor:"#e3e5e8"}}>
                      <h1>
                        Welcome <span className="user__name"></span>
                        <Button variant="dark" className="logout__button">Logout</Button>
                      </h1>
                  </Card.Body>
              </Card>
            </form>
          </Col> 
      </Row>        
      </Container>    
      </div>
    );
  }  
}

// export default Dashboard