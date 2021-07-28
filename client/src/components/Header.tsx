import React from "react";

type HeaderProps = {
  handleSwitchMode: (previousMode: (previousMode: boolean) => boolean) => void;
};
export const Header = ({ handleSwitchMode }: HeaderProps) => {
  return (
    <div className="header">
      <h1>Notes</h1>
      <button
        className="switch"
        onClick={() => handleSwitchMode((previousMode) => !previousMode)}
      >
        Switch theme
      </button>
    </div>
  );
};
