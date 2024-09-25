import { createQR, encodeURL, TransactionRequestURLFields } from "@solana/pay";
import { PublicKey } from "@solana/web3.js";
import { RefObject } from "react";
import { useRouter } from 'next/navigation';

export const createQRCode = (
  qrRef: RefObject<HTMLDivElement>,
  reference: PublicKey,
  id: string
) => {
  const router = useRouter(); // Assuming you want to use next/navigation for routing, adjust if using older methods
  
  // Create a new URLSearchParams object with the `reference` and `id` parameters
  const searchParams = new URLSearchParams([
    ["reference", reference.toString()],
    ["id", id],
  ]);

  // Create a new URL object using the current origin and the API URL with search parameters
  const apiUrl = new URL(
    `/api/checkIn?${searchParams.toString()}`,
    window.location.origin
  );

  // Encode the API URL into a QR code
  const urlFields: TransactionRequestURLFields = {
    link: apiUrl.toString(), // Ensure we're passing a string
  };
  const url = encodeURL(urlFields);
  const qr = createQR(url, 400, "transparent");

  // Append the QR code to the element specified by the `qrRef` ref object
  if (qrRef.current) {
    qrRef.current.innerHTML = "";
    qr.append(qrRef.current);
  }

  // If you need to handle navigation or other side effects after QR generation
  router.push(apiUrl); // Example usage, modify based on your routing needs
};
