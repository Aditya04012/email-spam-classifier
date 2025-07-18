import React,{useState} from 'react'
import "./App.css"


function App() {
const [loading, setloading] = useState(false);
const [message,setmessage]=useState("");
const[prediction,setPrediction]=useState("");
  const submit=async ()=>{
     if (!message.trim()) return;

    setloading(true);
    setPrediction("");


    try{
    const response=await fetch('https://backend-email-spam.onrender.com/predict',{
        method:'POST',
          headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({prompt:message})
    });
     const data = await response.json();
    setPrediction(data.prediction ||"No prediction");
    }catch(err){
        setPrediction("Error connecting to API");
        console.log(err);
    }finally{
        setloading(false);
    }


  }
  return (
    <div className='container'>
     <h1>Email Spam Classifier</h1>
     <h7>Enter Your Message</h7>
     <textarea className='textarea' onChange={(e)=>setmessage(e.target.value)} placeholder='Enter Your message here'></textarea>
      <button onClick={submit}>  {loading ? "Predicting..." : "Predict"}</button>
        {prediction && <p className="result">{prediction}</p>}
    </div>
  )
}

export default App
