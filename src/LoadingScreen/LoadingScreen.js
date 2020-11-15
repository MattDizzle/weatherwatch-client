import LoadingRing from './Ring.png'
import './LoadingScreen.css'

export const LoadingScreen = () => {
    return(
        <div className='loading-box'>
            <span>Loading</span>
        <img src={LoadingRing} alt='loading-ring' className='ring' />
        </div>
    )
}
