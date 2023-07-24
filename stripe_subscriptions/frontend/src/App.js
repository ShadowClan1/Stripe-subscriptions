import logo from './logo.svg';
import './App.css';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import SubscriptionForm from './SubscriptionForm';
import Plans from './Plans';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51M4ns1SBx6KtlGUSdnIZL9ehhRylPddDkOoWuIl1DGLDHXm9FR4C3CSjNB9KOWgVLSJiKNbylvPl8s3s7dDtYJg200FK52NvMb');
function App() {




  return (
    <>

<Plans/>
    
    
    </>
  );
}

export default App;
