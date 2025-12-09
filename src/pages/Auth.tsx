import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, register } from "@/store/slices/authSlice";
import { toast } from "sonner";
import { ArrowLeft, Mail, Lock, User, Sparkles, Zap, Shield, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(loginData)).unwrap();
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      // Error already handled by effect
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(registerData)).unwrap();
      toast.success("Account created successfully! 🎉");
      navigate("/dashboard");
    } catch (err) {
      // Error already handled by effect
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 bg-gradient-glow pointer-events-none" />
      <div className="fixed top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-primary-light/20 rounded-full blur-3xl animate-pulse delay-700" />
      
      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="backdrop-blur-xl bg-background/50 border border-border/50 hover:bg-background/80 hover:border-primary/30 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding & Features */}
          <div className="hidden md:block space-y-8">
            {/* Logo & Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-glow">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-40" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    LynkBin
                  </h1>
                  <p className="text-muted-foreground">Your Knowledge Hub</p>
                </div>
              </div>
              
              <p className="text-lg text-foreground/80 max-w-md">
                Save, organize, and rediscover your best content from LinkedIn, X, and more. 
                Never lose track of valuable insights again.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI-Powered Organization</h3>
                  <p className="text-sm text-muted-foreground">Automatic categorization and tagging with Gemini AI</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Lightning Fast Search</h3>
                  <p className="text-sm text-muted-foreground">Find any link instantly with powerful filters</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Your data is encrypted and belongs to you</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="w-full max-w-md mx-auto">
            {/* Mobile Logo */}
            <div className="md:hidden text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary-light to-primary-dark flex items-center justify-center shadow-glow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-40" />
                </div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LynkBin
              </h1>
              <p className="text-muted-foreground mt-1">Your Knowledge Hub</p>
            </div>

            {/* Auth Card */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-primary rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              
              <div className="relative bg-card/80 backdrop-blur-xl rounded-2xl shadow-glow p-8 border border-border/50">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 bg-muted/50 p-1">
                    <TabsTrigger 
                      value="login"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger 
                      value="register"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-all duration-300"
                    >
                      Register
                    </TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login" className="mt-0">
                    <form onSubmit={handleLogin} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="pl-11 h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="login-password"
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="pl-11 pr-11 h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {showLoginPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-primary via-primary-light to-primary-dark hover:shadow-glow transition-all duration-300 text-base font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Logging in...</span>
                          </div>
                        ) : (
                          "Login to Dashboard"
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register" className="mt-0">
                    <form onSubmit={handleRegister} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="register-name" className="text-sm font-medium">
                          Full Name
                        </Label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="John Doe"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            className="pl-11 h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email" className="text-sm font-medium">
                          Email Address
                        </Label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="you@example.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="pl-11 h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                          <Input
                            id="register-password"
                            type={showRegisterPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="pl-11 pr-11 h-12 bg-background/50 border-border/50 focus:border-primary transition-all duration-300"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            {showRegisterPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-gradient-to-r from-primary via-primary-light to-primary-dark hover:shadow-glow transition-all duration-300 text-base font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            <span>Creating account...</span>
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                {/* Footer text */}
                <p className="text-center text-sm text-muted-foreground mt-6">
                  By continuing, you agree to our{" "}
                  <button
                    onClick={() => navigate("/privacy")}
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

