import { QRCodeCanvas } from "qrcode.react";

type PropQrType = {
  url: string;
};

export default function QRCode({ url }: PropQrType) {
  //const location = useLocation();
  const currentUrl = window.location.href;
  const urlActual = currentUrl.replace("admin", url);

  

  return (
    <>
      <div className="lg:px-10 m-auto ">
        <QRCodeCanvas
          value={urlActual}
          size={250} // Tamaño del QR (en píxeles)
          bgColor={"#ffffff"} // Color de fondo
          fgColor={"#000000"} // Color del QR
          level={"H"} // Nivel de corrección de errores ('L', 'M', 'Q', 'H')
        />
       
      </div>
    </>
  );
}
