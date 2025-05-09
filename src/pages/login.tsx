import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import {useRouter} from "next/router";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});

const Login: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: LoginFormValues,
    {resetForm}: FormikHelpers<LoginFormValues>
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-black"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-black"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 rounded-lg text-white font-semibold transition duration-300 bg-pink-600 hover:bg-pink-700 cursor-pointer"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              <p className="inline">Don’t have an account? </p>
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Sign up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
