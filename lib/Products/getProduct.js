// export const removeProduct = (productId) => {
//     console.log("removeProduct");
// }

export default function getProduct(productId) {
  return new Promise((resolve, reject) => {
    fetch(`http://127.0.0.1:8000/api/v1/products/show/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
}


