import QRCode from "qrcode";

export default function QRButton({ formId }) {
  const url = `${window.location.origin}/view/${formId}`;

  const downloadQRCode = async () => {
    const fileName = form-flow-qrcode.png;
    try {
      const dataUrl = await QRCode.toDataURL(url, {
        width: 500,
        margin: 2,
      });

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("QR Generation Failed:", error);
    }
  };

  return (
    <button className="bg-(--surface) p-2 hover:bg-(--surface-2) hover:rounded-2xl transition-all"
      onClick={() =>
        downloadQRCode()
      }
    >
      𖣯 QR
    </button>
  );
}
