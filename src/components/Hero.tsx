import heroDesktop from '../assets/images/hero-desktop.png';
import heroTablet from '../assets/images/hero-tablet.png';
import heroMobile from '../assets/images/hero-mobile.png';

export const Hero = () => {
  return (
    <div>
      <picture>
        <source
          media="(max-width:639px)"
          srcSet={heroMobile}
          type="image/png"
          width={640}
          height={360}
        />
        <source
          media="((min-width:640px) and (max-width:1023px))"
          srcSet={heroTablet}
          type="image/png"
          width={1024}
          height={576}
        />
        <img
          src={heroDesktop}
          alt="Foto de um hamburguer"
          className="w-full max-h-[600px] object-cover"
          width={2000}
          height={1125}
        />
      </picture>
    </div>
  );
};
