import landingDesktop from '../assets/images/landing-desktop.png';
import landingTablet from '../assets/images/landing-tablet.png';
import landingMobile from '../assets/images/landing-mobile.png';
import appDownloadImage from '../assets/images/appDownload.png';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takway today
        </h1>

        <span className="text-xl">Food is just a click away!</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <picture>
          <source
            media="(max-width:639px)"
            srcSet={landingMobile}
            type="image/png"
            width={640}
            height={360}
          />
          <source
            media="((min-width:640px) and (max-width:1023px))"
            srcSet={landingTablet}
            type="image/png"
            width={1024}
            height={576}
          />
          <img
            src={landingDesktop}
            alt="Foto de uma tela de celular com o site aberto"
            className="w-full max-h-[600px] object-cover"
            width={1600}
            height={900}
          />
        </picture>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order Takeaway even faster
          </span>

          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>

          <img src={appDownloadImage} alt="Sites para baixar o app" />
        </div>
      </div>
    </div>
  );
};