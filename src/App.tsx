import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [redirectUrl, setRedirectUrl] = useState<string>('')
  const [hasParams, setHasParams] = useState(false)

  useEffect(() => {
    // Get current URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const paramString = urlParams.toString()
    
    // Build the eBay callback URL with parameters
    const ebayCallbackUrl = import.meta.env.VITE_EBAY_CALLBACK_URL || 'http://ebay-chatbot.gcdjapancoltd.com/auth/ebay/callback'
    
    if (paramString) {
      // If parameters exist, automatically redirect
      const fullRedirectUrl = `${ebayCallbackUrl}?${paramString}`
      setRedirectUrl(fullRedirectUrl)
      setHasParams(true)
      
      // Automatically redirect after a short delay
      setTimeout(() => {
        window.location.href = fullRedirectUrl
      }, 500) // 0.5 second delay to show the redirect message
    } else {
      // No parameters, show the interface
      setRedirectUrl(ebayCallbackUrl)
      setHasParams(false)
    }
  }, [])

  const handleTestRedirect = () => {
    // Test with sample parameters
    const testParams = new URLSearchParams({
      code: 'test_code_123',
      state: 'test_state',
      scope: 'read_user'
    })
    const ebayCallbackUrl = import.meta.env.VITE_EBAY_CALLBACK_URL || 'http://ebay-chatbot.gcdjapancoltd.com/auth/ebay/callback'
    const testUrl = `${ebayCallbackUrl}?${testParams.toString()}`
    window.location.href = testUrl
  }

  // If parameters exist, show redirect message
  if (hasParams) {
    return (
      <div className="app">
        <div className="redirect-message">
          <h1>🔄 Redirecting to eBay Callback</h1>
          <div className="spinner"></div>
          <p>Parameters detected: <code>{window.location.search}</code></p>
          <p>Redirecting to: <span className="redirect-url">{redirectUrl}</span></p>
          <p className="redirect-timer">Redirecting in 1 second...</p>
        </div>
      </div>
    )
  }

  // If no parameters, show the interface
  return (
    <div className="app">
      <h1>eBay Callback Redirect</h1>
      
      <div className="card">
        <h2>No Parameters Detected</h2>
        <p>This page will automatically redirect to eBay callback when parameters are present in the URL.</p>
        
        <h2>Test the Redirect</h2>
        <p>Click the button below to test with sample parameters:</p>
        
        <div className="button-group">
          <button 
            onClick={handleTestRedirect}
            className="test-button"
          >
            Test with Sample Parameters
          </button>
        </div>
      </div>
      
      <div className="info">
        <h3>How it works:</h3>
        <ul>
          <li>When you visit this page with parameters: <code>?param1=value1&param2=value2</code></li>
          <li>It will automatically redirect to: <code>http://ebay-chatbot.gcdjapancoltd.com/auth/ebay/callback?param1=value1&param2=value2</code></li>
          <li>If no parameters are present, this interface is shown</li>
        </ul>
      </div>
    </div>
  )
}

export default App
