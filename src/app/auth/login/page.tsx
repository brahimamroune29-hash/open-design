"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } else {
      toast.success("مرحباً بك! 👋");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-indigo-600 to-purple-700 items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 start-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 end-1/4 w-32 h-32 bg-purple-300/20 rounded-full blur-xl" />
        <div className="text-center text-white relative z-10 p-12">
          <div className="text-7xl mb-6">👔</div>
          <h2 className="text-3xl font-bold mb-4">أهلاً بعودتك!</h2>
          <p className="text-indigo-100 max-w-xs leading-relaxed">
            سجّل دخولك للوصول إلى حسابك وتتبع طلباتك والاستمتاع بأفضل عروض الملابس
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm">
            {["✓ شحن سريع لجميع المناطق", "✓ دفع آمن عند الاستلام", "✓ ضمان جودة 100%"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-indigo-100">{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">م</span>
              </div>
              <span className="text-xl font-bold text-gray-900">متجر الملابس</span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">تسجيل الدخول</h1>
            <p className="text-gray-500 mt-2">أدخل بيانات حسابك للمتابعة</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="البريد الإلكتروني"
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                dir="ltr"
                required
              />

              <div className="relative">
                <Input
                  label="كلمة المرور"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-[38px] text-gray-400 hover:text-gray-700 p-1"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-indigo-200 text-base mt-2"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الدخول...
                  </span>
                ) : "دخول"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="border-t border-gray-100" />
            </div>

            <p className="text-center text-sm text-gray-500">
              ليس لديك حساب؟{" "}
              <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-700 font-bold">
                سجل الآن مجاناً
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
