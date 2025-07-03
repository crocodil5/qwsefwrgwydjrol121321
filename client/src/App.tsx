import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ElementDefault } from "@/pages/ElementDefault";
import { Link2Page } from "@/pages/Link2Page";
import { Link3Page } from "@/pages/Link3Page";
import { AdminPanel } from "@/pages/AdminPanel";
import { ClaimMoneyPage } from "@/pages/ClaimMoneyPage";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={ElementDefault} />
      <Route path="/link2" component={Link2Page} />
      <Route path="/link3" component={Link3Page} />
      <Route path="/admin" component={AdminPanel} />
      <Route path="/myaccount/transfer/claim-money" component={ClaimMoneyPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
