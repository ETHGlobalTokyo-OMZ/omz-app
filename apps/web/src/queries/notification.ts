import * as PushAPI from '@pushprotocol/restapi';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';

export const getNotifications = async (address: string) => {
  const notifications = await PushAPI.user.getFeeds({
    user: `eip155:5:${address}`,
    env: ENV.STAGING
  });

  return notifications;
};
