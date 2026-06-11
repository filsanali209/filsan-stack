import { useState } from "react";
import styles from "./NewCustomer.module.css";

export default function NewCustomer() {
  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      setStatus("success");
      setForm({ name: "", email: "" });

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrap}>
      <h2>New Customer</h2>
      <p>Add a new customer to the Bakehouse.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Full name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={status === "submitting"}>
          Create customer
        </button>

        {status === "success" && (
          <div className={styles.success}>Customer created ✔️</div>
        )}

        {status === "error" && (
          <div className={styles.error}>Failed to create customer</div>
        )}
      </form>
    </div>
  );
}
