import React, { useState, useRef, useEffect } from "react";

export interface CountryCode {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

const defaultCountries: CountryCode[] = [
  { code: "BD", dial: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "United States" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "IN", dial: "+91", flag: "🇮🇳", name: "India" },
  { code: "CA", dial: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "AU", dial: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France" },
  { code: "JP", dial: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dial: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China" },
  { code: "BR", dial: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "MY", dial: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "SG", dial: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "PK", dial: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "TR", dial: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Spain" },
];

interface PhoneInputProps {
  /** Label text above the input */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message below the input */
  error?: string;
  /** Phone number value */
  value?: string;
  /** Called with full number, dial code, phone */
  onChange?: (fullNumber: string, dialCode: string, phone: string) => void;
  /** Default country ISO code */
  defaultCountry?: string;
  /** Available countries for selection */
  countries?: CountryCode[];
  /** Input placeholder text */
  placeholder?: string;
  /** Disable the input */
  disabled?: boolean;
  /** HTML id attribute */
  id?: string;
  className?: string;
}

const transition = "all 0.18s cubic-bezier(0.34, 1.2, 0.64, 1)";

export const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  ({
  label,
  helperText,
  error,
  value,
  onChange,
  defaultCountry = "BD",
  countries = defaultCountries,
  placeholder = "1XX XXXX XXXX",
  disabled,
  id,
  className,
}, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-") || "phone-input";
  const [focused, setFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<CountryCode>(
    countries.find((c) => c.code === defaultCountry) || countries[0]
  );
  const [phone, setPhone] = useState(value || "");
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [dropdownOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9\s\-()]/g, "");
    setPhone(val);
    onChange?.(`${selected.dial}${val}`, selected.dial, val);
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelected(country);
    setDropdownOpen(false);
    setSearch("");
    onChange?.(`${country.dial}${phone}`, country.dial, phone);
  };

  const filtered = search
    ? countries.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dial.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase())
      )
    : countries;

  return (
    <div ref={ref} className={className} style={{ display: "flex", flexDirection: "column", gap: "7px", width: "100%" }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--neu-text-secondary)",
          }}
        >
          {label}
        </label>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderRadius: "14px",
          background: "var(--neu-bg)",
          boxShadow: focused
            ? "var(--neu-shadow-inset), 0 0 0 3px rgba(108,126,248,.18)"
            : error
              ? "var(--neu-shadow-inset), 0 0 0 2px rgba(248,124,108,.4)"
              : "var(--neu-shadow-inset)",
          transition: "box-shadow 0.2s ease",
          opacity: disabled ? 0.5 : 1,
          position: "relative",
        }}
      >
        {/* Country selector */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => setDropdownOpen((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "13px 8px 13px 14px",
              border: "none",
              outline: "none",
              cursor: disabled ? "not-allowed" : "pointer",
              background: "transparent",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "inherit",
              color: "var(--neu-text-primary)",
              borderRight: "2px solid rgba(0,0,0,0.06)",
              transition,
            }}
          >
            <span style={{ fontSize: "18px" }}>{selected.flag}</span>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--neu-text-secondary)" }}>
              {selected.dial}
            </span>
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" style={{ marginLeft: "2px" }}>
              <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 6px)",
                left: 0,
                zIndex: 50,
                width: "260px",
                maxHeight: "240px",
                overflowY: "auto",
                borderRadius: "14px",
                background: "var(--neu-bg)",
                boxShadow: "var(--neu-shadow-raised-lg)",
                padding: "6px",
                animation: "fadeUp 0.2s ease",
              }}
            >
              <input
                type="text"
                placeholder="Search country..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  marginBottom: "4px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  fontWeight: 600,
                  fontFamily: "inherit",
                  color: "var(--neu-text-primary)",
                  background: "var(--neu-bg)",
                  boxShadow: "var(--neu-shadow-inset-sm)",
                }}
              />
              {filtered.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleCountrySelect(c)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    padding: "8px 10px",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                    borderRadius: "10px",
                    background: selected.code === c.code ? "rgba(108,126,248,0.08)" : "transparent",
                    fontSize: "13px",
                    fontWeight: 600,
                    fontFamily: "inherit",
                    color: "var(--neu-text-primary)",
                    transition,
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{c.flag}</span>
                  <span style={{ flex: 1, textAlign: "left" }}>{c.name}</span>
                  <span style={{ fontSize: "12px", color: "var(--neu-text-muted)", fontWeight: 700 }}>
                    {c.dial}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone input */}
        <input
          id={inputId}
          type="tel"
          inputMode="tel"
          placeholder={placeholder}
          value={phone}
          onChange={handlePhoneChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "13px 16px 13px 12px",
            border: "none",
            outline: "none",
            fontFamily: "inherit",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--neu-text-primary)",
            background: "transparent",
          }}
        />
      </div>

      {error && (
        <p style={{ fontSize: "11px", fontWeight: 700, color: "var(--neu-danger)" }}>{error}</p>
      )}
      {helperText && !error && (
        <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--neu-text-muted)" }}>{helperText}</p>
      )}
    </div>
  );
});

PhoneInput.displayName = "PhoneInput";
