import { FC, useState } from 'react';
import Modal from 'react-modal';
import ChevronDown from 'assets/chevron-down.svg';
import { Token } from 'types';
import CloseIcon from 'assets/close.svg';
import Input from './TokenInput';
import SearchInput from './SearchInput';

interface TokenSelectProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  selectedToken: Token;
}

const TokenSelect: FC<TokenSelectProps> = ({ tokens, onSelectToken, selectedToken }) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div className="relative flex flex-col text-black">
      <button className="flex items-center gap-2" onClick={() => setIsSelectOpen(!isSelectOpen)}>
        {selectedToken.symbol}
        <ChevronDown />
      </button>
      <Modal
        isOpen={isSelectOpen}
        onRequestClose={() => setIsSelectOpen(false)}
        overlayClassName="fixed flex items-center inset-0 justify-center z-[9999] bg-black bg-opacity-50"
        className="absolute w-full max-w-[420px] rounded-[20px] bg-white py-4 px-6 text-black">
        <h2>Select Token</h2>
        <button
          className="absolute top-[18px] right-6 cursor-pointer"
          onClick={() => setIsSelectOpen(false)}>
          <CloseIcon />
        </button>
        <SearchInput />
        <div className="">
          {tokens.map((token) => (
            <div>{token.symbol}</div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default TokenSelect;
