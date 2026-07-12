import { useState } from "react";
import { Link } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = useState({
    department_id: "",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "department_id"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.msg);

        setFormData({
          department_id: "",
          name: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      console.error(error);
      setMessage("Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center">
      <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300">Department ID</label>
            <input
              type="number"
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-3 rounded-lg bg-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg p-3 text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {message && (
            <p className="text-center text-green-400">{message}</p>
          )}
        </form>
        <div className="text-center mt-5">
  <span className="text-gray-400">Already have an account? </span>
  <Link
    to="/login"
    className="text-blue-400 hover:text-blue-300 font-semibold"
  >
    Login
  </Link>
</div>
      </div>
    </div>
  );
}

export default Signup;