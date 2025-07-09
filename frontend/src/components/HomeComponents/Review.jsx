import './Review.css'

const Review = () => {
    return (
        <div className='review m-lg-0 m-md-0 mt-2'>
            <header> Monthly Review </header>
            <div className='container d-flex m-0'>
                <div className='col-6 d-flex flex-column justify-content-center align-items-center m-0'>
                    <div className='box-eventsDone'>
                        <p className='review-number'> 22 </p>
                        <p className='review-description'> Events Done </p>
                    </div>
                    <div className='box-eventsToDo'>
                        <p className='review-number'> 17 </p>
                        <p className='review-description'> Events to do </p>
                    </div>
                </div>
                <div className='col-6 flex-column d-flex justify-content-center align-items-center m-0'>
                    <div className='box-activityInProgress'>
                        <p className='review-number'> 2 </p>
                        <p className='review-description'>Ac. in progress </p>
                    </div>
                    <div className='box-activityScheduled'>
                        <p className='review-number'> 1 </p>
                        <p className='review-description'> Ac.inProgram </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Review;