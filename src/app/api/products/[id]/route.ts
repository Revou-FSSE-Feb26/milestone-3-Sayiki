import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
    const product = await response.json()
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Product not found' }, 
      { status: 404 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        title: body.title,
        price: body.price,
        description: body.description,
        image: body.image,
        category: body.category,
      }),
    })
    
    const updatedProduct = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      product: updatedProduct,
      message: 'Product updated successfully!' 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    })
    
    const result = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Product deleted successfully!',
      deletedProduct: result 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' }, 
      { status: 500 }
    )
  }
}