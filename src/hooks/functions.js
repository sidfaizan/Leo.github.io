import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import useWeb3 from './useWeb3';
import environment from '../utils/Environment';
import { getBep20ContractToken } from '../utils/contractHelpers'
import { getWeiNumber } from '../utils/formatBalance'


const spender='0x49A61ba8E25FBd58cE9B30E1276c4Eb41dD80a80'; //static

export const useApprove = (tokenAddress, amountIn , decimals) => {
    const { account } = useWeb3React();
    const web3 = useWeb3();
    const contractToken = getBep20ContractToken(tokenAddress, web3)
    amountIn = getWeiNumber(amountIn , decimals);
    const ApproveTokens= useCallback( () => {
        const approved = contractToken.methods.approve(spender,amountIn).send({ from: account })
        .on('transactionHash', (tx) => { return tx.transactionHash });
        return approved
    }, [account,amountIn ])

    return { Approve: ApproveTokens }
}

export default useApprove;