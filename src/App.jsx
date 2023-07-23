import { useState } from 'react'
import './App.css'
import {Configuration, OpenAIApi} from "openai"

const configuration =new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});

const openai= new OpenAIApi(configuration);


function App() {
  const [image , setImage]=useState("");
  const [isLoading, setIsLoading]= useState(false);
  const [prompt, setPrompt]=useState("");



  async function fetchData(){
    
    try{
      setIsLoading(true);
      const response = await openai.createImage({
        prompt : prompt,
        n: 1,
        size: "512x512"
      });
      setImage(response.data.data[0].url);
      setIsLoading(false);
    }catch (e) {
        setIsLoading(false );
        console.log(e);

    }
  }

  return (
    <>
      <div className='App'>
          <h1>
            Image Generator 
          </h1>
        <div>
          <input onChange={(e)=> setPrompt(e.target.value)} placeholder='Enter your prompt' />
          <button onClick={fetchData}>
            Generate
          </button>
        </div>
        <div style={{width: 512, height: 512}}>
          {isLoading ? (
            <>
              <p>
                Loading
              </p>
              <p>
                Please wait until your image is ready
              </p>
            </>
          ):(
            <img src={image}  />

          )}
        </div>
      </div>
    </>
  )
}

export default App
