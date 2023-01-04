import { FC, useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { Login } from "../../components/Models/Model";

interface Props {
    setToken: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage:FC<Props> = ({setToken}) =>{
    const [formData, setFormData] = useState<Login>({
      email: "",
      password: "",
    });
    const [isPending, setIspending] = useState<boolean>(false);
    const [error, setError] = useState<any>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const params = useParams<Record<string, string | undefined>>();
    const navigate = useNavigate()
    console.log(params);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const token = { ...formData };
      console.log(token);
      setIspending(true);
      await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(token),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setToken(data);
          navigate("/")
          setIspending(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setIspending(false);
        });
    };

    const clear = (e: React.FormEvent) => {
      e.preventDefault();
      setFormData({ email: "", password: "" });
    };

    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    
    
        return(
            <div className="form">
                <h6>{error ? error : null}</h6>
                <h1>Log In</h1>
               <form onSubmit={handleSubmit}>
                <input ref={inputRef}  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="email" />
                <input value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})} placeholder="password" />
                <button>{isPending ? "Submiting..": "Submit"}</button>
                <button onClick={clear}>clear</button>
               </form>
               <Link style={{ color: "whitesmoke",  fontSize:"12px" }} to="/signup">Sign up ?</Link>
            </div>
        )
}

export default LoginPage