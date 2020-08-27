import React, { Component } from 'react'
import moment from 'moment'
import * as postsService from '../../services/postService'

class ViewSinglePost extends Component {
	constructor(props) {
		super(props)
		this.state = { post: '' }
	}
	componentDidMount() {
		this.getPost()
	}
	getPost = () => {
		postsService.getSinglePost(this.props.location.state.id).then((res) => {
			this.setState({ post: res.data })
		})
  }
  spinner = <div className="spinner-border text-dark my-custom-spinner" role="status" />
	render() {
		const { post } = this.state
		return (
			<React.Fragment>
				<div className="custom-container">
					<div className="inner-box">
						<h2> Post Details </h2>
							<div className="info-container">
                {!post && this.spinner}
						{post && <>
								<div>
									<h5> Text </h5>
									<p>{post.text}</p>
								</div>
								<div>
									<h5> User </h5>
									<p>{post.user}</p>
								</div>
								<div>
									<h5> Date </h5>
									<p>{moment(post.date).format('DD-MM-YYYY')}</p>
								</div>
								<button
									className="btn btn-secondary custom-btn"
									onClick={() => (window.location = '/viewPosts')}
								>
									{' '}
									Back{' '}
								</button>
                </> }
							</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default ViewSinglePost
