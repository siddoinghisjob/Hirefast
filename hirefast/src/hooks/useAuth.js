import { useEffect , useState } from "react";

export default function useAuth() {
  const [state, setState] = useState({ success: null });

  useEffect(() => {
    fetch("http://localhost:1000/auth", {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_ORIGIN,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setState(state=>data);
      })
      .catch((err) => setState({ success: false }));
  }, []);
  return [state, setState];
}