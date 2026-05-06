import { useState } from "react";

import { AuthProvider } from "./auth/AuthContext";
import { useAuth } from "./auth/useAuth";
import { LandingPage } from "./auth/LandingPage";
import { LoginPage } from "./auth/LoginPage";
import { SignupPage } from "./auth/SignupPage";
import { EmailVerifyPage } from "./auth/EmailVerifyPage";
import SolutionApp from "./SolutionApp";

const ROUTE = {
  landing: "landing",
  login: "login",
  signup: "signup",
  verify: "verify",
};

function PublicRouter() {
  const [route, setRoute] = useState(ROUTE.landing);
  const [pending, setPending] = useState(null);

  if (route === ROUTE.login) {
    return (
      <LoginPage
        onSwitchToSignup={() => setRoute(ROUTE.signup)}
        onSwitchToLanding={() => setRoute(ROUTE.landing)}
      />
    );
  }
  if (route === ROUTE.signup) {
    return (
      <SignupPage
        onPendingVerification={(p) => { setPending(p); setRoute(ROUTE.verify); }}
        onSwitchToLogin={() => setRoute(ROUTE.login)}
        onSwitchToLanding={() => setRoute(ROUTE.landing)}
      />
    );
  }
  if (route === ROUTE.verify) {
    if (!pending) {
      return (
        <SignupPage
          onPendingVerification={(p) => { setPending(p); setRoute(ROUTE.verify); }}
          onSwitchToLogin={() => setRoute(ROUTE.login)}
          onSwitchToLanding={() => setRoute(ROUTE.landing)}
        />
      );
    }
    return (
      <EmailVerifyPage
        pending={pending}
        onUpdatePending={setPending}
        onCancel={() => { setPending(null); setRoute(ROUTE.signup); }}
      />
    );
  }
  return (
    <LandingPage
      onLogin={() => setRoute(ROUTE.login)}
      onSignup={() => setRoute(ROUTE.signup)}
    />
  );
}

function Router() {
  const { user } = useAuth();
  return user ? <SolutionApp /> : <PublicRouter />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
