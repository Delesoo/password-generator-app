import React, { useState, useRef } from "react";
import clipBoard from './images/icon-copy.svg';
import arrowRight from './images/icon-arrow-right.svg';

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let allChars = '';

    if (includeUppercase) allChars += uppercaseChars;
    if (includeLowercase) allChars += lowercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars.charAt(randomIndex);
    }

    return password;
}


function App() {
    const [characterLength, setCharacterLength] = useState(7);
    const [includeUppercase, setIncludeUppercase] = useState(false);
    const [includeLowercase, setIncludeLowercase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState("");
    const passwordInput = useRef(null);

    const handleCopyToClipboard = () => {
        passwordInput.current.select();
        document.execCommand('copy');
        passwordInput.current.blur();
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      };
      
      const [copied, setCopied] = useState(false);
      

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(characterLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
        setGeneratedPassword(newPassword);
    };


    const calculatePasswordStrength = () => {
        let score = 0;

        if (includeUppercase) score += 1;
        if (includeLowercase) score += 1;
        if (includeNumbers) score += 1;
        if (includeSymbols) score += 1;

    return score;
    }
    const passwordStrength = calculatePasswordStrength();
    let strengthIndicator = null;

    if (passwordStrength === 0) {
        strengthIndicator = <div className="strength-indicator tooweak">Too Weak</div>;
    } else if (passwordStrength === 1) {
        strengthIndicator = <div className="strength-indicator weak">Weak</div>;
    } else if (passwordStrength === 2) {
        strengthIndicator = <div className="strength-indicator medium">Medium</div>;
    } else {
        strengthIndicator = <div className="strength-indicator strong">Strong</div>;
    }

    return (
        <section>
            <div className="container">
                <form id="page-form">
                    <div className="result">
                        <input 
                         type="text"
                         id="result" 
                         placeholder="P4$5W0rD!"
                         value={generatedPassword}
                         readOnly
                         ref={passwordInput}
                         />
                        <div className="clipboard">
                            {copied && <span className="copy-text">copied</span>}
                            <img 
                            src={clipBoard} 
                            alt="icon" 
                            onClick={handleCopyToClipboard}
                            style={{ cursor: 'pointer' }}
                            />
                            
                        </div>
                    </div>
                </form>
            </div>

        <div className="second-container">

            <div className="slider-container">
                    <label htmlFor="charLength">Character Length: {characterLength}</label>
                    <input 
                        type="range"
                        id="charLength"
                        min="4"
                        max="10"
                        value={characterLength}
                        onChange={event => setCharacterLength(event.target.value)}
                    />
                   </div>
            <div className="checkbox-container">
            <input
                type="checkbox"
                id="includeUppercase"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
            />
                <label className="checkbox-content" htmlFor="includeUppercase">Include Uppercase Letters</label>
            </div>
            <div className="checkbox-container">
            <input
                type="checkbox"
                id="includeLowercase"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
            />
                <label className="checkbox-content" htmlFor="includeLowercase">Include Lowercase Letters</label>
            </div>
            <div className="checkbox-container">
            <input
                type="checkbox"
                id="includeNumbers"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
            />
                <label className="checkbox-content" htmlFor="includeNumbers">Include Numbers</label>
            </div>
            <div className="checkbox-container">
            <input
                type="checkbox"
                id="includeSymbols"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            <label className="checkbox-content" htmlFor="includeSymbols">Include Symbols</label>
            </div>
            
            <div className="strength-container">
                <span>Strength: {strengthIndicator}</span>
            </div>

            <div className="generate-btn">
            <button onClick={handleGeneratePassword}>Generate <img className="arrow-right" src={arrowRight} alt="arrow" /></button>    
            </div>
            

        </div>

        </section>
    );
};

export default App;