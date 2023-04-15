/* eslint-disable no-param-reassign */
export const shortenAddress = (address: string, maxCharacters: number) => {
  if (maxCharacters >= address.length) {
    return address;
  }

  const i = address.indexOf('0x');
  const prefix = address.slice(0, i + 1);
  const temp = address.slice(i + 2);

  maxCharacters -= prefix.length;
  maxCharacters -= 1;

  if (maxCharacters <= 0) {
    return '';
  }

  const mid = Math.floor(temp.length / 2);
  let former = temp.slice(0, mid);
  let latter = temp.slice(mid);

  while (maxCharacters < former.length + latter.length) {
    if ((former.length + latter.length) % 2 === 1 && former.length > 0) {
      former = former.slice(0, former.length - 1);
    } else {
      latter = latter.slice(1);
    }
  }

  return `0x${former}...${latter}`;
};
