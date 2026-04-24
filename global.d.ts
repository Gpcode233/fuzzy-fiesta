declare module 'html-to-image' {
  export function toPng(node: HTMLElement, options?: { cacheBust?: boolean }): Promise<string>;
}

declare module 'qrcode' {
  const QRCode: {
    toDataURL(text: string, options?: {
      width?: number;
      margin?: number;
      color?: { dark?: string; light?: string };
    }): Promise<string>;
  };

  export default QRCode;
}
