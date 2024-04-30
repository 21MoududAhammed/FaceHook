import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../api/api";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { setAuth } = useAuth();

  const onSubmit = async (formData) => {
    // make an API call and get auth token and user info
    try {
      const response = await api.post("/auth/login", { ...formData });
      if (response.status === 200) {
        const { token, user } = response.data;
        const authToken = token.token;
        const refreshToken = token.refreshToken;
        setAuth({ user, authToken, refreshToken });
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      // set error to the react-hook-form
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found.`,
      });
    }
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
          
          })}
          className="auth-input"
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
        />
      </Field>
      {/* error message  */}
      <p className="text-red-600 text-xs ">{errors?.root?.random?.message}</p>
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
