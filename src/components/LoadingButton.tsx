import { Button } from './ui/button';

export const LoadingButton = () => {
  return (
    <Button disabled>
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        className="mr-2 size-4 animate-spin"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke-linecap="round"
          stroke-miterlimit="10"
          stroke-width="32"
          d="m400 148-21.12-24.57A191.43 191.43 0 0 0 240 64C134 64 48 150 48 256s86 192 192 192a192.09 192.09 0 0 0 181.07-128"
        ></path>
        <path d="M464 97.42V208a16 16 0 0 1-16 16H337.42c-14.26 0-21.4-17.23-11.32-27.31L436.69 86.1C446.77 76 464 83.16 464 97.42z"></path>
      </svg>
      Carregando
    </Button>
  );
};