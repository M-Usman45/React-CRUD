import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import '../../assets/css/calculator.css'
class Calculator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			buttons: [ '1', '2', '3', '*', '4', '5', '6', '+', '7', '8', '9', '-', '0', '.', '=', '/' ],
			output: '',
			result: ''
		}
	}
	handleChange = (value) => {
		const { output } = this.state
		switch (value) {
			case '=': {
				try {
					const result = eval(output)
					this.setState({ output: result })
				} catch (e) {
					toast.error('Invalid Input')
				}
				break
			}
			default: {
				const calculatedValue = output + value
				console.log(value, output, calculatedValue)
				this.setState({ output: calculatedValue })
			}
		}
	}
	render() {
		const { buttons, output } = this.state
		return (
			<React.Fragment>
				<ToastContainer
					position="top-right"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					pauseOnFocusLoss
					pauseOnHover
				/>
				<div className="custom-container">
					<div className="inner-box">
						<h2> Calculator </h2>
						<div className="calculator-container">
							<input className="calculator-display" onChange={this.onChnage} value={output} />
							<div className="button-container">
								{buttons.map((val) => {
									return (
										<button
											key={Math.random()}
											className=" btn btn-secondary btn-lg"
											onClick={() => this.handleChange(val)}
										>
											{val}
										</button>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}
}

export default Calculator
