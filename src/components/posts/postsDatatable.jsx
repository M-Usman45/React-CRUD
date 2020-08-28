import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import moment from 'moment'
import jwtDecode from 'jwt-decode'
import * as postService from '../../services/postService'
import * as authService from '../../services/authService'
import { toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import '../../assets/css/viewPosts.css'

class PostsDatatable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			posts: []
		}
	}
	componentDidMount() {
		this.getPosts()
	}
	componentDidUpdate() {
		this.DOMevents()
	}
	DOMevents = () => {
		const rows = document.getElementsByClassName('doBktq')
		document.addEventListener('dragover', (e) => e.preventDefault())
		for (let row of rows) {
			row.draggable = true
			row.addEventListener('dragstart', (event) => {
				event.dataTransfer.setData('text/plain', `${event.clientY},${event.target.id}`)
				event.target.parentNode.id = 'parent'
			})
		}
		document.addEventListener('drop', (event) => {
			const [ Sourceposition, sourceId ] = event.dataTransfer.getData('text/plain').split(',')
			const target = event.target.parentNode
			const source = document.getElementById(sourceId)
			if (!(target || source)) return
			const parent = target.parentNode
			if (!parent || parent.id !== 'parent') return
			if (event.clientY > +Sourceposition) parent.insertBefore(source, target.nextSibling)
			else parent.insertBefore(source, target)
		})
	}
	getPosts = () => {
		postService
			.getAllPosts()
			.then((res) => {
				this.setState({ posts: res.data })
				this.paginate(res.data)
			})
			.catch((error) => toast.error(error))
	}
	jwt = jwtDecode(authService.getjwt())
	columns = [
		{
			name: 'Post ID',
			selector: '_id',
			sottable: true,
			cell: (row) => this.getPostDetails(row)
		},
		{
			name: 'Post Text',
			selector: 'text',
			sottable: true
		},
		{
			name: 'User ID',
			selector: 'user',
			sottable: true
		},
		{
			name: 'Date',
			selector: 'date',
			sottable: true,
			cell: (row) => moment(row.date).format('MM-DD-YYYY')
		},
		{
			name: 'Actions',
			cell: (row) => (
				<div>
					<button
						className="btn btn-danger"
						data-toggle="modal"
						data-target="#myModal"
						disabled={row.user !== this.jwt.id}
					>
						Delete
					</button>
					{this.getDeleteModel(row._id)}
				</div>
			)
		}
	]
	handleDelete = (id) => {
		const orignalPosts = this.state.posts
		const filteredPosts = this.state.posts.filter((val) => val._id !== id)
		postService
			.deletePost(id)
			.then((result) => {
				toast.success('Post deleted Successfully! ')
				this.setState({ posts: filteredPosts })
			})
			.catch((err) => {
				this.setState({ posts: orignalPosts })
				toast.error(err.message)
			})
	}
	getDeleteModel = (id) => {
		return (
			<div id="myModal" className="modal fade " role="dialog">
				<div className="modal-dialog modal-dialog-centered	">
					<div className="modal-content p-4">
						<div className="modal-body">
							<h5>Are you sure?</h5>
						</div>
						<div className="custom-btn-container">
							<button type="button" className="btn btn-primary col-2 custom-btn" data-dismiss="modal">
								No
							</button>
							<button
								type="button"
								className="btn btn-danger col-2"
								data-dismiss="modal"
								onClick={() => this.handleDelete(id)}
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
	getPostDetails = (data) => {
		return (
			<div>
				<Link to={{ pathname: '/viewPostDetails', state: { id: data._id } }}>
					<p> {data._id} </p>
				</Link>
			</div>
		)
	}
	render() {
		const { posts } = this.state
		if (posts.length === 0)
			return (
				<div className="spinner-container">
					<div className="spinner-border text-dark my-custom-spinner" role="status">
						{' '}
					</div>
				</div>
			)
		return (
			<React.Fragment>
				<div className="post-container">
					<div className="post-inner-box ">
						<DataTable title="Posts Details" columns={this.columns} data={posts} pagination={true} />
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default PostsDatatable
