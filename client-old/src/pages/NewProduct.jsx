
import { useState } from "react";
import styles from "./NewProduct.module.css";

export default function NewProduct() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: ""
  });

  const [status, setStatus] = useState("idle");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function buildPdfFilename(name) {
    return (
      name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_") + ".pdf"
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      productId: buildPdfFilename(form.name).replace(".pdf", ""),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      pdfFile: buildPdfFilename(form.name)
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      setStatus("success");
      setForm({ name: "", category: "", price: "" });

    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  return (
    <div className={styles.wrap}>
      <h2>New Product</h2>
      <p>Create a new bakery product.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Product name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={status === "submitting"}>
          Create product
        </button>

        {status === "success" && (
          <p className={styles.success}>Product created ✔️</p>
        )}

        {status === "error" && (
          <p className={styles.error}>Failed to create product</p>
        )}
      </form>
    </div>
  );
}
