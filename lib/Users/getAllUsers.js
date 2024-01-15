export default async function getAllUsers() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/users`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
  