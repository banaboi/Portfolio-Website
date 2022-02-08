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

const sendMail = (
    firstName: string,
    lastName: string,
    email: string,
    message: string
): string => {
    console.log("sending email");

    if (firstName === "" || lastName === "" || email === "" || message === "")
        return "warning";

    const mailToSend: any = {
        from_name: firstName + " " + lastName,
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

const useStyles: any = makeStyles({
    input: {
        color: "white",
        backgroundColor: "white",
    },
});

const ContactMe = () => {
    const classes = useStyles;
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);

    const handleClick = () => {
        let result = sendMail(firstName, lastName, email, message);
        switch (result) {
            case "success":
                setOpenSuccess(true);
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
            case "#firstName":
                setFirstName(e.target.value);
                break;
            case "#lastName":
                setLastName(e.target.value);
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
            <Container className="section">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                    }}
                >
                    <h2 className="sub-heading">Send me a message </h2>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="#firstName"
                                    required
                                    fullWidth
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={handleChange}
                                    InputProps={{ className: classes.input }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="#lastName"
                                    required
                                    fullWidth
                                    label="Last Name"
                                    value={lastName}
                                    onChange={handleChange}
                                    InputProps={{ className: classes.input }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="#email"
                                    required
                                    fullWidth
                                    label="Email Address"
                                    value={email}
                                    onChange={handleChange}
                                    InputProps={{ className: classes.input }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="#message"
                                    required
                                    multiline
                                    fullWidth
                                    rows={8}
                                    label="Message"
                                    value={message}
                                    onChange={handleChange}
                                    InputProps={{ className: classes.input }}
                                />
                            </Grid>
                        </Grid>
                        <Button
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
