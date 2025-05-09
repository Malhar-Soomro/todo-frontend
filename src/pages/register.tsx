import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialValues: RegisterFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please enter your password"),
});

const Register: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm }: FormikHelpers<RegisterFormValues>
  ) => {
      console.log("User Registered:", values);
      resetForm();
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-white my-6">
          Register
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                First Name
              </label>
              <Field
                type="text"
                name="firstName"
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-black"
                placeholder="Enter your first name"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Last Name
              </label>
              <Field
                type="text"
                name="lastName"
                className="w-full p-3 border border-gray-300 rounded-lg placeholder-gray-500 text-black"
                placeholder="Enter your last name"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

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
              className="w-full p-3 rounded-lg text-white font-semibold transition duration-300 bg-pink-600 hover:bg-pink-700 "
            >
              Register
            </button>

             <div className="text-center text-sm text-gray-600 mt-4">
              <p className="inline">Already have an account? </p>
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
