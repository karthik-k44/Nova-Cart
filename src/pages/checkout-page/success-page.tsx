import Container from '../../components/container';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../components/button';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Order placed successfully!
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        Thank you for your purchase. A confirmation email is on its way. You can
        continue shopping anytime.
      </p>
      <Link to="/" className="mt-6">
        <Button>Continue shopping</Button>
      </Link>
    </Container>
  );
}

export default SuccessPage;
