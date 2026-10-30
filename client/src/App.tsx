import { Router, Route, Switch } from "wouter";
import { routerBase } from "../../base-path";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ErrorBoundary>
      <Router base={routerBase(import.meta.env.BASE_URL)}>
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ErrorBoundary>
  );
}
