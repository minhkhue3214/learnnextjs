import axios from "axios";

export default function updateProduct(productId, formData) {
    if (formData.image && typeof formData.image !== 'object') {
        // Loại bỏ khóa image
        delete formData.image;
    }

    return new Promise((resolve, reject) => {
        axios.post(`http://127.0.0.1:8000/api/v1/products/update/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            console.log("Data update", response.data);
            // setProducts(response.data)
            resolve(response.data);
        }).catch(err => {
            console.log("Error", err);
            reject(err);
        });
    });
}