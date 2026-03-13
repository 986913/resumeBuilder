import React, {useState, useContext} from "react";
import "./ResumeModal.scss";
import StyleContext from "../../contexts/StyleContext";

const ACCESS_CODE = "mingming2026";

export default function ResumeModal({isOpen, onClose}) {
  const {isDark} = useContext(StyleContext);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (code === ACCESS_CODE) {
      setError(false);
      setCode("");
      onClose();
      window.open(
        "https://drive.google.com/uc?export=download&id=14LT94KKUDR1e4BeehedGW9lN6d71Y1xd",
        "_blank"
      );
    } else {
      setError(true);
    }
  };

  const handleKeyDown = e => {
    if (e.key === "Enter") handleConfirm();
    if (e.key === "Escape") {
      setCode("");
      setError(false);
      onClose();
    }
  };

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setCode("");
      setError(false);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content ${isDark ? "dark-mode" : ""}`}>
        <button
          className="modal-close"
          onClick={() => {
            setCode("");
            setError(false);
            onClose();
          }}
        >
          &times;
        </button>
        <div className="modal-icon">🔒</div>
        <h2 className="modal-title">Access Code Required</h2>
        <p className="modal-description">
          To protect privacy, please enter the access code to download the full
          resume. You can find it in the application email, or contact{" "}
          <a href="mailto:merylliu1994@gmail.com">merylliu1994@gmail.com</a> to
          request one.
        </p>
        <input
          type="password"
          className={`modal-input ${error ? "modal-input-error" : ""}`}
          placeholder="Enter access code"
          value={code}
          onChange={e => {
            setCode(e.target.value);
            setError(false);
          }}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        {error && (
          <p className="modal-error">Invalid access code. Please try again.</p>
        )}
        <button className="modal-confirm-btn" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
}
