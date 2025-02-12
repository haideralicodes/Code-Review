import React, {useState, useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from 'prismjs'
import Markdown from "react-markdown" 
import Editor from "react-simple-code-editor"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

export default function App() {

  const [code, setCode] = useState(`function sum(){ 
  return 1 + 1
}`)

  const [review, setReview] = useState(``)
  const [geminiResponse, setGeminiResponse] = useState("")
  const [loading, setLoading] = useState(false)
  
  useEffect(()=>{
    prism.highlightAll()
  }, [])

  async function reviewCode(){
    setLoading(true)
    const response = await axios.post('http://localhost:3000/ai/get-review', {code})
    
    try{
      if (response && response.data) {
        setGeminiResponse(response.data);
        setReview(response.data);
      }
    }
    catch(error){
      console.error("Error fetching review:", error)
      setReview("Failed to load review")
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div className="review">
            <button className='btn' onClick={reviewCode}>Review</button>
          </div>
        </div>
        <div className="right">
          {loading ? (
            <div className="skeleton">
              <lord-icon
                  src="https://cdn.lordicon.com/gvtjlyjf.json"
                  trigger="loop"
                  delay="0000"
                  colors="primary:#4030e8,secondary:#ffffff"
                  style={{ width: "100px", height: "100px" }}>
              </lord-icon>
            </div> 
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown> 
          )}
        </div>
      </main>
    </>
  )
}

