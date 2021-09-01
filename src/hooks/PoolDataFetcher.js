import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import axios from 'axios';
import { getBep20Contract } from '../utils/contractHelpers'

export const PoolDataFetcher = (tokenAddress,amount) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contract = getBep20Contract(tokenAddress, web3)
    const v = amount * (10 ** 18)
    const handleTransfer = useCallback(async () => { 
     const pay = contract.methods.participateAndPay().send({ from: account, value: v })
            .on('transactionHash', (tx) => { return tx.transactionHash })
        return pay
    }, [account, contract, amount,tokenAddress])
    return { onTransfer: handleTransfer}
}

export const ClaimTokens = (tokenAddress) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contract = getBep20Contract(tokenAddress, web3)
    const ClaimToken = useCallback(async () => {
     const claimTokens = contract.methods.claimTokens().send({ from: account })
        .on('transactionHash', (tx) => { return tx.transactionHash });
        return claimTokens;
    }, [account, contract,tokenAddress])

    return {claimToken:ClaimToken}
}
export const ClaimVestedToken = (tokenAddress) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contract = getBep20Contract(tokenAddress, web3)
    const ClaimVestedTokens = useCallback(async () => {
        const claimVestedTokens = contract.methods.claimVestedTokens().send({ from: account }).on('transactionHash', (tx) => { return tx.transactionHash })
        return claimVestedTokens
    }, [account, contract,tokenAddress])
    return { vestedClaim:ClaimVestedTokens}
}

export const VestedPeriod = (tokenAddress) => {
    const web3 = useWeb3();
    const contract = getBep20Contract(tokenAddress, web3)
    const vestingPeriod= useCallback(async () => {
        const vestingPeriod = contract.methods.vestingPeriod().call();      
        return vestingPeriod
    }, [contract,tokenAddress])


    return {vestingPeriod:vestingPeriod}
}

export const Finalize = () => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const FinalizeSale = useCallback(async (idr) => {
        if(idr && idr.address && idr.id && account){
            const contract = getBep20Contract(idr.address, web3)
            try{
                const finalizeSale = await contract.methods.finalizeSale().send({ from: account.toString() });
                const {data} = await axios.post('http://ec2-54-191-140-38.us-west-2.compute.amazonaws.com:3000/project/finalizeSale', { id :idr.id });
                if(data.status){
                    return true;
                }
                return false;
            }catch(error){
                console.log(error)
                return false;
            }
            }
            return false
        // return finalizeSale
    }, [account])


    return {Final:FinalizeSale}
  
}

export const Contribute = (tokenAddress) => {
    const { account } = useWeb3React();
    const web3 = useWeb3(); 
    const contract = getBep20Contract(tokenAddress, web3)
    const getContributedForTier1 = useCallback(async () => {
        const tier1Contribute =await contract.methods.buyInOneTier(account).call();
        const tier2Contribute = await contract.methods.buyInTwoTier(account).call()
        const tier3Contribute =await  contract.methods.buyInThreeTier(account).call()
        const tier4Contribute =await  contract.methods.buyInFourTier(account).call()
        return {tier1Contribute,tier2Contribute,tier3Contribute,tier4Contribute}
    }, [account, contract,tokenAddress])

    return {tier1Con:getContributedForTier1}
}


// export const Eligible = (tokenAddress) => {
//     const { account } = useWeb3React();
//     const web3 = useWeb3(); 
//     const contract = getBep20Contract(tokenAddress, web3)

//     const eligible = useCallback(async () => {
//         const eligiblePool = contract.methods.isEligible(account).call();
//         return eligiblePool;
//     }, [account, contract,tokenAddress])
//     return {eligible:eligible}
// }

export default PoolDataFetcher;