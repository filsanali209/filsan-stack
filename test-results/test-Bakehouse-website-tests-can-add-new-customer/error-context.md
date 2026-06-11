# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test.spec.cjs >> Bakehouse website tests >> can add new customer
- Location: test\playwright\test.spec.cjs:18:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('form div')
Expected: "Customer created ✔️"
Received: "Failed to create customer"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('form div')
    8 × locator resolved to <div class="_error_10074_83">Failed to create customer</div>
      - unexpected value "Failed to create customer"

```

```yaml
- text: Failed to create customer
```