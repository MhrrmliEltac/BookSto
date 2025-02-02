import { useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { recoverPass } from "../../../utils/firebase";
import logo from "../../assets/images/logo.png";

const RecoverPass = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    await recoverPass(email);

    setValidated(true);
  };

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [email]
  );

  return (
    <Form
      noValidate
      validated={validated}
      className="vh-100 overflow-hidden d-flex flex-column justify-content-center w-100 align-items-center"
      onSubmit={handleSubmit}
      style={{ backgroundColor: "#0DD6B8" }}
    >
      <Row className="mb-3 flex-column gap-4 bg-white p-4 lg:w-[40%] w-[80%] rounded-3">
        <div className="flex justify-center">
          <img src={logo} className="w-25 h-15" alt="Not a found logo" />
        </div>
        <div>
          <p className="fs-2 mb-0" style={{ color: "#0DD6B8" }}>
            Reset Password
          </p>
          <p className="text-sm text-[#9DA6B0]">
            Enter your email address and we'll send you an email with
            instructions to reset your password.
          </p>
        </div>
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Control
            required
            type="email"
            className="py-2 px-2"
            placeholder="Email *"
            onChange={handleEmailChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          type="submit"
          style={{ background: "#0DD6B8", border: "none" }}
          disabled={!email}
        >
          Reset Password +
        </Button>
      </Row>
    </Form>
  );
};

export default RecoverPass;
