import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import AuthForm from '@/components/form/auth-form';
import { Button } from '@/components/shared/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FiGithub } from 'react-icons/fi';
import { AiOutlineGoogle } from 'react-icons/ai';
import Label from '@/components/shared/Label';
import Input from '@/components/shared/Input';

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Chatty!</CardTitle>
          <CardDescription>Enter your credentials to login.</CardDescription>
        </CardHeader>
        <AuthForm type="login" />
      </Card>
    </div>
  );
};

export default Login;
