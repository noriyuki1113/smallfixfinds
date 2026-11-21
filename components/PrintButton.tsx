"use client";

export default function PrintButton() {
  return (
    <button type="button" className="no-print print-btn" onClick={() => window.print()}>
      Print / Save as PDF
    </button>
  );
}
