export default async function removeProduct(productId){ 
    // console.log("productId 1", productId);
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/destroy/${productId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      console.log("removeProduct",response); 
      return response;
    } catch (error) {
      console.error("Error delete product:", error);
      throw error;
    }
}