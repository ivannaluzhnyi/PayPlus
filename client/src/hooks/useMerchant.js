import { useContext } from 'react';
import MerchantContext from 'src/context/MerchantContext';

export default function useMerchant() {
  const context = useContext(MerchantContext);

  return context;
}
