import { useState } from "react";
import styles from "./NewOrder.module.css";

const customers = [
  "Alice Baker",
  "Tom Crust",
  "Sarah Dough"
];

const products = [
  "Chocolate Brownie",
  "Cinnamon Bun",
  "Sourdough Loaf",
  "French Baguette",
  "Pain Au Chocolat"
];

export default function NewOrder() {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: 1 }
  ]);

  function updateItem(index, field, value) {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  }

  function addItem() {
    setItems([...items, { product: "", quantity: 1 }]);
  }

  function removeItem(index) {
    setItems(items.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const payload = {
      customer,
      items: items.filter(i => i.product && i.quantity > 0)
    };
  
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) {
        throw new Error("API error");
      }
  
      alert("Order created");
      setCustomer("");
      setItems([{ product: "", quantity: 1 }]);
    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    }
  }

  return (
    <div className={styles.wrap}>
      <h2>New Order</h2>
      <p>Create a new customer order.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Customer
          <select
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            required
          >
            <option value="">Select customer</option>
            {customers.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <div className={styles.items}>
          <h4>Order items</h4>

          {items.map((item, index) => (
            <div key={index} className={styles.itemRow}>
              <select
                value={item.product}
                onChange={e =>
                  updateItem(index, "product", e.target.value)
                }
                required
              >
                <option value="">Product</option>
                {products.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
              />

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className={styles.remove}
                >
                  ✖
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className={styles.add}
          >
            + Add another item
          </button>
        </div>

        <button type="submit" className={styles.submit}>
          Create order
        </button>
      </form>
    </div>
  );
}
