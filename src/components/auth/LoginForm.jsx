import Field from "../common/Field";
import { useForm } from "react-hook-form";
import {useNavigate} from 'react-router-dom';

export default function LoginForm() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px] space-y-4"
    >
      <Field label={"Email"} htmlFor={"email"} error={errors.email}>
        <input
          {...register("email", {
            required: "Email ID is required",
          })}
          className="auth-input"
          type="email"
          name="email"
          id="email"
          placeholder="Enter an email"
        />
      </Field>

      <Field label={"Password"} htmlFor={"password"} error={errors.password}>
        <input
          {...register("password", {
            required: "Password id required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long.",
            },
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
          })}
          className="auth-input"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
      </Field>

      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 mt-5"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
}
