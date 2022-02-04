import React, { useState, ChangeEvent } from "react";
import useWindowDimensions from "../utilities/useWindowDimensions";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import "../styles/App.scss";
import emailjs from "@emailjs/browser";

const sendMail = (
    firstName: string,
    lastName: string,
    email: string,
    message: string
): void => {
    console.log("sending email");

    if (firstName === "" || lastName === "" || email === "" || message === "")
        return;

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
        });
};

const ContactMe = () => {
    const { height, width } = useWindowDimensions();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
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
            <Box
                sx={{
                    mt: 5,
                }}
            >
                <Container className="contactContainer">
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
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    color: "black",
                                    borderColor: "lime",
                                }}
                                onClick={() => {
                                    sendMail(
                                        firstName,
                                        lastName,
                                        email,
                                        message
                                    );
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default ContactMe;
