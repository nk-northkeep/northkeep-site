import { Router, Route, Switch } from "wouter";
import { routerBase } from "../../base-path";
import { CookieBanner } from "./components/CookieBanner";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <ErrorBoundary>
      <Router base={routerBase(import.meta.env.BASE_URL)}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/privacidade" component={Privacy} />
          <Route path="/privacidade.html" component={Privacy} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      <CookieBanner />
    </ErrorBoundary>
  );
}
