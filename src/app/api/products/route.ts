import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const products = await response.json()
    
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: body.title,
        price: body.price,
        description: body.description,
        image: body.image,
        category: body.category,
      }),
    })
    
    const newProduct = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      product: newProduct,
      message: 'Product added successfully!' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add product' }, 
      { status: 500 }
    )
  }
}