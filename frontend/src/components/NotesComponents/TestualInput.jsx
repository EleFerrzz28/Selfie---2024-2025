import "./TestualInput.css"
import { useState, useEffect } from "react";


function TestualInput({txt}) {
    const [count, setCount] = useState(0);
    const [charCount, setCharCount] = useState(0);
    useEffect(() => {
        setCount(txt.trim() ? txt.trim().split(/\s+/).length : 0)
        setCharCount(txt.length)
    }, [txt])
  
    return (
        <div className="d-flex p-0 ms-2 justify-content-start">
            <p>{count} words</p>
            <p className = "ps-3">{charCount} characters</p>
        </div>
    )
}

export default TestualInput