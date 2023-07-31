import AuthForm from '@/components/form/auth-form';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account!</CardTitle>
          <CardDescription>
            Enter your email below to create your account.
          </CardDescription>
        </CardHeader>
        <AuthForm type="register" />
      </Card>
    </div>
  );
};

export default Register;
