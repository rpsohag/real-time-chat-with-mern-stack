"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const registrationSchema = Yup.object({
  username: Yup.string().min(2).max(20).required("Username is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email id is required"),
  password: Yup.string().min(6).required("Please enter your password"),
});

const Register = () => {
  const [loading, setLoading] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: registrationSchema,
      onSubmit: async (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  return (
    <>
      <div className="flex justify-center min-h-screen align-middle bg-blue-300">
        <main id="content" className="w-full max-w-md mx-auto my-auto p-6">
          <Link href="/" className="header-logo">
            <h1 className="text-3xl text-center font-bold bg-gradient-to-r from-black to-blue-800 bg-clip-text text-transparent">
              Register
            </h1>
          </Link>
          <div className="mt-7 bg-white rounded-sm shadow-sm dark:bg-bgdark">
            <div className="p-4 sm:p-7">
              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Username
                      </label>
                      <div className="relative">
                        <input
                          type="username"
                          id="username"
                          name="username"
                          className="py-2 px-3 block w-full ring-1 outline-none rounded-sm text-sm"
                          placeholder="Enter your username"
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (
                          <small className="text-red-500 mt-1">
                            {errors.username}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="py-2 px-3 block w-full ring-1 outline-none rounded-sm text-sm"
                          placeholder="Enter your email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? (
                          <small className="text-red-500 mt-1">
                            {errors.email}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          Password
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="py-2 px-3 block w-full outline-none  rounded-sm text-sm ring-1"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? (
                          <small className="text-red-500 mt-1">
                            {errors.password}
                          </small>
                        ) : null}
                      </div>
                    </div>

                    <button
                      className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-sm border border-none font-semibold text-white bg-blue-500 "
                      type="submit"
                    >
                      {loading ? "Processing...." : "Register"}
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="mt-3 text-sm text-gray-600 dark:text-white/70">
                      You already have an account?
                      <Link
                        className="text-primary decoration-2 hover:underline font-medium"
                        to="/login"
                      >
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Toaster />
        </main>
      </div>
    </>
  );
};

export default Register;
