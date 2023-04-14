/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <div className="flex flex-col gap-5">
    <div className="flex gap-2">
      <h1>OTC market</h1>
      <span>|</span>
      <h2>Buy</h2>
    </div>
    <div>
      <table className="w-full">
        <tr className="bg-[#22252E]">
          <th className="py-3 px-4 text-left">Token</th>
          <th className="py-3 px-4">Price</th>
          <th className="py-3 px-4">Deposit</th>
          <th className="py-3 px-4">Expired</th>
          <th className="py-3 px-4" />
        </tr>
        <tr>
          <td className="p-4 text-left">ETH</td>
          <td className="p-4 text-center">1000 BOB</td>
          <td className="p-4 text-center">1 BOB</td>
          <td className="p-4 text-center">2023.03.25 16:00</td>
          <td className="p-4 text-center">
            <button>Buy</button>
          </td>
        </tr>

        <tr>
          <td className="p-4 text-left">ETH</td>
          <td className="p-4 text-center">1000 BOB</td>
          <td className="p-4 text-center">1 BOB</td>
          <td className="p-4 text-center">2023.03.25 16:00</td>
          <td className="p-4 text-center">
            <button>Buy</button>
          </td>
        </tr>

        <tr>
          <td className="p-4 text-left">ETH</td>
          <td className="p-4 text-center">1000 BOB</td>
          <td className="p-4 text-center">1 BOB</td>
          <td className="p-4 text-center">2023.03.25 16:00</td>
          <td className="p-4 text-center">
            <button>Buy</button>
          </td>
        </tr>

        <tr>
          <td className="p-4 text-left">ETH</td>
          <td className="p-4 text-center">1000 BOB</td>
          <td className="p-4 text-center">1 BOB</td>
          <td className="p-4 text-center">2023.03.25 16:00</td>
          <td className="p-4 text-center">
            <button>Buy</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
);

export default Home;
