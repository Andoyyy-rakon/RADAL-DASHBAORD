import { useState } from "react";
import authAxios from "../api/authAxios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, LogIn } from "lucide-react";
import { assets } from "../assets/asset";
import SplashScreen from "../components/SplashScreen";

export default function Login() {
  const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAxios.post("/login", {
        username,
        password
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      setShowSplash(true);
      
      // Delay navigation to show the splash screen
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center bg-[#F5F7FB] dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      {showSplash && <SplashScreen />}
      
      {/* Background Logo "Hugging" the login card */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
        <img 
          src={assets.Ligtaslogo} 
          alt="" 
          className="w-[800px] h-[800px] object-contain rotate-12 scale-150"
        />
      </div>

      <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-8 shadow-2xl rounded-[2rem] w-full max-w-md border border-white dark:border-slate-700 transition-all">
        <div className="flex flex-col items-center mb-8">
          <div className=" w-20 p-3.5 rounded-2xl mb-4 shadow-xl shadow-yellow-500/20">
          <img src={assets.LigtasYellow} alt="" />
    
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Admin Login</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="text-slate-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Username"
              required
              className="block w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent transition-all font-bold"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="text-slate-400" size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              className="block w-full pl-12 pr-12 py-4 border border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-transparent transition-all font-bold"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#FACC15] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-[#FACC15] hover:bg-[#EAB308] text-slate-900 font-black py-4 px-4 rounded-2xl shadow-xl shadow-yellow-500/20 transition-all transform active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <div className="w-6 h-6 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Sign In</span>
                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-900 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#FACC15] rounded-full animate-pulse"></div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-black italic">Ligtas Dashboard</p>
            </div>
        </div>
      </div>
    </div>
  );
}
