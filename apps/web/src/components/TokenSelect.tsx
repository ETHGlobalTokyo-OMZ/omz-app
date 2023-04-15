import { FC, useState } from 'react';
import Modal from 'react-modal';
import ChevronDown from 'assets/chevron-down.svg';
import { Token } from 'types';
import CloseIcon from 'assets/close.svg';
import TokenIcon from './TokenIcon';

interface TokenSelectProps {
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  selectedToken: Token;
}

const TokenSelect: FC<TokenSelectProps> = ({ tokens, onSelectToken, selectedToken }) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div className="text-black relative flex flex-col">
      <button className="flex items-center gap-2" onClick={() => setIsSelectOpen(!isSelectOpen)}>
        <div className="flex items-center gap-1">
          <div className="h-6 w-6">
            <TokenIcon symbol={selectedToken.symbol} />
          </div>
          <span className="text-sm font-medium leading-[17px] text-grey-10">
            {selectedToken.symbol}
          </span>
        </div>
        <ChevronDown />
      </button>
      <Modal
        isOpen={isSelectOpen}
        onRequestClose={() => setIsSelectOpen(false)}
        overlayClassName="fixed flex items-center inset-0 justify-center z-[9999] bg-black bg-opacity-50"
        className="bg-white text-black absolute max-h-[320px] w-full max-w-[420px] rounded-[20px] py-4 px-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-[20px] font-medium leading-[142.34%] text-grey-7">Select Token</h2>
          <button
            className="absolute top-[18px] right-6 cursor-pointer"
            onClick={() => setIsSelectOpen(false)}>
            <CloseIcon />
          </button>
          {/* <SearchInput placeholder='Search token name' /> */}
          <div className="flex flex-col gap-4">
            {tokens.map((token) => (
              <button
                className="flex items-center gap-2 py-1"
                onClick={() => {
                  onSelectToken(token);
                  setIsSelectOpen(false);
                }}>
                <div className="h-6 w-6">
                  <TokenIcon symbol={token.symbol} />
                </div>
                <span>{token.symbol}</span>
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TokenSelect;
