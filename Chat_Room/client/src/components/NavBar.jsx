import { Container, Nav, Navbar, Stack } from "react-bootstrap"
import { Link } from "react-router-dom";

const NavBar = () => {
    const {user} = useContext(AuthContext);
    return <NavBar bg="dark" className="mb-4" style={{ height:"3.75rem"}}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">
                ChatApp
                </Link>
            </h2>
            <span className="text-warning">Logged in as {user?.name}</span>
            <Nav>
                <Stack direction="horizontal" gap={3}>
                <Link to="/Login" className="link-light text-decoration-none">
                 Login
                </Link>
                <Link to="/register" className="link-light text-decoration-none">
                Register
                </Link>
                </Stack>
            </Nav>
        </Container>
    </NavBar>
     
}