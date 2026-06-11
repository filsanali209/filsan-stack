# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test.spec.cjs >> Bakehouse website tests >> can add new order
- Location: test\playwright\test.spec.cjs:33:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Customer')
    - locator resolved to <select disabled required="">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
      - waiting 100ms
    4 × waiting for element to be visible and enabled
      - element is not enabled
    - retrying select option action
      - waiting 500ms
    51 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]: filsan-alisamatar-bakehouse demo app
    - navigation [ref=e6]:
      - link "Home" [ref=e7] [cursor=pointer]:
        - /url: /
      - link "Products" [ref=e8] [cursor=pointer]:
        - /url: /products
      - link "New Product" [ref=e9] [cursor=pointer]:
        - /url: /products/new
      - link "Customer List" [ref=e10] [cursor=pointer]:
        - /url: /customers
      - link "New Customer" [ref=e11] [cursor=pointer]:
        - /url: /customers/new
      - link "Order List" [ref=e12] [cursor=pointer]:
        - /url: /orders
      - link "New Order" [active] [ref=e13] [cursor=pointer]:
        - /url: /orders/new
  - main [ref=e14]:
    - generic [ref=e15]:
      - heading "New Order" [level=2] [ref=e16]
      - paragraph [ref=e17]: Create a new customer order.
      - generic [ref=e18]:
        - generic [ref=e19]:
          - text: Customer
          - combobox "Customer" [ref=e20]:
            - option "Select customer" [selected]
        - generic [ref=e21]:
          - heading "Order items" [level=4] [ref=e22]
          - generic [ref=e23]:
            - combobox [ref=e24]:
              - option "Product" [selected]
            - spinbutton [ref=e25]: "1"
          - button "+ Add another item" [ref=e26] [cursor=pointer]
        - button "Create order" [disabled] [ref=e27]
```