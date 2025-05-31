
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User, Phone } from 'lucide-react';

interface SignInForm {
  email: string;
  password: string;
}

interface SignUpForm {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const signInForm = useForm<SignInForm>();
  const signUpForm = useForm<SignUpForm>();

  const handleSignIn = async (data: SignInForm) => {
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      navigate('/');
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    const { error } = await signUp(data.email, data.password, data.fullName, data.phone);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Account created successfully! Please check your email to verify your account.",
      });
      setIsSignUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AutoSplit</h1>
          <p className="text-gray-600">
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        {!isSignUp ? (
          <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
              <FormField
                control={signInForm.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signInForm.control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Sign In
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...signUpForm}>
            <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
              <FormField
                control={signUpForm.control}
                name="fullName"
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          placeholder="Enter your phone number"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={signUpForm.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        )}

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <Button
            variant="link"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-purple-600 hover:text-purple-800"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
