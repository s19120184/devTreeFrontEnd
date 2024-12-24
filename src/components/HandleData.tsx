import { SocialNetwork, userHandle } from "../types";
import QRCode from "./QRCode";

type PropsHandleData = {
  data: userHandle;
};

export default function HandleData({ data }: PropsHandleData) {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{data.handle}</p>
      {data.image && <img src={data.image} className="mx-w[250px] mx-auto" />}
      <p className="text-lg text-center font-bold">{data.description}</p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noopener norefer"
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="imagen red social"
                className="w-12"
              />
              <p className="text-black capitalize font-black text-lg">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center">No hay enlaces en este perfil</p>
        )}
        <QRCode url={data.handle}/>
      </div>  
    </div>
  );
}
