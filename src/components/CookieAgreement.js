import React from 'react';
import CookieConsent from "react-cookie-consent";

export default function CookieAgreement() {
  return (
    <CookieConsent
      style={{
        alignItems: "center", 
        justifyContent: "flex-start", 
        padding: "20px", 
        backgroundColor: "rgba(0,0,0,0.75)", 
        fontWeight: "300", 
        lineHeight: "1.6", 
        letterSpacing: "1px"
      }}
      contentStyle={{
        flex: "0 1 auto", 
        marginRight: "20px", 
        marginBottom: "20px"
      }}
      buttonStyle={{
        height: "40px", 
        borderRadius: "3px", 
        fontSize: "16px"
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
}