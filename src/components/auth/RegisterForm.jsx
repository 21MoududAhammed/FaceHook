import { useForm } from "react-hook-form";
import Field from "../../components/common/Field";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (formData) => {
    const { retypePassword, ...userData } = formData;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/auth/register`,
        { ...userData }
      );
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError("fetching_error", {
        type: "random",
        message: `Something went wrong: ${err.message}`,
      });
    }
  };

  //  watch the values of the password and retypePassword fields
  const password = watch("password", "");
  const retypePassword = watch("retypePassword", "");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px] space-y-2"
    >
      {/*first name */}
      <Field
        label={"First Name"}
        htmlFor={"firstName"}
        error={errors.firstName}
      >
        <input
          className="auth-input"
          {...register("firstName", { required: "First Name is required." })}
          type="text"
          name="firstName"
          id="firstName"
        />
      </Field>

      {/* last name  */}
      <Field label={"Last Name"} htmlFor={"lastName"} error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is required." })}
          type="text"
          name="lastName"
          id="lastName"
          className="auth-input"
        />
      </Field>

      {/* email  */}
      <Field label={"Email"} htmlFor={"email"} error={errors.email}>
        <input
          {...register("email", { required: "Email is required." })}
          type="email"
          name="email"
          id="email"
          className="auth-input"
        />
      </Field>
      {/* password  */}
      <Field label={"Password"} htmlFor={"password"} error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required.",

            validate: {
              uppercase: (value) =>
                /[A-Z]/.test(value) ||
                "Password must contain at least one uppercase letter",
              lowercase: (value) =>
                /[a-z]/.test(value) ||
                "Password must contain at least one lowercase letter",
              specialCharacter: (value) =>
                /[@$!%*?&]/.test(value) ||
                "Password must contain at least a special character",
            },
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters.",
            },
          })}
          type="password"
          name="password"
          id="password"
          className="auth-input"
        />
      </Field>
      {/*retype password  */}
      <Field
        label={"Retype Password"}
        htmlFor={"retypePassword"}
        error={errors.retypePassword}
      >
        <input
          {...register("retypePassword", { required: "Confirm the password" })}
          type="password"
          name="retypePassword"
          id="retypePassword"
          className="auth-input"
        />
        {retypePassword && retypePassword !== password && (
          <span className="text-red-500 text-xs ">Passwords don't match.</span>
        )}
      </Field>
      {errors?.fetching_error && (
        <p className="text-red-500 text-xs">
          {errors?.fetching_error?.message}
        </p>
      )}
      {/* Submit */}
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
