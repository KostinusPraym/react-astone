import React from "react";

const ShareButton = () => {
  const [activePanel, setActivePanel] = React.useState(false);

  const handleShareToTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${window.location.href}`;
    window.open(telegramUrl, "_blank");
  };
  
  return (
    <div className="flex gap-2">
      <img
        onClick={() => setActivePanel(!activePanel)}
        className="h-8 w-8 cursor-pointer"
        src="/images/share.svg"
        alt="share-icons"
      />
      {activePanel && (
        <div>
          <img
            className="cursor-pointer"
            onClick={handleShareToTelegram}
            src="/images/telegram.svg"
            alt="telegram-icon"
          />
        </div>
      )}
    </div>
  );
};

export default ShareButton;
