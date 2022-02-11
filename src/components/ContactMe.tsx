import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "../styles/App.scss";
import emailjs from "@emailjs/browser";
import { Alert, Snackbar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const sendMail = (name: string, email: string, message: string): string => {
    if (name === "" || email === "" || message === "") return "warning";

    const mailToSend: any = {
        from_name: name,
        message: message,
        email: email,
    };

    emailjs
        .send(
            "service_51pblxq",
            "template_uu34azu",
            mailToSend,
            "user_AKWYNeLidVUnlrq6JImtl"
        )
        .then((res) => {
            console.log("success", res.status, res.text);
        })
        .catch((error) => {
            console.log("failed...", error);
            return "error";
        });

    return "success";
};

const ContactMe = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);

    const clearInputFields = (): void => {
        setName("");
        setEmail("");
        setMessage("");
    };

    const handleClick = () => {
        let result = sendMail(name, email, message);
        switch (result) {
            case "success":
                setOpenSuccess(true);
                clearInputFields();
                break;
            case "error":
                setOpenError(true);
                break;
            case "warning":
                setOpenWarning(true);
                break;
            default:
                break;
        }
    };

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
            <Container id="contact" className="section contact-section">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                    }}
                >
                    <span className="sub-heading">Send me a message </span>
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
                            style={{
                                color: "lime",
                                borderColor: "lime",
                            }}
                            onClick={handleClick}
                        >
                            Send
                        </Button>
                        <Snackbar
                            id="success-snackbar"
                            open={openSuccess}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert severity="success">
                                Message sent successfully
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            id="error-snackbar"
                            open={openError}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert severity="error">
                                Something went wrong, contact administrator
                            </Alert>
                        </Snackbar>
                        <Snackbar
                            id="warning-snackbar"
                            open={openWarning}
                            autoHideDuration={3000}
                            onClose={handleClose}
                        >
                            <Alert severity="warning">
                                Please fill in all fields before sending
                            </Alert>
                        </Snackbar>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default ContactMe;
