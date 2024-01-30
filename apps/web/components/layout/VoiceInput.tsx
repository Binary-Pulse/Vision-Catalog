"use client"
import React, { useState } from "react";
import { useMounted }  from "../../lib/hooks/use-mounted"

export const VoiceInput = ()=>{
    const [recognationRunning , setRecognationRunning] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>('')
    const isMounted = useMounted();

    if(!isMounted){ return; }

    if(typeof window === "undefined"){
        return <div>Loading...</div>
    }

    
    const SpeechRecognition: any = 
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition;

    
    const recognation = new SpeechRecognition();
    
    const handleClick: any = () =>{
        if(!recognationRunning){
            setRecognationRunning((prev) => !prev);
            recognation.start();
        }else{
            setRecognationRunning((prev) => !prev);
            recognation.stop();
        }
    }
    function startSpeechRecognation(){
        console.log("Active SpeechRecognition")
    }
    function endSpeechRecognation(){
        if(!recognationRunning){
            setRecognationRunning((prev) => !prev);
        }
        console.log("Disconnect SpeechRecognition")
    }
    function resultSpeechRecognation(e: any){
        const transcript = e.results[0][0].transcript;
        setTranscript(transcript);

    }
    
    recognation.addEventListener("start", startSpeechRecognation);
    recognation.addEventListener("end", endSpeechRecognation);
    recognation.addEventListener("result", resultSpeechRecognation)
      return <>
        { 
            !recognationRunning ? 
            <button className="cursor-pointer" onClick={() => handleClick()}>
             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAzUlEQVR4nO2UzQ7BQBSFu7ISO7wOfQM/TyMWxMJ4HTwG4iGoHSKWkk8mOZFB2xidlTpJF3fuveebtjM3ikohoALMgATYA8auhQQY3mVCApIUwCEkIFV/wENkKCovALjKo6rYXq5X7ZSrKb74ALZqauVctKlyseKND2CiprkzKoze5GlUAEvVjn0ATeCsxkFO3VA1J6D+MUDNfeAmgwXQtv9ET+zs3NZ0vcwdSA84Zp0i5TpfmTuQhv2+wNoxXgEjmytkngIrdv5/H1BO3QH61fsmlT8KewAAAABJRU5ErkJggg=="/>
            </button>
            :
            <button className="cursor-pointer"  onClick={() => handleClick()}>
           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAUUlEQVR4nO2VwQkAIAgAHa/9R7BBLuoZIVn0Me8p6mGEiiQegAJUztHewxL0hFvUEgxcY3vq4wqY4rt5KSCfKNAv2uUPgfJ4XZdLiZoHJ5EFDUJNedx7hghoAAAAAElFTkSuQmCC"/>
            </button>
        }
        { transcript && <h2>{transcript}</h2> }
    </>
}