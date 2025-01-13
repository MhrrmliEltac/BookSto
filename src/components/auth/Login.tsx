import { useCallback, useEffect, useRef, useState } from "react";
import { FormGroup, FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router";
import { signIn } from "../../../utils/firebase";
import { isLog, login } from "../redux/slice/auth";
import { useAppDispatch } from "../../hook/hooks";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { BiShow } from "react-icons/bi";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [check, setCheck] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    let user = await signIn(email, password);
    if (user) {
      setTimeout(() => {
        dispatch(login(user));
        toast.success("Login Successfully");
        navigate("/");
      }, 3000);
    }
    if (check) dispatch(isLog(check));

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
  const handleCheckBox = useCallback(() => {
    setCheck(!check);
  }, [check]);

  const showPasswordValue = () => {
    if (ref.current) {
      ref.current.type === "password"
        ? (ref.current.type = "text")
        : (ref.current.type = "password");
    }
  };

  // useEffect(() => {
  //   const addDataBook = async () => {
  //     await addBook();
  //   };
  //   addDataBook();
  // }, []);

  return (
    <Form
      noValidate
      validated={validated}
      className="vh-100 overflow-hidden d-flex flex-column justify-content-center w-100 align-items-center"
      onSubmit={handleSubmit}
      style={{ backgroundColor: "#0DD6B8" }}
    >
      <Row className="mb-3 flex-column gap-4 bg-white p-4 lg:w-[25%] w-[50%] rounded-3">
        <div className="flex justify-center">
          <img
            src="/logo (1).png"
            className="w-30 h-10"
            alt="Not a found logo"
          />
        </div>
        <p className="fs-2 text-center" style={{ color: "#0DD6B8" }}>
          Sign In
        </p>
        <Form.Group as={Col} controlId="validationCustom01">
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
          controlId="validationCustom02"
          className="relative"
        >
          <Form.Label>Password *</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter password"
            onChange={handlePasswordChange}
            autoComplete="on"
            ref={ref}
          />
          <BiShow
            onClick={showPasswordValue}
            className="absolute right-6 top-11 cursor-pointer"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Password is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group
          as={Col}
          controlId="validationCustom03"
          className="d-flex justify-content-between"
        >
          <FormGroup className="d-flex align-items-center gap-1">
            <Form.Check>
              <Form.Check.Input
                type={"checkbox"}
                onChange={handleCheckBox}
                checked={check}
              />
            </Form.Check>
            <FormLabel className="mb-0">Remember Me</FormLabel>
          </FormGroup>
          <Link
            to="/auth/recover-password"
            style={{
              color: "#0DD6B8",
              textDecoration: "none",
              fontWeight: "normal",
            }}
          >
            Forgot Password?
          </Link>
        </Form.Group>

        <Button
          style={{ background: "#0DD6B8", border: "none" }}
          type="submit"
          className="btn d-flex align-items-center justify-content-center"
          disabled={!email || !password}
        >
          {validated ? <BeatLoader size={10} color="white" /> : "Sign In +"}
        </Button>
        <FormGroup className="text-center text-xs d-flex gap-2 justify-content-center">
          Don't Have An Account Yet?
          <Link
            className="text-red-500 font-bold"
            to="/auth/register"
            style={{
              textDecoration: "none",
            }}
          >
            Sign Up.
          </Link>
        </FormGroup>
      </Row>
    </Form>
  );
};

export default Login;
