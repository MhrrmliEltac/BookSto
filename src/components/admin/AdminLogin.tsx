import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { checkUserRole, signIn } from "../../../utils/firebase";
import { useState } from "react";
import { useNavigate } from "react-router";

interface Values {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const [uid, setUid] = useState<string | undefined>("");
  const navigate = useNavigate();

  return (
    <div className="flex gap-5 flex-col items-center bg-white rounded-lg w-96 p-4">
      <div className="pt-10">
        <h1 className="bg-green-800 playwrite-in text-white p-3 text-md rounded-lg">
          Admin<span>Panel</span>
        </h1>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.email && !values.password) {
            errors.email = "Required";
            errors.password = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          } else if (values.password.length < 6) {
            errors.password = "Password length must be greater than 6";
          }
          return errors;
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(async () => {
            const user = await signIn(values.email, values.password);
            setUid(user?.user.uid);
            const isAdmin = await checkUserRole(uid);
            if (isAdmin) {
              localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
              navigate("/admin/control/admin-panel");
            } else {
              navigate("/");
            }
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-3 w-full">
            <Field
              type="email"
              name="email"
              className="h-10 border-b-2 placeholder:text-black border-gray-400 shadow-inner px-2 text-xs w-full outline-none"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500 font-medium"
            />
            <Field
              type="password"
              name="password"
              className="h-10 border-b-2 placeholder:text-black border-gray-400 text-xs shadow-inner px-2 outline-none"
              placeholder="Password"
              autoComplete="true"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-500 font-medium"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 p-1 rounded-lg text-white text-sm"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminLogin;
