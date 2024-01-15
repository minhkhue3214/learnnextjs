export default function getProfile() {
    const token = JSON.parse(localStorage.getItem("token"));

    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8000/api/v1/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
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
