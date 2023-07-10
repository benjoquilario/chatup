import { BsFillChatLeftDotsFill } from 'react-icons/bs';
import AuthForm from '@/components/form/AuthForm';

const Auth = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-background-800 shadow-background-800 max-h-md min-h-[450px] h-auto max-w-md w-full overflow-hidden rounded-sm py-8 md:py-10 px-6 md:px-8 mx-4">
        <div className="flex flex-col">
          <BsFillChatLeftDotsFill
            aria-hidden="true"
            className="text-[#c9cad1] w-10 h-10 mb-2"
          />
          <h2 className="text-[#c9cad1] text-left font-semibold text-lg md:text-2xl">
            Welcome to Chatty
          </h2>
          <p className="text-[#747689] text-left text-sm mt-2">
            Enter your credentials to login
          </p>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Auth;
