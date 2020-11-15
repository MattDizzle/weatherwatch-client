import LoadingRing from './Ring.png'
import './LoadingScreen.css'

export const LoadingScreen = () => {
    return(
        <div className='loading-box animate__animated animate__zoomIn'>
            <span className='animate__animated animate__flash animate__infinite animate__slow'>Loading</span>
            <img src={LoadingRing} alt='loading-ring' className='ring animate__animated animate__zoomIn ' />
        </div>
    )
}
