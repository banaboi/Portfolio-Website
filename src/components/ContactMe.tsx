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

const sendMail = async (name: string, email: string, message: string): Promise<string> => {
    if (name === '' || email === '' || message === '') return 'warning'

    const mailToSend = {
        from_name: name,
        message: message,
        email: email,
    }

    try {
        const res = await emailjs.send(
            'service_51pblxq',
            'template_uu34azu',
            mailToSend,
            'user_AKWYNeLidVUnlrq6JImtl'
        )
        console.log('Message sent successfully:', res.status, res.text)
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
            <FadeInSection delay="1000ms">
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
                                <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        className="text-field"
                                        id="#name"
                                        required
                                        fullWidth
                                        label="Name"
                                        autoFocus
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        className="text-field"
                                        id="#email"
                                        required
                                        fullWidth
                                        label="Email Address"
                                        value={email}
                                        onChange={handleChange}
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
