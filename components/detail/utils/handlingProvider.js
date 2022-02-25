export default function handlingProvider({ provider }) {
  const providerSet = new Set();
  const providerMap = new Map();
  const providers = (() => {
    if (!provider) return [];
    const result = [];
    if (provider.buy) result.push(...provider.buy);
    if (provider.rent) result.push(...provider.rent);
    if (provider.flatrate) result.push(...provider.flatrate);
    return result;
  })();
  providers.forEach((site) => {
    if (!providerSet.has(site.provider_name)) {
      providerSet.add(site.provider_name);
      providerMap.set(site.provider_name, site);
    }
  });

  const providerList = [];
  const iterator = providerMap.values();

  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    providerList.push(value);
  }
  return providerList;
}
