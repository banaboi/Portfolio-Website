import React, { useState, ChangeEvent } from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import '../styles/App.scss'
import emailjs from '@emailjs/browser'
import { Alert, Snackbar } from '@mui/material'
import FadeInSection from './FadeInSection'
import DeathStarLoader from './DeathStarLoader'
import { STAR_WARS_MESSAGES } from '../constants/index'

// Input validation helper
const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
};

const sendMail = async (name: string, email: string, message: string): Promise<string> => {    // Enhanced validation
    if (!name.trim() || !email.trim() || !message.trim()) return 'warning'
    if (!validateEmail(email)) return 'warning'
    if (name.length > 100 || message.length > 1000) return 'warning'
    
    const mailToSend = {
        from_name: sanitizeInput(name),
        message: sanitizeInput(message),
        email: sanitizeInput(email),
    }
    
    try {
        const _res = await emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_51pblxq',
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uu34azu',
            mailToSend,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'user_AKWYNeLidVUnlrq6JImtl'
        )
        return 'success'
    } catch (error) {
        console.error('Failed to send message:', error)
        return 'error'
    }
}

const ContactMe = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)
    const [openWarning, setOpenWarning] = useState<boolean>(false)
    const [openError, setOpenError] = useState<boolean>(false)

    const clearInputFields = (): void => {
        setName('')
        setEmail('')
        setMessage('')
    }

    const handleClick = async () => {
        setIsLoading(true)

        try {
            const result = await sendMail(name, email, message)

            switch (result) {
                case 'success':
                    setOpenSuccess(true)
                    clearInputFields()
                    break
                case 'error':
                    setOpenError(true)
                    break
                case 'warning':
                    setOpenWarning(true)
                    break
                default:
                    break
            }
        } catch (error) {
            console.error('Error sending message:', error)
            setOpenError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        setOpenSuccess(false);
        setOpenError(false);
        setOpenWarning(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case "#name":
                setName(e.target.value);
                break;
            case "#email":
                setEmail(e.target.value);
                break;
            case "#message":
                setMessage(e.target.value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <FadeInSection delay={400}> {/* Reduced from 1000ms to 400ms */}
                <Container id="contact" className="section contact-section">
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                        }}
                    >
                        <span className="sub-heading">Transmit a Hologram </span>

                        {isLoading ? (
                            <DeathStarLoader
                                size={80}
                                message="Transmitting to the Jedi Council..."
                            />
                        ) : (
                            <Box sx={{ mt: 3 }}>
                                <Grid container spacing={2}>                                <Grid item xs={12}>
                                    <TextField
                                        className="text-field"
                                        id="#name"
                                        required
                                        fullWidth
                                        label="Name"
                                        autoFocus
                                        value={name}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                        helperText={`${name.length}/100 characters`}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className="text-field"
                                        id="#email"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        type="email"
                                        value={email}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 100 }}
                                        error={email.length > 0 && !validateEmail(email)}
                                        helperText={
                                            email.length > 0 && !validateEmail(email) 
                                                ? "Please enter a valid email address" 
                                                : `${email.length}/100 characters`
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className="text-field"
                                        id="#message"
                                        required
                                        multiline
                                        fullWidth
                                        rows={8}
                                        label="Message"
                                        value={message}
                                        onChange={handleChange}
                                        inputProps={{ maxLength: 1000 }}
                                        helperText={`${message.length}/1000 characters`}
                                    />
                                </Grid>
                            </Grid>
                                <Button
                                    className="contact-button"
                                    fullWidth
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClick}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Transmitting...' : 'Transmit to the Jedi Council'}
                                </Button>
                            </Box>
                        )}
                        <Snackbar
                            id="success-snackbar"
                            open={openSuccess}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <Alert severity="success">
                                {STAR_WARS_MESSAGES.SUCCESS.FORM_SUBMIT}
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            id="error-snackbar"
                            open={openError}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <Alert severity="error">
                                {STAR_WARS_MESSAGES.ERRORS.NETWORK}
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            id="warning-snackbar"
                            open={openWarning}
                            autoHideDuration={4000}
                            onClose={handleClose}
                        >
                            <Alert severity="warning">
                                {STAR_WARS_MESSAGES.ERRORS.FORM_VALIDATION}
                            </Alert>
                        </Snackbar>
                    </Box>
                </Container>
            </FadeInSection>
        </>
    );
};

export default ContactMe;
