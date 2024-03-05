import InputField from "../../components/fields/InputField";
import Checkbox from "../../components/checkbox";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Spinner from "../../components/spinner/Spinner";

export default function SignIn() {
  // const { loading, error, get, post, getSession } = useAxios(); // Use the custom hook
  const [csrf, setCsrf] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   getSession();
  // }, []);

  useEffect(() => {
    getSession();
  }, []);

  const getCsrf = () => {
    fetch("http://localhost:8000/auth/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        if (csrfToken) setCsrf(csrfToken);
        console.log("csrfToken: ", csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSession = () => {
    fetch("http://localhost:8000/auth/session/", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          console.log(data);
          // setIs_staff(data.is_staff);
        } else {
          setIsAuthenticated(false);
          getCsrf();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isResponseOk = (response: Response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: Yup.object({
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(8, "Must be at least 8 characters")
    //     .required("Required"),
    // }),
    onSubmit: async (values) => {
      setIsLoading(true);
      console.log("Value: ", values); // Submit logic here
      fetch("http://localhost:8000/auth/login/", {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrf,
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      })
        .then(isResponseOk)
        .then((data) => {
          setIsLoading(false);
          console.log(data);
          setIsAuthenticated(true);
          window.location.href = "/admin/default";
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("errror: ", err);

          // setError("Wrong email or password.");
        });
    },
  });

  return (
    <>
      {isLoading && <Spinner isFromLogin={true} />}
      <div
        className={`mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start ${
          isLoading ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {/* Sign in section */}

        <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
          </h4>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>

          <form
            action="#!"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              // return false;
            }}
          >
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              onChange={formik.handleChange} // Add onChange prop
              value={formik.values.password} // A
            />
            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              <a
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                href=" "
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
              Not registered yet?
            </span>
            <a
              href=" "
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
