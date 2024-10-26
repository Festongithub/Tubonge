import { Alert, Button, Form, Row, col, Stack } from "react-bootstrap";
import { userContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    // invoke usecontext

    const [registerInfo, setRegisterInfo] = userContext(AuthContext)
    return(<>
    <Form>
        <Row style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%"
        }}>
            <col xs={6}>
            <Stack gap={3}>
                <h2>Register</h2>
                <h2>user.name</h2>
                <Form.Control type="text" 
                placeholder="Name" 
                onChange= {(e) => 
                updateRegisterInfo({...registerInfo,name: e.target.value})
                }
                />
                
                <Form.Control type="email" placeholder="Email"
                onChange= {(e) => 
                    updateRegisterInfo({...registerInfo, email:e.target.value})
                    }/>
                
                <Form.Control type="password" 
                placeholder="Password"
                onChange= {(e) => 
                    updateRegisterInfo({...registerInfo, password: e.target.value})
                    }/>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <Alert variant="danger"><p>Error Occured</p></Alert>
            </Stack>
            </col>
        </Row>
    </Form>
    </>
    );
};

export default Register;