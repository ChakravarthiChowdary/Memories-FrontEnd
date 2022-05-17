import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useState, Dispatch, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../store/store";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useDispatch } from "react-redux";
import {
  AUTH_CLEAN_UPDATE_PROFILE_STATE,
  updateProfile,
} from "../store/actions/authActions";
import { LoadingButton } from "@mui/lab";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const {
    user,
    updateProfileLoading,
    updateProfileError,
    updateProfileSuccess,
  } = useAppSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState(user?.username);
  const dispatch: Dispatch<any> = useDispatch();
  const [error, setError] = useState<null | string>(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  useEffect(() => {
    if (updateProfileError) {
      setOpen(true);
    }
  }, [updateProfileError]);

  useEffect(() => {
    if (updateProfileSuccess) {
      setOpen(true);
    }
  }, [updateProfileSuccess]);

  const resetForm = () => {
    setEditMode(false);
    setPassword("");
    setConfirmPassword("");
    setUsername(user?.username);
    setOpen(false);
    handleDialogClose();
  };

  const handleDialogClose = () => {
    resetForm();

    dispatch({ type: AUTH_CLEAN_UPDATE_PROFILE_STATE });
  };

  const proceedClickedHandler = () => {
    dispatch(
      updateProfile({
        username: username ? username : "",
        passwordUpdated,
        password,
        confirmPassword,
        id: user ? user?.id : "",
      })
    );
    setDialogOpen(false);
  };

  const modifyClickedHandler = () => {
    let passwordChanged = false;
    if (password !== "") {
      setPasswordUpdated(true);
      passwordChanged = true;
    }

    if (username !== "") {
      if (passwordChanged) {
        if (password === confirmPassword) {
          setDialogOpen(true);
        } else {
          setOpen(true);
          setError("Confirm password should be same as password.");
        }
      } else if (username !== user?.username) {
        setDialogOpen(true);
      } else {
        setOpen(true);
        setError("Nothing changed to update profile.");
      }
    } else {
      setOpen(true);
      setError("Nothing changed to update profile.");
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: AUTH_CLEAN_UPDATE_PROFILE_STATE });
    setOpen(false);
    setError(null);
    setEditMode(false);
    resetForm();
  };

  return (
    <>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Paper sx={{ width: "100%", height: "100%", p: 3 }}>
          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid item xs={12} sm={12} md={6}>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user ? user.photoUrl : ""}
                  sx={{ width: "50vh", height: "50vh", mb: 3 }}
                />
                <Button>Change Photo</Button>
              </Container>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <TextField
                value={username}
                label="My Name"
                fullWidth
                sx={{ mb: 4 }}
                disabled={!editMode}
                InputLabelProps={{
                  style: { fontFamily: "poppins", fontSize: 17 },
                }}
                InputProps={{
                  style: { fontFamily: "poppins", fontSize: 20 },
                }}
                onChange={(e) => setUsername(e.target.value)}
              />

              <TextField
                value={user?.email}
                label="My Email"
                fullWidth
                sx={{ mb: 4 }}
                focused
                disabled
                InputLabelProps={{
                  style: { fontFamily: "poppins", fontSize: 17 },
                }}
                InputProps={{
                  style: { fontFamily: "poppins", fontSize: 20 },
                }}
              />
              {editMode && (
                <>
                  <TextField
                    value={password}
                    label="New password"
                    fullWidth
                    sx={{ mb: 4 }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins", fontSize: 17 },
                    }}
                    InputProps={{
                      style: { fontFamily: "poppins", fontSize: 20 },
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <TextField
                    value={confirmPassword}
                    label="Confirm password"
                    fullWidth
                    sx={{ mb: 4 }}
                    InputLabelProps={{
                      style: { fontFamily: "poppins", fontSize: 17 },
                    }}
                    InputProps={{
                      style: { fontFamily: "poppins", fontSize: 20 },
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </>
              )}
              <LoadingButton
                variant="outlined"
                startIcon={!editMode && <ModeEditIcon />}
                onClick={
                  !editMode ? () => setEditMode(true) : modifyClickedHandler
                }
                loading={updateProfileLoading}
              >
                {editMode ? "Modify" : "Edit Profile"}
              </LoadingButton>
              {editMode && (
                <Button color="error" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
      {(updateProfileError || error || updateProfileSuccess) && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Alert
            onClose={handleClose}
            severity={updateProfileSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {updateProfileError || error
              ? updateProfileError
                ? updateProfileError.message
                : error
              : "Profile update successful"}
          </Alert>
        </Snackbar>
      )}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Proceed to update profile ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Keep in mind that updating profile requires users to login again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancel</Button>
          <Button onClick={proceedClickedHandler} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Profile;
