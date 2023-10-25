export const Problem3 = () => {
    return (<></>);
}
// import {BoxProps} from "@mui/material";
//
// interface WalletBalance {
//     currency: string;
//     amount: number;
// }
// interface FormattedWalletBalance extends WalletBalance{
//     formatted: string;
// }
// // use "extends" to avoid duplicated properties
//
// interface Props extends BoxProps {
//
// }
// const WalletPage: React.FC<Props> = (props: Props) => {
//     const { children, ...rest } = props;
//     const balances = useWalletBalances();
//     const prices = usePrices();
//
//     const getPriority = (blockchain: any): number => {
//         switch (blockchain) {
//             case 'Osmosis':
//                 return 100
//             case 'Ethereum':
//                 return 50
//             case 'Arbitrum':
//                 return 30
//             case 'Zilliqa':
//             case 'Neo':
//                 return 20
//             //if 2 case have return 1 value, don't need defined 2 case in here
//             default:
//                 return -99
//         }
//     }
//
//     const sortedBalances = useMemo(() => {
//         // we should split filter and sort to 2 phase to easy debug or improve in the future
//         let filterdBlances = balances.filter((balance: WalletBalance) => {
//             const balancePriority = getPriority(balance.blockchain);
//             return (lhsPriority > -99) && (balance.amount <= 0);
//             // The logic here only returns true if both conditions are true
//         })
//         filterdBlances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
//             /*
//             * The return value should be a number whose sign indicates the relative order of the two elements.
//             * So we just need to do subtraction to find the required value
//             * */
//             const leftPriority = getPriority(lhs.blockchain);
//             const rightPriority = getPriority(rhs.blockchain);
//             return rightPriority - leftPriority;
//         });
//         return filterdBlances
//     }, [balances, prices]);
//
//     const formattedBalances = sortedBalances.map((balance: WalletBalance): FormattedWalletBalance => {
//         return {
//             ...balance,
//             formatted: balance.amount.toFixed()
//         }
//     })
//
//     const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
//         const usdValue = prices[balance.currency] * balance.amount;
//         return (
//             <WalletRow
//                 className={classes.row}
//                 key={index}
//                 amount={balance.amount}
//                 usdValue={usdValue}
//                 formattedAmount={balance.formatted}
//             />
//         )
//     })
//
//     return (
//         <div {...rest}>
//             {rows}
//         </div>
//     )
// }