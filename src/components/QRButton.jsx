"use client";
import { useState } from "react";
import QRCode from "qrcode";

export default function QRButton({ formId }) {
  const [generating, setGenerating] = useState(false);

  const downloadQRCode = async () => {
    if (typeof window === "undefined") return;

    const url = `${window.location.origin}/view/${formId}`;
    const fileName = `formflow-qr-code.png`;
    setGenerating(true);

    try {
      // ── Generate QR with transparent background ──────────────────────────
      const rawQrDataUrl = await QRCode.toDataURL(url, {
        width: 520,
        margin: 1,
        errorCorrectionLevel: "H",
        color: { dark: "#0f0a1e", light: "#00000000" },
      });

      // ── Canvas setup ─────────────────────────────────────────────────────
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const W = 680;
      const H = 900;
      canvas.width = W;
      canvas.height = H;

      // ── Helper: rounded rect ─────────────────────────────────────────────
      const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
      };

      // ── 1. BACKGROUND — deep midnight gradient ───────────────────────────
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, "#0f0a1e");
      bgGrad.addColorStop(0.5, "#160d2e");
      bgGrad.addColorStop(1, "#0a0818");
      ctx.fillStyle = bgGrad;
      roundRect(0, 0, W, H, 32);
      ctx.fill();

      // ── 2. SUBTLE DOT GRID ───────────────────────────────────────────────
      ctx.fillStyle = "rgba(139, 92, 246, 0.08)";
      const gap = 28;
      for (let gx = gap; gx < W; gx += gap) {
        for (let gy = gap; gy < H; gy += gap) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── 3. TOP AMBIENT GLOW ──────────────────────────────────────────────
      const glowTop = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, 340);
      glowTop.addColorStop(0, "rgba(139, 92, 246, 0.22)");
      glowTop.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = glowTop;
      ctx.fillRect(0, 0, W, H);

      // ── 4. BOTTOM AMBIENT GLOW ───────────────────────────────────────────
      const glowBot = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, 300);
      glowBot.addColorStop(0, "rgba(99, 102, 241, 0.18)");
      glowBot.addColorStop(1, "rgba(99, 102, 241, 0)");
      ctx.fillStyle = glowBot;
      ctx.fillRect(0, 0, W, H);

      // ── 5. CARD BORDER GLOW ──────────────────────────────────────────────
      const borderGrad = ctx.createLinearGradient(0, 0, W, H);
      borderGrad.addColorStop(0, "rgba(167, 139, 250, 0.6)");
      borderGrad.addColorStop(0.5, "rgba(99, 102, 241, 0.2)");
      borderGrad.addColorStop(1, "rgba(167, 139, 250, 0.6)");
      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = 1.5;
      roundRect(1, 1, W - 2, H - 2, 31);
      ctx.stroke();

      // ── 6. BRAND HEADER ──────────────────────────────────────────────────
      // Logo mark — small hexagon icon
      const hx = W / 2;
      const hy = 72;
      const hr = 20;
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = hx + hr * Math.cos(angle);
        const py = hy + hr * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      const hexGrad = ctx.createLinearGradient(hx - hr, hy - hr, hx + hr, hy + hr);
      hexGrad.addColorStop(0, "#a78bfa");
      hexGrad.addColorStop(1, "#6366f1");
      ctx.fillStyle = hexGrad;
      ctx.fill();

      // Inner "F" lettermark
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("F", hx, hy);

      // Brand name
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 38px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("FormFlow", W / 2, 104);

      // Tagline
      ctx.fillStyle = "rgba(167, 139, 250, 0.7)";
      ctx.font = "500 15px 'Courier New', monospace";
      ctx.fillText("SCAN · SUBMIT · DONE", W / 2, 150);

      // Divider line
      const divGrad = ctx.createLinearGradient(80, 0, W - 80, 0);
      divGrad.addColorStop(0, "rgba(139, 92, 246, 0)");
      divGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.5)");
      divGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.strokeStyle = divGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, 178);
      ctx.lineTo(W - 80, 178);
      ctx.stroke();

      // ── 7. QR CARD PANEL ─────────────────────────────────────────────────
      const qrPanelX = 64;
      const qrPanelY = 200;
      const qrPanelW = W - 128;
      const qrPanelH = 540;

      // Panel background
      ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
      roundRect(qrPanelX, qrPanelY, qrPanelW, qrPanelH, 20);
      ctx.fill();

      // Panel border
      ctx.strokeStyle = "rgba(167, 139, 250, 0.2)";
      ctx.lineWidth = 1;
      roundRect(qrPanelX, qrPanelY, qrPanelW, qrPanelH, 20);
      ctx.stroke();

      // QR white backing
      const qrBgSize = 440;
      const qrBgX = (W - qrBgSize) / 2;
      const qrBgY = qrPanelY + (qrPanelH - qrBgSize) / 2;

      ctx.fillStyle = "#ffffff";
      roundRect(qrBgX, qrBgY, qrBgSize, qrBgSize, 16);
      ctx.fill();

      // Inner glow on QR panel
      const qrGlow = ctx.createRadialGradient(W / 2, qrPanelY + qrPanelH / 2, 0, W / 2, qrPanelY + qrPanelH / 2, 300);
      qrGlow.addColorStop(0, "rgba(139, 92, 246, 0.06)");
      qrGlow.addColorStop(1, "rgba(139, 92, 246, 0)");
      ctx.fillStyle = qrGlow;
      roundRect(qrPanelX, qrPanelY, qrPanelW, qrPanelH, 20);
      ctx.fill();

      // Decorative corner brackets on QR white panel
      const bL = 28;
      const bT = 3;
      const corners = [
        [qrBgX + 8, qrBgY + 8],
        [qrBgX + qrBgSize - 8, qrBgY + 8],
        [qrBgX + 8, qrBgY + qrBgSize - 8],
        [qrBgX + qrBgSize - 8, qrBgY + qrBgSize - 8],
      ];
      const bracketGrad = ctx.createLinearGradient(0, 0, W, H);
      bracketGrad.addColorStop(0, "#a78bfa");
      bracketGrad.addColorStop(1, "#6366f1");
      ctx.strokeStyle = bracketGrad;
      ctx.lineWidth = bT;
      ctx.lineCap = "round";
      corners.forEach(([cx, cy], i) => {
        const sx = i % 2 === 0 ? 1 : -1;
        const sy = i < 2 ? 1 : -1;
        ctx.beginPath();
        ctx.moveTo(cx, cy + sy * bL);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + sx * bL, cy);
        ctx.stroke();
      });

      // Draw QR image
      const qrImg = new Image();
      qrImg.src = rawQrDataUrl;
      await new Promise((resolve) => {
        qrImg.onload = () => {
          const qrPad = 20;
          ctx.drawImage(qrImg, qrBgX + qrPad, qrBgY + qrPad, qrBgSize - qrPad * 2, qrBgSize - qrPad * 2);
          resolve();
        };
      });

      // ── 8. URL PILL ──────────────────────────────────────────────────────
      const urlY = qrPanelY + qrPanelH + 28;
      const maxDisplayUrl = url.length > 44 ? `${url.substring(0, 41)}…` : url;

      // Pill background
      ctx.fillStyle = "rgba(99, 102, 241, 0.12)";
      roundRect(80, urlY, W - 160, 52, 26);
      ctx.fill();

      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;
      roundRect(80, urlY, W - 160, 52, 26);
      ctx.stroke();

      // URL text
      ctx.fillStyle = "rgba(199, 210, 254, 0.85)";
      ctx.font = "200 16px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(maxDisplayUrl, W / 2, urlY + 26);

      // ── 9. FOOTER ────────────────────────────────────────────────────────
      ctx.fillStyle = "rgba(107, 114, 128, 0.5)";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText("formflow.app  ·  Scan to open form", W / 2, H - 32);

      // Footer divider
      ctx.strokeStyle = "rgba(139, 92, 246, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(80, H - 52);
      ctx.lineTo(W - 80, H - 52);
      ctx.stroke();

      // ── 10. DOWNLOAD ─────────────────────────────────────────────────────
      const compositedDataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = compositedDataUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("QR card generation error:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={downloadQRCode}
      disabled={generating}
      className="rounded-full text-(--text-2) hover:text-(--text) items-center gap-2 transition-all duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-wait active:scale-[0.97] group"
      title="Download shareable QR Card"
    >
      <span className="transition-all border border-(--border) p-3 rounded-2xl text-sm duration-100 hover:scale-110">
        {generating ? "⏳" : "𖣯 Download QR"}
      </span>
    </button>
  );
}