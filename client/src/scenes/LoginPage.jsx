import { Box } from "@mui/material"
import { Button } from "@mui/material"
import LoginForm from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { useState } from "react"

function LoginPage() {
  const [view, setView] = useState("login")
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button variant="contained" onClick={() => setView("login")}>Login</Button>
        <Button variant="contained" onClick={() => setView("register")}>Register</Button>
      </Box>
      <Box sx={{
        display: 'flex',
        padding: '1rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        maxWidth: '15rem'
      }}>
        {view === "login" ? <LoginForm /> : <RegisterForm />}
      </Box>
    </Box >
  )
}

export default LoginPage