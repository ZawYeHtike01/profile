import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Stack,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Link,
  TextField,
} from "@mui/material";
import { FaLine } from "react-icons/fa";
import { EmailJSResponseStatus } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
import { Snackbar } from "@mui/material";
import { GitHub, Email, Launch } from "@mui/icons-material";
import { useRef } from "react";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { from } from "list";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00e676" },
    background: {
      default: "#0a1929",
      paper: "#132f4c",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b2bac2",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
    },
    h4: {
      fontWeight: 700,
      fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
    },
    h6: {
      fontSize: "1.05rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  shape: { borderRadius: 14 },
});

const Portfolio = () => {
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const [age, setAge] = React.useState(i18n.lng || "ja");
  const { t, si18n } = useTranslation();
  const projects = [
    {
      title: "BaitoKanri",
      desc: "Smart salary & shift management web app for students in Japan.",
      tags: ["React", "MUI", "Firebase"],
      link: "https://baitokanri.site/",
    },
  ];

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_gr7wgbo",
        "template_vlc8u3o",
        form.current,
        "PwR-v0D-srQ9_3__o",
      )
      .then(() => {
        setMsg("Email sent successfully!");
        setLoading(false);
        form.current.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setMsg("Failed to send email.");
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "rgba(10,25,41,0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
            <Typography fontWeight="bold" color="primary.main">
              {t("name")}
            </Typography>

            <Stack direction="row" spacing={1}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 60, textAlign: "center" }}
              >
                <Select
                  labelId="demo-simple-select-standard-label"
                  value={age}
                  onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                    setAge(e.target.value);
                  }}
                  label="Age"
                  disableUnderline
                  sx={{ textAlign: "center" }}
                >
                  <MenuItem value={"en"}>English</MenuItem>
                  <MenuItem value={"ja"}>日本語</MenuItem>
                </Select>
              </FormControl>
              <IconButton
                href="https://github.com/ZawYeHtike01"
                color="inherit"
              >
                <GitHub />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            pt: { xs: 10, md: 15 },
            pb: { xs: 8, md: 10 },
            textAlign: "center",
          }}
        >
          <Typography variant="overline" color="primary" letterSpacing={3}>
            {t("role")}
          </Typography>

          <Typography variant="h1" sx={{ mt: 2, mb: 3 }}>
            {t("heroTitle1")}
            <br /> {t("heroTitle2")}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 720,
              mx: "auto",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            {t("heroDesc")}{" "}
            <strong>
              <Link
                href="https://baitokanri.site/"
                target="_blank"
                underline="none"
                sx={{ color: "primary.main" }}
              >
                BaitoKanri
              </Link>
            </strong>
            .
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              onClick={() =>
                projectsRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              fullWidth={isMobile}
              variant="contained"
              size="large"
            >
              {t("viewProjects")}
            </Button>
            <Button
              onClick={() => {
                contactRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              fullWidth={isMobile}
              variant="outlined"
              size="large"
            >
              {t("contact")}
            </Button>
          </Stack>
        </Box>

        <Box sx={{ py: { xs: 6, md: 10 }, maxWidth: 900, mx: "auto" }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            {t("aboutTitle")}
          </Typography>
          <Typography color="text.secondary" lineHeight={1.8}>
            {t("aboutDesc")}
          </Typography>
        </Box>

        <Box ref={projectsRef} sx={{ py: { xs: 6, md: 10 } }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            {t("projectsTitle")}
          </Typography>

          <Grid container spacing={3}>
            {projects.map((p, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "primary.main",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="h6" fontWeight="bold">
                      {p.title}
                    </Typography>

                    <Typography color="text.secondary" sx={{ my: 2 }}>
                      {p.desc}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {p.tags.map((t) => (
                        <Chip key={t} label={t} size="small" />
                      ))}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ px: { xs: 3, md: 4 }, pb: 3 }}>
                    <Button
                      href={p.link}
                      fullWidth
                      endIcon={<Launch />}
                      sx={{
                        bgcolor: "rgba(0,230,118,0.1)",
                        color: "primary.main",
                      }}
                    >
                      {t("liveDemo")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            py: { xs: 6, md: 10 },
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
            {t("skillsTitle")}
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: `${t("frontend")}`,
                items: ["React", "MUI", "Responsive UI", "JavaScript (ES6+)"],
              },
              {
                title: `${t("backend")}`,
                items: ["Firebase", "REST API"],
              },
              {
                title: `${t("tools")}`,
                items: ["Git", "GitHub", "Vite", "Figma"],
              },
            ].map((skill) => (
              <Grid item xs={12} md={4} key={skill.title}>
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    p: { xs: 3, md: 4 },
                    transition: "0.3s",
                    "&:hover": {
                      borderColor: "primary.main",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    {skill.title}
                  </Typography>

                  <Stack spacing={1}>
                    {skill.items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box
          ref={contactRef}
          sx={{
            py: { xs: 6, md: 10 },
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 5, textAlign: "center" }}>
            {t("mail")}
          </Typography>

          <Box
            component="form"
            ref={form}
            onSubmit={sendEmail}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "80%", md: "50%" },
              gap: 3,
              justifyContent: "center",
              margin: "auto",
            }}
          >
            <TextField
              type="text"
              label="Your Name"
              name="user_name"
              required
            ></TextField>
            <TextField
              type="email"
              label="Your Email"
              name="user_email"
              required
            ></TextField>
            <TextField
              type="text"
              label="Message"
              name="message"
              multiline
              rows={4}
              required
            ></TextField>
            <Button
              variant="contained"
              type="submit"
              disabled={!form}
              size="large"
              fullWidth
            >
              {loading ? "Sending.." : "Submit"}
            </Button>
          </Box>
        </Box>
        <Box sx={{ py: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t("workTogether")}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            {t("openToWork")}
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              fullWidth={isMobile}
              variant="contained"
              size="large"
              startIcon={<FaLine/>}
              href="https://line.me/ti/p/_89mp8ymsX"
            >
              {t("contactMe")}
            </Button>
            <Button
              href="https://github.com/ZawYeHtike01"
              fullWidth={isMobile}
              variant="outlined"
              size="large"
              startIcon={<GitHub />}
            >
              GitHub
            </Button>
          </Stack>
        </Box>

        <Box sx={{ py: 4, textAlign: "center", opacity: 0.6 }}>
          <Typography variant="body2">
            © 2026 Zaw Ye Htike · React & MUI
          </Typography>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        open={Boolean(msg)}
        autoHideDuration={6000}
        onClose={() => setMsg(null)}
        message={msg}
      ></Snackbar>
    </ThemeProvider>
  );
};

export default Portfolio;
