import React, { useState, useEffect } from "react";
import footer from "./Footer.module.css";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAcceptedCookiePolicy = localStorage.getItem(
      "cookiePolicyAccepted"
    );

    // setShowPopup(true);
    if (!hasAcceptedCookiePolicy) {
      setShowPopup(true);
    }
  }, []);

  const acceptCookiePolicy = () => {
    localStorage.setItem("cookiePolicyAccepted", "true");
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className={`${footer.cookie_consent_overlay}`}>
        <div className={`${footer.cookie_consent}`}>
          <span>
            This website uses cookies to enhance user experience. Please review
            our legal agreements:
            {`\t`}
            <button onClick={acceptCookiePolicy}>Got it</button>
          </span>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
