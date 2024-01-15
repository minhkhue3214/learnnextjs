import { NextResponse } from "next/server"

export async function GET() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    const posts = data.slice(0, 4)
    return NextResponse.json({ data: posts })
}

export async function POST() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        body: JSON.stringify({
            title: "mint",
            body: "test mint",
            userId: 1,
        }),
        headers: {
            'Content-type': "application/json; charset=UTF-8"
        },
    })
    const data = await res.json()
    return NextResponse.json(data)
}