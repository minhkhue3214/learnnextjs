import React from 'react'
import { useRouter } from 'next/navigation'

async function getPosts() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        console.log("res", data);
        return data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; 
    }
}



const page = async () => {
    const posts = await getPosts()

    return (
        <>
            {posts.map((post, index) => {
                return (<div key={index} className="w-1/3 mt-3 bg-cyan-400">
                    <h1 className='font-semibold'>
                        Title: {post.title}
                    </h1>
                    <hr/>
                    <p>
                        Body:{post.body}
                    </p>
                </div>)
            })}
        </>
    )
}

export default page