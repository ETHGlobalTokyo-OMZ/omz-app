export const getMarketList = async () => {
  const { lists } = await (await fetch('http://114.70.193.152:10140/otc/list')).json();
  return lists;
};

export const getListing = async (_id: string) => {
  const { lists } = await (await fetch(`http://114.70.193.152:10140/otc/list?_id=${_id}`)).json();
  return lists[0];
};

export const getBuyerOrders = async (buyer: string) => {
  const { lists } = await (
    await fetch(`http://114.70.193.152:10140/otc/list?buyer=${buyer}`)
  ).json();
  return lists;
};

export const getSellerListings = async (seller: string) => {
  const { lists } = await (
    await fetch(`http://114.70.193.152:10140/otc/list?seller=${seller}`)
  ).json();
  return lists;
};
