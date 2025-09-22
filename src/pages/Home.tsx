import { useState } from "react"
import SelectBox from "../components/SelectBox"
import usePost from "../hooks/usePost"
import useUsers from "../hooks/useUsers"
import { useNavigate } from "react-router-dom"
import { type Post } from "../types"
import { type ReactElement } from "react"
import Header from "../components/Header"

function Home(): ReactElement {
    const [selectedUser, setSelectedUser] = useState<number>(0)
    const { posts, isLoading } = usePost(selectedUser)
    const { users } = useUsers()
    const navigate = useNavigate();

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Header />
            <Main/>
            <Product/>
            <Footer/>
            <h1>Post</h1>
            <SelectBox selectedUser={selectedUser} setSelectedUser={setSelectedUser} users={users} />
            <div className="row">
                {posts.map((post: Post) => (
                    <div className="col-3 mb-3" key={post.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button onClick={() => navigate(`/posts/${post.id}/comments`)}>comments</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home