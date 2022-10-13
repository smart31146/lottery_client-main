
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Grid} from "@material-ui/core"
import Image from 'next/image'

const LatestWinNumbercard = (props)=>{
    const {numbers} = props;

    console.log("numbers",numbers)
    const RoundCard = ({number})=>{
        return (
            <div className = "ring-card">
                <div  className="ring-card-img1">
                    <Image src="/image/ring.png"  id="" alt="" fill="" width="100%" height="100%" layout="responsive"/>
                </div>
                <span className = "x-font2-yellow">{number}</span>
            </div>
        )
    }
    return (
        <div className = "latest-winnumber-card">
            <div>
                <RoundCard number={numbers[0].toString()} />
                <RoundCard number={numbers[1].toString()}/>
                <RoundCard number={numbers[2].toString()}/>
                <RoundCard number={numbers[3].toString()}/>
            </div>
        </div>
    )
}

export {LatestWinNumbercard};