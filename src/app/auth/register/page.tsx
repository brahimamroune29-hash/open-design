"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import toast from "react-hot-toast";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const passwordStrength = form.password.length === 0 ? 0
    : form.password.length < 6 ? 1
    : form.password.length < 10 ? 2
    : 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "حدث خطأ في إنشاء الحساب");
        return;
      }
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      toast.success("تم إنشاء حسابك بنجاح! 🎉");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("حدث خطأ في الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-purple-700 to-indigo-600 items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 start-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 end-1/4 w-32 h-32 bg-indigo-300/20 rounded-full blur-xl" />
        <div className="text-center text-white relative z-10 p-12">
          <div className="text-7xl mb-6">🎉</div>
          <h2 className="text-3xl font-bold mb-4">انضم إلى عائلتنا!</h2>
          <p className="text-indigo-100 max-w-xs leading-relaxed">
            أنشئ حسابك مجاناً واستمتع بتجربة تسوق رائعة مع أفضل الأسعار والعروض الحصرية
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: "🚚", label: "شحن مجاني" },
              { icon: "✅", label: "جودة مضمونة" },
              { icon: "💳", label: "دفع عند الاستلام" },
              { icon: "🔄", label: "إرجاع سهل" },
            ].map((f) => (
              <div key={f.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="text-xs text-indigo-100">{f.label}</div>
              </div>
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
            <h1 className="text-3xl font-bold text-gray-900">إنشاء حساب جديد</h1>
            <p className="text-gray-500 mt-2">انضم إلينا وتمتع بأفضل تجربة تسوق</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="الاسم الكامل"
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="أدخل اسمك الكامل"
                required
              />
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

              <div>
                <div className="relative">
                  <Input
                    label="كلمة المرور"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="6 أحرف على الأقل"
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
                {/* Password strength */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            passwordStrength >= i
                              ? i === 1 ? "bg-red-400" : i === 2 ? "bg-yellow-400" : "bg-green-500"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${passwordStrength === 1 ? "text-red-500" : passwordStrength === 2 ? "text-yellow-600" : "text-green-600"}`}>
                      {passwordStrength === 1 ? "كلمة مرور ضعيفة" : passwordStrength === 2 ? "كلمة مرور متوسطة" : "كلمة مرور قوية ✓"}
                    </p>
                  </div>
                )}
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 flex items-start gap-2">
                <CheckCircleIcon className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                بإنشاء الحساب توافق على شروط الخدمة وسياسة الخصوصية
              </p>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-60 shadow-lg shadow-indigo-200 text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإنشاء...
                  </span>
                ) : "إنشاء الحساب مجاناً"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="border-t border-gray-100" />
            </div>

            <p className="text-center text-sm text-gray-500">
              لديك حساب بالفعل؟{" "}
              <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
                سجل دخولك
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
