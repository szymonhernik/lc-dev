// 'use client';
// import { useCustomCheckout } from '@stripe/react-stripe-js';

// export default function OrderSummary() {

//   const priceString = new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: currency!,
//     minimumFractionDigits: 0
//   }).format((lineItems[0]?.unitAmount || 0) / 100);

//   return (
//     <div className="mb-8">
//       <h1 className="font-bold text-xl mb-4">Order Summary</h1>
//       <div className="bg-zinc-900 rounded p-4  w-3/4">
//         <p>{lineItems[0]?.name}</p>

//         <div className="font-bold flex justify-between">
//           <p>Subtotal</p> <p>{priceString}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
