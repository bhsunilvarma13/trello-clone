import React from "react";

function ClerkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-pink-600">
      {children}
    </div>
  );
}

export default ClerkLayout;
