export const getMarketList = async () => {
  const { lists } = await (await fetch('http://114.70.193.152:10140/otc/list')).json();
  return lists;
};
