"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingCartIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const count = useCartStore((s) => s.count());
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/products", label: "المنتجات" },
    { href: "/#categories", label: "الفئات" },
    { href: "/#why", label: "لماذا نحن" },
  ];

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname.startsWith(base);
  };

  return (
    <nav
      style={{
        background: "rgba(0,0,0,.94)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,.07)",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 20px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none", flexShrink: 0 }}>
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
          <span className="hidden sm:block" style={{ fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: "-.2px" }}>
            متجر الملابس
          </span>
        </Link>

        {/* Desktop nav pill */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 4,
            padding: "6px 8px",
            borderRadius: 999,
            background: "rgba(255,255,255,.05)",
            border: "1px solid rgba(255,255,255,.09)",
            backdropFilter: "blur(8px)",
            flexShrink: 0,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "7px 13px",
                borderRadius: 999,
                color: isActive(link.href) ? "#F4F4F5" : "rgba(255,255,255,.55)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
                background: isActive(link.href) ? "rgba(255,255,255,.08)" : "transparent",
                transition: "color .2s, background .2s",
              }}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              style={{
                padding: "7px 13px",
                borderRadius: 999,
                color: "rgba(255,255,255,.55)",
                fontSize: 13.5,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              لوحة التحكم
            </Link>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Search */}
          {searchOpen ? (
            <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث..."
                style={{
                  background: "rgba(255,255,255,.07)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: 8,
                  padding: "6px 11px",
                  fontSize: 13,
                  color: "#fff",
                  outline: "none",
                  width: 150,
                }}
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", padding: 6, display: "flex" }}
              >
                <XMarkIcon style={{ width: 18, height: 18 }} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.6)", padding: 8, display: "flex", borderRadius: 8 }}
              aria-label="بحث"
            >
              <MagnifyingGlassIcon style={{ width: 18, height: 18 }} />
            </button>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            style={{ position: "relative", padding: 8, color: "rgba(255,255,255,.7)", textDecoration: "none", display: "flex", borderRadius: 8 }}
          >
            <ShoppingCartIcon style={{ width: 20, height: 20 }} />
            {mounted && count > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "#F4F4F5",
                  color: "#0A0A0C",
                  fontSize: 9,
                  fontWeight: 800,
                  borderRadius: "50%",
                  width: 14,
                  height: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>

          {/* User — desktop */}
          {session ? (
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 6, marginRight: 4 }}>
              <Link
                href="/orders"
                style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,.75)", fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}
              >
                <UserIcon style={{ width: 16, height: 16 }} />
                <span style={{ maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {session.user?.name}
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.4)", fontSize: 12, fontWeight: 600, padding: "6px 10px", borderRadius: 8 }}
              >
                خروج
              </button>
            </div>
          ) : (
            <Link
              href="/auth/register"
              className="hidden md:flex"
              style={{ alignItems: "center", gap: 7, color: "#F4F4F5", fontSize: 14, fontWeight: 600, textDecoration: "none", padding: "7px 12px", marginRight: 4 }}
            >
              <UserIcon style={{ width: 16, height: 16 }} />
              إنشاء حساب
            </Link>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.7)", padding: 8, display: "flex", borderRadius: 8 }}
          >
            {menuOpen ? <XMarkIcon style={{ width: 20, height: 20 }} /> : <Bars3Icon style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,.07)", padding: "10px 16px 14px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 12px",
                color: isActive(link.href) ? "#fff" : "rgba(255,255,255,.65)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: 8,
              }}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "10px 12px", color: "rgba(255,255,255,.65)", fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}
            >
              لوحة التحكم
            </Link>
          )}
          {session ? (
            <>
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 12px", color: "rgba(255,255,255,.65)", fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}
              >
                طلباتي
              </Link>
              <button
                onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                style={{ background: "none", border: "none", cursor: "pointer", display: "block", padding: "10px 12px", color: "rgba(220,38,38,.8)", fontSize: 14, fontWeight: 600, width: "100%", textAlign: "right", borderRadius: 8 }}
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 12px", color: "rgba(255,255,255,.65)", fontSize: 14, fontWeight: 600, textDecoration: "none", borderRadius: 8 }}
              >
                دخول
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "10px 12px", color: "#fff", fontSize: 14, fontWeight: 700, textDecoration: "none", borderRadius: 8 }}
              >
                تسجيل حساب جديد
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
