const logInvocationDetails = (event, context) => {
  console.log('Event received:')
  console.log(JSON.stringify(event, null, 2))

  console.log('Context received:')
  console.log({
    functionName: context.functionName,
    functionVersion: context.functionVersion,
    awsRequestId: context.awsRequestId,
    remainingTimeMs: context.getRemainingTimeInMillis()
  })
}

export const productsListHandler = async (event, context) => {
  const productId = event.productId || 'NOT_SET'
  const category = event.category || 'NOT_SET'
  
  console.log('productsListHandler invoked')  
  console.log(`PARAMS: productId = ${productId}`)
  console.log(`PARAMS: category = ${category}`)
  console.log(`Featured product is ${process.env.FEATURED_PRODUCT}, from env vars`)
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
      products: ['blueberry_muffin', 'butter_croissant', 'cinnamon_bun','french_baguette', 'pain_au_chocolat', 'sausage_roll', 'sourdough_loaf', 'vegan_banana_bread', 'victoria_sponge_slice']
    })
  }
}



export const postProductHandler = async (event) => {
  console.log('postProductsHandler invoked')

  const body = event.body ? JSON.parse(event.body) : {}

  console.log('POST /products payload:', body)

  return {
    statusCode: 201,
    body: JSON.stringify({
      status: 'created',
      product: body
    })
  }
}

export const postCustomersHandler = async (event) => {
  console.log('postCustomersHandler invoked')

  const body = event.body ? JSON.parse(event.body) : {}

  console.log('POST /customers payload:', body)

  return {
    statusCode: 201,
    body: JSON.stringify({
      status: 'created',
      customer: body
    })
  }
}

export const postOrdersHandler = async (event) => {
  console.log('postOrdersHandler invoked')

  const body = event.body ? JSON.parse(event.body) : {}

  console.log('POST /orders payload:', body)

  return {
    statusCode: 201,
    body: JSON.stringify({
      status: 'created',
      order: body
    })
  }
}


export const badHandler = async (event) => {
  console.log('badHandler invoked')
  try {
    throw new Error('DB call failed - connection timeout')

  } catch (error) {
    console.error('REAL ERROR:', error)

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Please try again later'
      })
    }
  }
}

export const getCustomersHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
      customers: [
        { id: "c001", name: "Alice Baker", email: "alice@bakehouse.dev", orders: 5 },
        { id: "c002", name: "Tom Crust", email: "tom@bakehouse.dev", orders: 2 },
        { id: "c003", name: "Sarah Dough", email: "sarah@bakehouse.dev", orders: 8 }
    ]
    })
  }
}

export const getOrdersHandler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      status: 'ok',
      orders: [
        {
          id: "o1001",
          customer: "Alice Baker",
          status: "Processing",
          items: [
            { product: "Chocolate Brownie", quantity: 3 },
            { product: "Cinnamon Bun", quantity: 2 }
          ]
        },
        {
          id: "o1002",
          customer: "Tom Crust",
          status: "Completed",
          items: [
            { product: "Sourdough Loaf", quantity: 1 }
          ]
        },
        {
          id: "o1003",
          customer: "Sarah Dough",
          status: "Pending",
          items: [
            { product: "French Baguette", quantity: 2 },
            { product: "Pain Au Chocolat", quantity: 4 }
          ]
        }
      ]
    })
  }
}
