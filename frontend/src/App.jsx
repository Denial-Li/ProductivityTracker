import "./App.css";
import QuestsPage from "./components/QuestPage.jsx";
import Login from "./components/Login";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import GetStarted from "./components/GetStarted";
import SelectHabits from "./components/SelectHabits";
import JoinFriends from "./components/JoinFriends";
import CreateGroup from "./components/CreateGroup";
import JoinGroup from "./components/JoinGroup";
import HomePage from "./components/HomePage";
import DuelsPage from "./components/DuelsPage";
import CreateDuel from "./components/CreateDuel";
import ProfilePageNEW from "./components/ProfilePage";
import GroupsPage from "./components/GroupsPage";
import RanksPage from "./components/RanksPage";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import AddQuest from "./components/AddQuests";

const onboardingPaths = new Set([
  "/get-started",
  "/select-habits",
  "/join-friends",
  "/create-group",
  "/join-group",
]);

const readStoredUser = () => {
  const raw = localStorage.getItem("duelhabit:user");
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to parse stored user", err);
    localStorage.removeItem("duelhabit:user");
    return null;
  }
};

function App() {
  const location = useLocation();
  const user = readStoredUser();

  const isAuthenticated = Boolean(user?.id || user?.email);
  const hasCompletedOnboarding =
    localStorage.getItem("duelhabit:onboardingComplete") === "true";

  const isOnboardingRoute = onboardingPaths.has(location.pathname);

  const showNav = isAuthenticated && hasCompletedOnboarding;

  return (
    <>
      <Routes>
        {/* Root: decide where to send them */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <Navigate to="/home" replace />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Auth screens (accessible when NOT logged in) */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to={hasCompletedOnboarding ? "/home" : "/get-started"} replace />
              : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated
              ? <Navigate to={hasCompletedOnboarding ? "/home" : "/get-started"} replace />
              : <Signup />
          }
        />

        {/* Onboarding routes (must be logged in) */}
        <Route
          path="/get-started"
          element={
            isAuthenticated ? <GetStarted /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/select-habits"
          element={
            isAuthenticated ? <SelectHabits /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/join-friends"
          element={
            isAuthenticated ? <JoinFriends /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/create-group"
          element={
            isAuthenticated ? <CreateGroup /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/join-group"
          element={
            isAuthenticated ? <JoinGroup /> : <Navigate to="/login" replace />
          }
        />

        {/* Main app routes (must be logged in AND done with onboarding) */}
        <Route
          path="/home"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <HomePage />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/quests"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <QuestsPage />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/duels"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <DuelsPage />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/duels/new"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <CreateDuel />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <ProfilePageNEW />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/groups"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <GroupsPage />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/ranks"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <RanksPage />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/add-quest"
          element={
            isAuthenticated
              ? hasCompletedOnboarding
                ? <AddQuest />
                : <Navigate to="/get-started" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showNav && <Navigation />}
    </>
  );
}

export default App;



/*
function App() {
  const [count, setCount] = useState(0)

  return <QuestsPage />
}

export default App*/
