import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./styles";
import firebase from "firebase";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      passwordConfirmation: null,
      signupError: null
    };
  }

  formIsValid = () => this.state.password === this.state.passwordConfirmation;

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
      case "password":
        this.setState({ password: e.target.value });
      case "passwordConfirmation":
        this.setState({ passwordConfirmation: e.target.value });
      default:
        break;
    }
  };

  submitSignup = e => {
    e.preventDefault();
    if (!this.formIsValid()) {
      this.setState({ signupError: "Passwords do not match!" });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        authRes => {
          const userObj = {
            email: authRes.user.email
          };
          firebase
            .firestore()
            .collection("users")
            .doc(this.state.email)
            .set(userObj)
            .then(
              () => {
                this.props.history.push("/");
              },
              dbErr => {
                console.log(dbErr);
                this.setState({ signupError: dbErr.message });
              }
            );
        },
        authErr => {
          console.log(authErr);
          this.setState({ signupError: authErr.message });
        }
      );
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={e => {
                this.submitSignup(e);
              }}
              className={classes.form}
            >
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-email-input">
                  Enter your email
                </InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  onChange={e => this.userTyping("email", e)}
                  id="signup-email-input"
                ></Input>
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-password-input">
                  Create A Password
                </InputLabel>
                <Input
                  type="password"
                  id="signup-password-input"
                  onChange={e => this.userTyping("password", e)}
                ></Input>
              </FormControl>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="signup-password-confirmation-input">
                  Confirm Your Password
                </InputLabel>
                <Input
                  type="password"
                  id="signup-password-confirmation-input"
                  onChange={e => this.userTyping("passwordConfirmation", e)}
                ></Input>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
            {this.state.signupError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="h6"
              >
                {this.state.signupError}
              </Typography>
            ) : null}
            <Typography
              component="h5"
              variant="h6"
              className={classes.hasAccountHeader}
            >
              Already Have An Account?
            </Typography>
            <Link to="/login" className={classes.logInLink}>
              Log In!
            </Link>
          </Paper>
        </CssBaseline>
      </main>
    );
  }
}

export default withStyles(styles)(Signup);
