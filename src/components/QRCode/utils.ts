export const generateQRCode = (text: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Load QR.js library dynamically if not already loaded
    if (!(window as any).QR) {
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js";
      script.onload = () => generateWithLibrary();
      script.onerror = () => reject(new Error("Failed to load QR library"));
      document.head.appendChild(script);
    } else {
      generateWithLibrary();
    }

    function generateWithLibrary() {
      try {
        const qr = new (window as any).QRious({
          value: text,
          size: 256,
          background: "#ffffff",
          foreground: "#000000",
          level: "M",
        });
        resolve(qr.toDataURL());
      } catch (error) {
        reject(error);
      }
    }
  });
};
