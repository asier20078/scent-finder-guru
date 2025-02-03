import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Routes from './Routes';

const queryClient = new QueryClient();

const initialPayPalOptions = {
  clientId: "test", // Replace with your PayPal client ID
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PayPalScriptProvider options={initialPayPalOptions}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PayPalScriptProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;