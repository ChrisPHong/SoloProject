import React, { useState, useEffect } from 'react';
import './ReviewsPage.css';
import { useSelector, useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import { deleteReview, loadReviews, oneReview } from '../../store/review';
import { Link } from 'react-router-dom'
import { useParams, useHistory} from 'react-router-dom'
import { getOneBusiness } from '../../store/business'


function ReviewsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const businessId = Number(useParams()?.businessId);
    const reviews = useSelector((state) => Object.values(state.review.entries));
    const user = useSelector((state) => Object.values(state.session.user));
    const userName = user[1]

    const userId = user[0]
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadReviews(businessId))
    }, [dispatch])

    return (
        <div>
            <h1>Reviews</h1>
            <div className='ReviewDiv'>
                {reviews.length > 0 ? reviews.map(review => {
                    console.log(review, "this is one review of the reviews")
                    return (
                        <div
                        className='reviewForm'
                        key={`outerDiv${review.id}`}>
                            <div key={`rating${review.id}`}>Rating: {review.rating}</div>
                            <div key={`answer${review.id}`}>"{review.answer}"</div>
                            <img className='review-picture' src={review.image} />


                            <div className='editDiv'>
                                {(review.userId === userId) ?
                                        <button 
                                        className='editReviewButton'
                                        onClick={async()=>{
                                            await dispatch(oneReview(review.id))
                                            await history.push(`/reviews/${review.id}`)
                                        }}

                                        >Edit</button>
                                
                                    : null}
                            </div>

                            <div className='deleteDiv'>
                                {(review.userId === userId) ?
                                    <button className='deleteReviewButton'
                                        onClick={() => {
                                            dispatch(deleteReview(businessId, review.id))
                                        }}
                                    >Delete</button>
                                    : null}
                            </div>
                        </div>
                    )
                }) : <div className='no-review-div'>
                    <p>This Business Has No Reviews</p>
                    <p>Be the First to Review!</p>
                </div>}

            </div>
        </div>
    )
}


export default ReviewsPage;
