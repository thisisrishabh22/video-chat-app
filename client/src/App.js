import logo from "./logo.svg";
import "./App.css";
import { AppBar, Typography } from "@mui/material";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";

function App() {
  return (
    <div>
      <AppBar position="static" color="transparent" elevation>
        <Typography variant="h2" align="center" color="white">
          WeBVideo Chat
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
}

export default App;
