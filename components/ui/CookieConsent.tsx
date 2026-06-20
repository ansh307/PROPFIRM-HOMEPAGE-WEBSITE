"use client";
import { useState, useEffect, useCallback } from "react";
import { Cookie, X, Settings, Check } from "lucide-react";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const COOKIE_CONSENT_KEY = "cookieConsent";

const getInitialPreferences = (): CookiePreferences => {
  if (typeof window === "undefined") {
    return {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
  }

  try {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
      return JSON.parse(consent);
    }
  } catch (error) {
    console.error("Error parsing cookie preferences:", error);
  }

  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
};

const hasConsent = (): boolean => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(COOKIE_CONSENT_KEY);
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSettingsButton, setShowSettingsButton] = useState(() =>
    hasConsent()
  );
  const [cookiePreferences, setCookiePreferences] = useState<CookiePreferences>(
    getInitialPreferences
  );

  useEffect(() => {
    if (!hasConsent()) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = useCallback((preferences: CookiePreferences) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
      setCookiePreferences(preferences);
      setShowBanner(false);
      setShowSettings(false);
      setShowSettingsButton(true);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  }, [savePreferences]);

  const handleAcceptNecessary = useCallback(() => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  }, [savePreferences]);

  const handleSavePreferences = useCallback(() => {
    savePreferences(cookiePreferences);
  }, [cookiePreferences, savePreferences]);

  const togglePreference = useCallback((key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setCookiePreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const openSettings = useCallback(() => setShowSettings(true), []);
  const closeSettings = useCallback(() => setShowSettings(false), []);

  return (
    <>
      {/* Cookie Settings Button */}
      {showSettingsButton && !showBanner && !showSettings && (
        <button
          onClick={openSettings}
          className="fixed bottom-6 left-6 z-50 bg-[#0b0b0b] hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Cookie Settings"
          type="button"
        >
          <Cookie className="w-5 h-5" />
        </button>
      )}

      {/* Cookie Consent Banner */}
      {showBanner && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b0b0b] backdrop-blur-sm border-t border-white/15 p-6 shadow-2xl"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <Cookie
                    className="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3
                      id="cookie-banner-title"
                      className="text-lg font-semibold text-white mb-2"
                    >
                      We value your privacy
                    </h3>
                    <p
                      id="cookie-banner-description"
                      className="text-sm text-gray-300 leading-relaxed"
                    >
                      We use cookies to enhance your browsing experience, serve
                      personalized content, and analyze our traffic. By clicking
                      &quot;Accept All&quot;, you consent to our use of cookies.{" "}
                      <a
                        href="/legal/privacy-policy"
                        className="text-green-400 hover:text-green-300 underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                      >
                        Learn more
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 md:flex-nowrap">
                <button
                  onClick={openSettings}
                  className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="button"
                >
                  <Settings
                    className="w-4 h-4 inline mr-2"
                    aria-hidden="true"
                  />
                  Customize
                </button>
                <button
                  onClick={handleAcceptNecessary}
                  className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="button"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-semibold text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="button"
                >
                  <Check className="w-4 h-4" aria-hidden="true" />
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          role="dialog"
          aria-labelledby="cookie-settings-title"
          aria-modal="true"
          onClick={closeSettings}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Cookie className="w-6 h-6 text-green-500" aria-hidden="true" />
                <h2
                  id="cookie-settings-title"
                  className="text-2xl font-bold text-white"
                >
                  Cookie Settings
                </h2>
              </div>
              <button
                onClick={closeSettings}
                className="text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
                aria-label="Close cookie settings"
                type="button"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 text-sm">
                We use cookies to improve your experience on our site. You can
                choose which types of cookies to allow below. Note that blocking
                some types of cookies may impact your experience.
              </p>

              {/* Necessary Cookies */}
              <div className="border border-gray-700 rounded-lg p-5 bg-gray-800/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Necessary Cookies
                    </h3>
                    <p className="text-sm text-gray-400">
                      These cookies are essential for the website to function
                      properly. They cannot be disabled.
                    </p>
                  </div>
                  <div className="ml-4" aria-label="Always enabled">
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-70">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Includes: Session management, security, form submission
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-700 rounded-lg p-5 bg-gray-800/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Analytics Cookies
                    </h3>
                    <p className="text-sm text-gray-400">
                      Help us understand how visitors interact with our website
                      by collecting and reporting information anonymously.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("analytics")}
                    className="ml-4 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                    aria-label={`Analytics cookies ${
                      cookiePreferences.analytics ? "enabled" : "disabled"
                    }`}
                    type="button"
                  >
                    <div
                      className={`w-12 h-6 rounded-full flex items-center transition-all ${
                        cookiePreferences.analytics
                          ? "bg-green-600 justify-end"
                          : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Includes: Google Analytics, page view tracking, user behavior
                  analysis
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-700 rounded-lg p-5 bg-gray-800/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Marketing Cookies
                    </h3>
                    <p className="text-sm text-gray-400">
                      Used to track visitors across websites to display relevant
                      ads and marketing campaigns.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("marketing")}
                    className="ml-4 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                    aria-label={`Marketing cookies ${
                      cookiePreferences.marketing ? "enabled" : "disabled"
                    }`}
                    type="button"
                  >
                    <div
                      className={`w-12 h-6 rounded-full flex items-center transition-all ${
                        cookiePreferences.marketing
                          ? "bg-green-600 justify-end"
                          : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Includes: Facebook Pixel, Google Ads, retargeting campaigns
                </p>
              </div>

              {/* Preference Cookies */}
              <div className="border border-gray-700 rounded-lg p-5 bg-gray-800/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Preference Cookies
                    </h3>
                    <p className="text-sm text-gray-400">
                      Enable the website to remember choices you make and
                      provide enhanced, personalized features.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference("preferences")}
                    className="ml-4 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-full"
                    aria-label={`Preference cookies ${
                      cookiePreferences.preferences ? "enabled" : "disabled"
                    }`}
                    type="button"
                  >
                    <div
                      className={`w-12 h-6 rounded-full flex items-center transition-all ${
                        cookiePreferences.preferences
                          ? "bg-green-600 justify-end"
                          : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Includes: Language preferences, theme settings, regional
                  preferences
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-6 flex gap-3 justify-end z-10">
              <button
                onClick={handleAcceptNecessary}
                className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                type="button"
              >
                Necessary Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-5 py-2.5 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800 transition font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                type="button"
              >
                Accept All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white transition font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="button"
              >
                <Check className="w-4 h-4" aria-hidden="true" />
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
