import { Alert, Button, Form, Row, col, Stack } from "react-bootstrap";
import { userContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    // invoke usecontext
    const [registerInfo, updateRegisterInfo, registerUser, registerError, setIsRegisterloading] = userContext(AuthContext)
    return(<>
    <Form onSubmit={registerUser}>
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
                    { setIsRegisterloading ?"Loading your account": "Register" }
                </Button>
                {
                    registerError?.error && <Alert variant="danger">
                        <p>registerError?.message</p>
                    </Alert>
                }
            </Stack>
            </col>
        </Row>
    </Form>
    </>
    );
};

export default Register;