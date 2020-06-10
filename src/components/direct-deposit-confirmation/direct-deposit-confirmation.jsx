import React from 'react';
import CustomButton from '../custom-button/custom-button';

import './direct-deposit-confirmation.scss';

import firebase from '../../firebase/firebase.utils';

class DirectDepositConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directDeposit: {},
            key: '',
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('direct-deposit').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              directDeposit: doc.data(),
              key: doc.id,
              isLoading: false,
            });
          } else {
            console.log("No such document!");
          }
        });
    }

    onClick = () => {
        const element = document.querySelector('#container');
        let blob = new Blob([element], { type: "text/html"});
        let fileList = [];
        fileList.push(blob);
        let formData = new FormData();
        formData.append('Subject', 'Patient Payment Authorization using Direct Deposit');
        formData.append('Content', 'Email containing new patient reports from https://www.nahaw.com/payment-information');
        for(let x = 0; x < fileList.length; x++) {
            formData.append('direct-deposit', fileList[0], 'direct-deposit.html');
        }
        let request = new XMLHttpRequest();
        request.open("POST", "https://usebasin.com/f/a332bf5eec53");
        request.send(formData);
    }

    render() {
        return (
            <div id="container">
                <h1>New Age Health And Wellness</h1>
                <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                <h2>866-921-8779</h2>
                <h1>Recurring Payment Authorization Form</h1>
                <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                <h3>Here’s How Recurring Payments Work:</h3>
                <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an “ACH Debit.” You agree that no prior-notification will be provided unless the date or amount changes.</p>
                <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                <p>
                    I <strong>{this.state.directDeposit.name}</strong> authorize New Age Health And Wellness to charge my checking/savings account indicated below 
                    for <strong>${this.state.directDeposit.amount}</strong> on the <strong>{this.state.directDeposit.day}</strong> of each <strong>{this.state.directDeposit.month}</strong> for (day or date)
                    payment of my <strong>{this.state.directDeposit.therapy}</strong>.
                </p>
                <h3>Account Type: </h3><p>{this.state.directDeposit.accountType}</p>
                <h3>Name on Account: </h3><p>{this.state.directDeposit.nameOnAccount}</p>
                <h3>Account Number: </h3><p>{this.state.directDeposit.accountNumber}</p>
                <h3>Bank Routing: </h3><p>{this.state.directDeposit.bankRouting}</p>
                <h3>Bank Name: </h3><p>{this.state.directDeposit.bankName}</p>
                <h3>Bank City / State: </h3><p>{this.state.directDeposit.bankCityState}</p>
                <h3>Signature: </h3><p>{this.state.directDeposit.signature}</p>
                <h3>Date: </h3><p>{this.state.directDeposit.date}</p>
                <div className='input-wrapper-100'>
                    <CustomButton onClick={this.onClick}>Confirm</CustomButton>
                </div>
            </div>
        )
    }
}

export default DirectDepositConfirmation;