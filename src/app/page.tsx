import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseProductArrays } from "@/lib/utils";
import DarkProductCard from "@/components/home/DarkProductCard";
import HomeRevealEffect from "@/components/home/HomeRevealEffect";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    return products.map(parseProductArrays);
  } catch {
    return [];
  }
}

const categories = [
  {
    key: "men",
    name: "رجال",
    sub: "أزياء عصرية",
    delay: 0,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.4 14.5 16 10V4.5a2 2 0 0 0-2-2h-1.5a2.5 2.5 0 0 1-5 0H6a2 2 0 0 0-2 2V10l-1.6 4.5a1 1 0 0 0 .6 1.3L6 17v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3l3-.7a1 1 0 0 0 .6-1.3Z" />
      </svg>
    ),
  },
  {
    key: "women",
    name: "نساء",
    sub: "أناقة وجمال",
    delay: 80,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2c0 2 1 3 1 4s-1 1.5-1 3 2 2 2 4-3 2.5-3 4 1.5 2 1.5 3" />
        <path d="M9 9c-2 2-5 4-5 8a8 8 0 0 0 16 0c0-4-3-6-5-8" />
      </svg>
    ),
  },
  {
    key: "kids",
    name: "أطفال",
    sub: "ملابس مريحة",
    delay: 160,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h.01" />
        <path d="M15 12h.01" />
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M12 3a9 9 0 1 0 9 9c0-1.7-1.3-3-3-3-1 0-1.8.6-2.2 1.4" />
      </svg>
    ),
  },
  {
    key: "accessories",
    name: "إكسسوارات",
    sub: "إضافة الإطلالة",
    delay: 240,
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

const whyCards = [
  {
    delay: 0,
    title: "أسعار منافسة",
    desc: "أفضل الأسعار مع عروض وخصومات دورية لعملائنا.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    delay: 100,
    title: "جودة مضمونة",
    desc: "منتجات ذات جودة عالية مع ضمان الاسترجاع خلال 14 يوم.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.5l2 2 4-4.5" />
        <path d="M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5Z" />
      </svg>
    ),
  },
  {
    delay: 200,
    title: "شحن سريع",
    desc: "توصيل لجميع المناطق خلال 3-5 أيام عمل بشكل آمن.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17h4V5H2v12h2" />
        <path d="M14 9h4l4 4v4h-2" />
        <path d="M10 17h6" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div style={{ background: "#000", color: "#F4F4F5", overflowX: "hidden" }}>
      <HomeRevealEffect />

      {/* ===== HERO ===== */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px 0" }}>
        <div
          style={{
            position: "relative",
            borderRadius: 30,
            overflow: "hidden",
            minHeight: 620,
            background: "#0A0A0C",
            border: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {/* Glows */}
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-6%",
              width: "62%",
              height: "78%",
              background: "radial-gradient(closest-side,rgba(206,214,196,.22),rgba(150,165,150,.08),transparent 72%)",
              filter: "blur(6px)",
              animation: "mfGlow 7s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-20%",
              left: "-8%",
              width: "50%",
              height: "60%",
              background: "radial-gradient(closest-side,rgba(150,160,175,.12),transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(120% 90% at 50% 8%,transparent,rgba(0,0,0,.5))",
            }}
          />

          {/* SVG connecting lines */}
          <svg
            viewBox="0 0 1140 646"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <path
              d="M120 178 C 320 70 820 70 1010 196"
              fill="none"
              stroke="rgba(255,255,255,.16)"
              strokeWidth={1}
              strokeDasharray={1300}
              style={{ animation: "mfDraw 2.4s cubic-bezier(.2,.8,.2,1) forwards" }}
            />
            <path
              d="M86 432 C 270 480 430 470 560 392"
              fill="none"
              stroke="rgba(255,255,255,.13)"
              strokeWidth={1}
              strokeDasharray={1300}
              style={{ animation: "mfDraw 2.4s cubic-bezier(.2,.8,.2,1) .2s forwards" }}
            />
            <path
              d="M1054 420 C 880 478 720 470 590 392"
              fill="none"
              stroke="rgba(255,255,255,.13)"
              strokeWidth={1}
              strokeDasharray={1300}
              style={{ animation: "mfDraw 2.4s cubic-bezier(.2,.8,.2,1) .3s forwards" }}
            />
          </svg>

          {/* Light streaks */}
          <div style={{ position: "absolute", left: "49%", bottom: "6%", width: 1, height: "34%", background: "linear-gradient(to top,rgba(255,255,255,.28),transparent)" }} />
          <div style={{ position: "absolute", left: "51.5%", bottom: "6%", width: 1, height: "26%", background: "linear-gradient(to top,rgba(255,255,255,.2),transparent)" }} />
          <div style={{ position: "absolute", left: "47%", bottom: "6%", width: 1, height: "22%", background: "linear-gradient(to top,rgba(255,255,255,.14),transparent)" }} />

          {/* Floating category nodes — hidden on small screens */}
          <div className="hidden lg:block" style={{ position: "absolute", top: "25%", left: "7%", textAlign: "center", animation: "mfFloatA 6s ease-in-out infinite" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3 21 19H3Z" /></svg>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F4F4F5" }}>نساء</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 1 }}>18 صنف</div>
          </div>

          <div className="hidden lg:block" style={{ position: "absolute", top: "28%", right: "6%", textAlign: "center", animation: "mfFloatB 7s ease-in-out infinite" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 3 3 3-3 3-3-3 3-3Z" /><path d="m12 15 3 3-3 3-3-3 3-3Z" />
                <path d="m3 12 3-3 3 3-3 3-3-3Z" /><path d="m15 12 3-3 3 3-3 3-3-3Z" />
              </svg>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F4F4F5" }}>رجال</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 1 }}>24 صنف</div>
          </div>

          <div className="hidden lg:block" style={{ position: "absolute", top: "60%", left: "6%", textAlign: "center", animation: "mfFloatB 6.6s ease-in-out infinite .3s" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" /><path d="m8 12 3 3 5-6" />
              </svg>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F4F4F5" }}>أطفال</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 1 }}>12 صنف</div>
          </div>

          <div className="hidden lg:block" style={{ position: "absolute", top: "58%", right: "7%", textAlign: "center", animation: "mfFloatA 7.2s ease-in-out infinite .2s" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", margin: "0 auto", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 2 2.5 6.5L21 9l-5 4 1.8 7L12 16l-5.8 4L8 13 3 9l6.5-.5Z" />
              </svg>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 5, justifyContent: "center" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F4F4F5" }}>إكسسوارات</span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", marginTop: 1 }}>8 أصناف</div>
          </div>

          {/* Center content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "60px 24px 110px",
              textAlign: "center",
              maxWidth: 840,
              margin: "0 auto",
            }}
          >
            {/* Play button */}
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                margin: "0 auto",
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                animation: "mfRise .7s cubic-bezier(.2,.8,.2,1) backwards",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F4F4F5" stroke="none">
                <path d="M8 5v14l11-7Z" />
              </svg>
            </div>

            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 28,
                padding: "7px 15px",
                borderRadius: 999,
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.12)",
                fontSize: 13,
                fontWeight: 600,
                color: "#E9E9EC",
                animation: "mfRise .7s cubic-bezier(.2,.8,.2,1) .06s backwards",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#CFE0BE",
                  boxShadow: "0 0 0 4px rgba(207,224,190,.18)",
                }}
              />
              جديد — مجموعة صيف 2025
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
              </svg>
            </div>

            {/* Heading */}
            <h1
              style={{
                margin: "20px 0 0",
                fontWeight: 800,
                fontSize: "clamp(44px,8vw,74px)",
                lineHeight: 1.04,
                letterSpacing: "-2px",
                color: "#FFFFFF",
                animation: "mfRise .7s cubic-bezier(.2,.8,.2,1) .12s backwards",
              }}
            >
              أناقتك{" "}
              <span
                style={{
                  background: "linear-gradient(180deg,rgba(255,255,255,.95),rgba(255,255,255,.34))",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                بنقرة واحدة
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                margin: "20px auto 0",
                maxWidth: 560,
                color: "rgba(255,255,255,.6)",
                fontSize: 18,
                lineHeight: 1.8,
                fontWeight: 500,
                animation: "mfRise .7s cubic-bezier(.2,.8,.2,1) .18s backwards",
              }}
            >
              اكتشف مجموعتنا من الملابس العصرية، حيث تلتقي الجودة العالية بالأسعار المناسبة وشحن سريع لكل المناطق.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                marginTop: 32,
                flexWrap: "wrap",
                animation: "mfRise .7s cubic-bezier(.2,.8,.2,1) .24s backwards",
              }}
            >
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "0 22px",
                  height: 50,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.07)",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                تسوق الآن
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" /><path d="M8 7h9v9" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#categories"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 26px",
                  height: 50,
                  borderRadius: 999,
                  background: "#F4F4F5",
                  color: "#0A0A0C",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                استكشف المزيد
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: "absolute", bottom: 26, left: 26, display: "flex", alignItems: "center", gap: 11, zIndex: 2 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,.18)",
                background: "rgba(255,255,255,.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                animation: "mfBob 2.4s ease-in-out infinite",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" /><path d="m19 12-7 7-7-7" />
              </svg>
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", fontWeight: 600 }}>01 / 03 · مرر للأسفل</div>
          </div>

          {/* Slide dots */}
          <div style={{ position: "absolute", bottom: 30, right: 26, textAlign: "left", zIndex: 2 }}>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.75)", fontWeight: 600 }}>أحدث المجموعات</div>
            <div style={{ display: "flex", gap: 6, marginTop: 9, justifyContent: "flex-end" }}>
              <span style={{ width: 34, height: 4, borderRadius: 99, background: "#fff" }} />
              <span style={{ width: 34, height: 4, borderRadius: 99, background: "rgba(255,255,255,.22)" }} />
              <span style={{ width: 34, height: 4, borderRadius: 99, background: "rgba(255,255,255,.22)" }} />
            </div>
          </div>
        </div>

        {/* Payment methods strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 44, padding: "36px 0 4px", opacity: 0.55 }}>
          {["mada", "VISA", "mastercard", "Apple Pay", "stc pay", "tabby", "tamara"].map((m) => (
            <span key={m} style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: ".3px" }}>{m}</span>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section id="categories" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 20px 0" }}>
        <div
          data-reveal
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,.4)" }}>الفئات</div>
            <h2 style={{ margin: "10px 0 0", fontSize: 40, fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>تسوق حسب الفئة</h2>
          </div>
          <p style={{ margin: 0, color: "rgba(255,255,255,.5)", fontSize: 16, maxWidth: 280 }}>
            اختر الفئة المناسبة وابدأ رحلة التسوق.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-10" style={{ gap: 18 }}>
          {categories.map((c) => (
            <Link
              key={c.key}
              href={`/products?category=${c.key}`}
              data-reveal
              data-delay={c.delay}
              className="hover:-translate-y-1.5 hover:border-white/20 hover:bg-[#141416]"
              style={{
                position: "relative",
                overflow: "hidden",
                textDecoration: "none",
                borderRadius: 20,
                padding: "26px 22px 22px",
                background: "#0E0E10",
                border: "1px solid rgba(255,255,255,.08)",
                display: "block",
                transition: "transform .25s cubic-bezier(.2,.8,.2,1), border-color .25s, background .25s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  left: -20,
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  background: "radial-gradient(closest-side,rgba(255,255,255,.07),transparent)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: 54,
                  height: 54,
                  borderRadius: 15,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {c.icon}
              </div>
              <div style={{ position: "relative", marginTop: 46, fontWeight: 800, fontSize: 20, color: "#fff" }}>{c.name}</div>
              <div style={{ position: "relative", color: "rgba(255,255,255,.5)", fontSize: 13.5, marginTop: 4 }}>{c.sub}</div>
              <div
                style={{
                  position: "relative",
                  marginTop: 18,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                تصفح
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section id="products" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 20px 0" }}>
        <div
          data-reveal
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,.4)" }}>المختارات</div>
            <h2 style={{ margin: "10px 0 0", fontSize: 40, fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>منتجات مميزة</h2>
          </div>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.14)",
              background: "rgba(255,255,255,.04)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            عرض الكل
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10" style={{ gap: 18 }}>
            {featured.map((product, i) => (
              <DarkProductCard key={product.id} product={product} delay={i * 80} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(255,255,255,.3)", fontSize: 15 }}>
            لا توجد منتجات مميزة حالياً.{" "}
            <Link href="/products" style={{ color: "rgba(255,255,255,.6)", textDecoration: "underline" }}>
              تصفح الكل
            </Link>
          </div>
        )}
      </section>

      {/* ===== WHY US ===== */}
      <section id="why" style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 20px 0" }}>
        <div data-reveal style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,.4)" }}>المزايا</div>
          <h2 style={{ margin: "10px 0 0", fontSize: 40, fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>لماذا تختارنا؟</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 mt-11" style={{ gap: 18 }}>
          {whyCards.map((card) => (
            <div
              key={card.title}
              data-reveal
              data-delay={card.delay}
              className="hover:-translate-y-1.5 hover:border-white/20"
              style={{
                background: "#0E0E10",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 18,
                padding: "34px 28px",
                transition: "transform .25s, border-color .25s",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ margin: "20px 0 0", fontSize: 20, fontWeight: 800, color: "#fff" }}>{card.title}</h3>
              <p style={{ margin: "10px 0 0", color: "rgba(255,255,255,.5)", fontSize: 14.5, lineHeight: 1.8 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ maxWidth: 1180, margin: "0 auto", padding: "96px 20px 0" }}>
        <div
          data-reveal
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            background: "#0A0A0C",
            border: "1px solid rgba(255,255,255,.08)",
            padding: "66px 48px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-30%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "120%",
              background: "radial-gradient(closest-side,rgba(206,214,196,.16),transparent 70%)",
              animation: "mfGlow 8s ease-in-out infinite",
            }}
          />
          <div style={{ position: "relative" }}>
            <h2 style={{ margin: 0, fontSize: 42, fontWeight: 800, letterSpacing: "-1px", color: "#fff" }}>
              ابدأ التسوق الآن
            </h2>
            <p
              style={{
                margin: "16px auto 0",
                maxWidth: 540,
                color: "rgba(255,255,255,.6)",
                fontSize: 17,
                lineHeight: 1.8,
              }}
            >
              سجّل حسابك واستمتع بأفضل عروض الملابس مع شحن مجاني على الطلبات فوق 200 ريال.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 30, flexWrap: "wrap" }}>
              <Link
                href="/auth/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 28px",
                  height: 52,
                  borderRadius: 999,
                  background: "#F4F4F5",
                  color: "#0A0A0C",
                  fontSize: 15,
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                إنشاء حساب مجاني
              </Link>
              <Link
                href="/products"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 28px",
                  height: 52,
                  borderRadius: 999,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.16)",
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                تصفح المنتجات
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 80 }} />
    </div>
  );
}
