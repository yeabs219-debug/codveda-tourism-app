import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(form);
      navigate("/");
    } catch (err) {
      const backendError = err.response?.data;
      if (backendError?.details) {
        setError(backendError.details.map((d) => d.message).join(" "));
      } else {
        setError(backendError?.error || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-surface p-8 rounded-2xl shadow-sm border border-border">
        <h1 className="text-2xl font-bold text-primary mb-1">Create your account</h1>
        <p className="text-muted mb-6">Start planning your next adventure.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {error && <p className="text-sm text-error">{error}</p>}

          <Button type="submit" loading={loading} className="mt-2">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-muted mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}