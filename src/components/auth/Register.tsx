import { useCallback, useRef, useState } from "react";
import { FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router";
import { signUp } from "../../../utils/firebase";
import { BiShow } from "react-icons/bi";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    let user = await signUp(email, name, password);
    setTimeout(() => {
      if (user) {
        navigate("/auth/login");
      }
    }, 2000);
    if (user) setValidated(true);
  };

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email]
  );
  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    },
    [password]
  );
  const handleNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    },
    [name]
  );
  const showPasswordValue = () => {
    if (ref.current) {
      ref.current.type === "password"
        ? (ref.current.type = "text")
        : (ref.current.type = "password");
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      className="vh-100 overflow-hidden d-flex flex-column justify-content-center w-100 align-items-center"
      onSubmit={handleSubmit}
      style={{ backgroundColor: "#0DD6B8" }}
    >
      <Row className="mb-3 flex-column gap-4 bg-white p-4 w-25 rounded-3">
        <div className="flex justify-center">
          <img
            src="/logo (1).png"
            className="w-30 h-10"
            alt="Not a found logo"
          />
        </div>
        <p className="fs-2 text-center" style={{ color: "#0DD6B8" }}>
          Sign Up
        </p>

        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>Your Full Name *</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter fullname"
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Email Address *</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          controlId="validationCustom03"
          className="relative"
        >
          <Form.Label>Password *</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
            autoComplete="off"
            ref={ref}
          ></Form.Control>
          <BiShow
            onClick={showPasswordValue}
            className="absolute right-6 top-11 cursor-pointer"
          />
          <p
            className={`mt-2 ${
              password.length >= 6 ? "text-green-700" : "text-red-700"
            }`}
            style={{ fontSize: "10px" }}
          >
            * Password must be 6 characters long.
          </p>

          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          className="btn d-flex align-items-center justify-content-center"
          style={{ background: "#0DD6B8", border: "none" }}
          disabled={
            password.length < 6 || name.length === 0 || email.length === 0
          }
        >
          {validated ? <BeatLoader size={10} color="white" /> : "Sign Up +"}
        </Button>
        <FormGroup className="text-center text-xs d-flex gap-2 justify-content-center">
          Have An Account?
          <Link
            className="text-red-500 font-bold"
            to="/auth/login"
            style={{
              textDecoration: "none",
            }}
          >
            Sign In.
          </Link>
        </FormGroup>
      </Row>
    </Form>
  );
};

export default Register;
