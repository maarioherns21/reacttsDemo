import React, { FC, useEffect, useRef, useState } from "react";
import { User } from "../../components/Models/Model";
import FileBase from "react-file-base64"
import "./Style.css"

interface Props {
    setToken: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignupPage: FC<Props> = ({ setToken }) => {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    email: "",
    bio: "",
    image: "",
  });
  const [isPending, setIspending] = useState<boolean>(false);
  const [error, setError] = useState<any>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = { ...formData };
    setIspending(true);
    await fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToken(data);
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
    setFormData({ username: "", password: "", email: "", bio: "", image: "" });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form">
      <h6>{error ? error : null}</h6>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          placeholder="username"
        />
        <input
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email"
        />
        <input
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="password"
        />
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="bio"
        />
        <FileBase
          value={formData.image}
          type="file"
          multiple={false}
          onDone={({ base64 }) => setFormData({ ...formData, image: base64 })}
        />
        <button>{isPending ? "Submiting.." : "Submit"}</button>
        <button onClick={clear}>clear</button>
      </form>
    </div>
  );
};

export default SignupPage