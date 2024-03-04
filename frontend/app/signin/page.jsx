/* Sign in page */
"use client";
import { signIn } from "@/lib/authHelper";
import Button from "../components/Button";
import { useState, useEffect } from "react";
import Loader from "../components/core/Loader";
import { useRouter } from "next/navigation";
import Form from "react-bootstrap/Form";
import { useUser } from "@/app/contexts/userContext";

export default function SignInPage() {
  const [validated, setValidated] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    error: "",
    isSuccess: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateUser } = useUser();

  useEffect(() => {
    if (userData.isSuccess) {
      setLoading(false);
      router.push("/elections");
    }
  }, [userData.isSuccess, router]);

  const handleChange = (name) => (event) => {
    setUserData({
      ...userData,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    try {
      setLoading(true);
      await signIn(userData).then((data) => {
        if (data.user) {
          setLoading(false);
          setUserData({
            ...userData,
            isSuccess: true,
          });
          updateUser(data.user);
        }
      });
    } catch (e) {
      setUserData({
        ...userData,
        error: e,
        isSuccess: false,
      });
    }
  };

  return (
    <div>
      <div
        className="container "
        style={{ borderRadius: "20px", overFlow: "hidden" }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1 className="card-title mb-0">Sign in</h1>
            <p className="card-subtitle">
              Please enter your details to sign in
            </p>
            <Form
              validated={validated}
              noValidate
              onSubmit={handleSubmit}
              className="mt-0"
            >
              <div className="form-floating mb-2">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInputValid"
                  placeholder=""
                  onChange={handleChange("email")}
                  required
                />
                <label
                  htmlFor="floatingInputValidation"
                  style={{ color: "#024647" }}
                >
                  Email address
                </label>
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control rounded-4 mb-0"
                  id="floatingPassword"
                  placeholder=""
                  onChange={handleChange("password")}
                  required
                />
                <label htmlFor="floatingPassword" style={{ color: "#024647" }}>
                  Password
                </label>
              </div>
            </Form>
            <div className="mb-5 fw-medium card-subtitle">
              <a
                href="/forgotpassword"
                className=" link-success link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                Forgot password?
              </a>
            </div>
            <div className="d-grid gap-2">
              {/* <button href="#" className="btn btn-primary">Submit</button> */}
              <Button
                text={loading ? <Loader /> : "Sign In"}
                cb={handleSubmit}
                disabled={loading}
              />
              <p className="mt-1 text-center card-subtitle fw-medium">
                Don’t have an account?{" "}
                <a
                  href="/signup"
                  className="link-success link-offset-2 link-offset-2-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
