import { Component } from 'react';
import getBalance from './resources/getBalance';
import getTransactions from './resources/getTransactions';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            balance: '',
            txCount: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const addr = data.get("address");
        this.setState({
            address: addr,
            balance: await getBalance(addr),
            txCount: await getTransactions(addr)
        })
        console.log("Address: ", this.state.address);
        console.log("Balance: ", this.state.balance);
        console.log("Tx Count: ", this.state.txCount);
    }
    
    render() {        
        return (
            <div>
                <div className='ethers-input'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="address" placeholder="ETH Address" />
                        <button type="submit">
                            Submit
                        </button>
                    </form>
                </div>
                <div className='ethers-result'>
                    <h3>Address Details:</h3>
                    <div>
                        <p>Address: {this.state.address}</p>
                        <p>Balance: {this.state.balance} ETH</p>
                        <p>Transaction Count: {this.state.txCount}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Balance;