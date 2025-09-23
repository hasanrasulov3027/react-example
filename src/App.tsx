import { useEffect, useState } from "react"
import { db } from "./firebase"
import { addDoc, collection, query, deleteDoc, doc, onSnapshot, orderBy, where } from "firebase/firestore";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import useCategory from "./hooks/useCategory";

function App() {

    const [selectedCategory, setSetelectedCategory] = useState("")

    const queryIf = selectedCategory === "" ? orderBy("created_at", "desc") : where("categoryId", "==", selectedCategory)

    const q = query(
        collection(db, "posts"),
        queryIf
    )

    const { category } = useCategory()

    const [posts, setPosts] = useState<any[]>([])
    const { register, handleSubmit, reset } = useForm()
    const [fileBase64, setFileBase64] = useState<string>("");

    useEffect(() => {
        const unSub = onSnapshot(q, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
        return () => unSub();
    }, [selectedCategory])



    // convert file → Base64 string
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file); // read file as base64
        reader.onloadend = () => {
            setFileBase64(reader.result as string);
        };
    };

    async function addPost(data: any) {
        try {
            await addDoc(collection(db, "posts"), {
                ...data,
                imgBase64: fileBase64, // save Base64 string
                created_at: Date.now()
            });



            toast.success("Post added ✅");
            reset();
            setFileBase64("");
        } catch (err) {
            console.error(err);
            toast.error("Error adding post ❌");
        }
    }

    async function deletePost(id: string) {
        try {
            await deleteDoc(doc(db, "posts", id))
            toast.success("Post deleted ✅")
        } catch (error) {
            console.error(error);
            toast.error("Error deleting post ❌")
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit((data) => addPost(data))}>
                <input type="file" onChange={handleFileChange} />
                <input type="text" placeholder="Title" {...register("title", { required: true })} />
                <input type="text" placeholder="Description" {...register("description", { required: true })} />
                <button type="submit">Add</button>
            </form>

            <span onClick={() => setSetelectedCategory("")} className="badge bg-primary cursor-pointer" key={category.id}>
                All
            </span>
            {
                category.map((category: any) => (
                    <span onClick={() => setSetelectedCategory(category.id)} className="badge bg-primary cursor-pointer" key={category.id}>
                        {category.name}
                    </span>
                ))
            }
            <hr />
            {posts.map((post: any) => (
                <div key={post.id}>
                    {post.imgBase64 && <img src={post.imgBase64} alt="post" width="200" />}
                    <h1>{post.title}</h1>
                    <p>{post.description}</p>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default App;
