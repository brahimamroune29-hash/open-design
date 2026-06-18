import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,.07)", background: "#000" }}>
      <div
        className="grid grid-cols-2 md:grid-cols-4"
        style={{ maxWidth: 1180, margin: "0 auto", padding: "60px 20px 0", gap: 40 }}
      >
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.16)",
                background: "radial-gradient(circle at 35% 30%,#2a2a2e,#0c0c0e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" fill="#F4F4F5" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: "#fff" }}>متجر الملابس</span>
          </div>
          <p style={{ margin: "18px 0 0", color: "rgba(255,255,255,.5)", fontSize: 14.5, lineHeight: 1.85, maxWidth: 300 }}>
            نقدم أفضل الملابس العصرية بأسعار مناسبة مع ضمان الجودة وشحن سريع لجميع المناطق.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            {/* Instagram */}
            <a
              href="#"
              style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", textDecoration: "none" }}
              aria-label="انستاجرام"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="#"
              style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", textDecoration: "none" }}
              aria-label="تويتر"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M18.2 2H21l-6.5 7.4L22 22h-6.2l-4.9-6.4L5.3 22H2.5l7-8L2 2h6.3l4.4 5.9Zm-1 18h1.6L7.9 3.7H6.2Z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="#"
              style={{ width: 40, height: 40, borderRadius: 11, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.7)", textDecoration: "none" }}
              aria-label="واتساب"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.4 8.4 0 0 1-1 4 8.5 8.5 0 0 1-7.5 4.5 8.4 8.4 0 0 1-4-1L3 20l1-3.5a8.4 8.4 0 0 1-1-4A8.5 8.5 0 0 1 7.5 5 8.4 8.4 0 0 1 11.5 4 8.5 8.5 0 0 1 21 11.5Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 18, color: "#fff" }}>روابط سريعة</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { href: "/products", label: "جميع المنتجات" },
              { href: "/products?category=men", label: "ملابس رجالية" },
              { href: "/products?category=women", label: "ملابس نسائية" },
              { href: "/products?category=kids", label: "ملابس أطفال" },
              { href: "/products?featured=true", label: "العروض المميزة" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none", transition: "color .2s" }}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Account */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 18, color: "#fff" }}>حسابي</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              { href: "/auth/login", label: "تسجيل الدخول" },
              { href: "/auth/register", label: "إنشاء حساب" },
              { href: "/orders", label: "طلباتي" },
              { href: "/cart", label: "سلة التسوق" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: "rgba(255,255,255,.5)", fontSize: 14, textDecoration: "none" }}
                className="hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 18, color: "#fff" }}>تواصل معنا</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, color: "rgba(255,255,255,.5)", fontSize: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 7 9 6 9-6" />
              </svg>
              info@store.com
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2Z" />
              </svg>
              <span dir="ltr">+966 5X XXX XXXX</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              الأحد - الخميس، 9 ص - 6 م
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
              الرياض، المملكة العربية السعودية
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1180,
          margin: "48px auto 0",
          padding: "22px 20px",
          borderTop: "1px solid rgba(255,255,255,.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ color: "rgba(255,255,255,.4)", fontSize: 13.5 }}>
          © {new Date().getFullYear()} متجر الملابس — جميع الحقوق محفوظة
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, color: "rgba(255,255,255,.5)", fontSize: 13.5 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
            </svg>
            الدفع عند الاستلام
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5Z" />
            </svg>
            شحن آمن
          </span>
        </div>
      </div>
      <div style={{ height: 30 }} />
    </footer>
  );
}
