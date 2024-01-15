export default function storeReceipt(data) {
    const token = JSON.parse(localStorage.getItem("token"));

    return new Promise((resolve, reject) => {
        fetch("http://127.0.0.1:8000/api/v1/receipts/store", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
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