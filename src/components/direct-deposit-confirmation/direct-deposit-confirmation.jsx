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
        const element = document.querySelector('#container').innerHTML;
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
            <>
                <div id="container" style={{
                    width: '210mm',
                    minHeight: '297mm',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    border: '2px solid #ccc',
                    padding: '0 10px',
                    overflow: 'hidden' 
                }}>
                    <img src="https://uploads-ssl.webflow.com/5e6fbba78a57c2521e3e7157/5e7513a1c335eb13f6e08052_newAge-logo.png" alt="Company Logo" style={{
                        width: '100%',
                        maxWidth: '150px',
                        margin: '-10px auto -20px auto'
                    }} /> 
                    <h1>New Age Health And Wellness</h1>
                    <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                    <h2>866-921-8779</h2>
                    <h1>Recurring Payment Authorization Form</h1>
                    <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                    <h3>Here is How Recurring Payments Work:</h3>
                    <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an ACH Debit. You agree that no prior-notification will be provided unless the date or amount changes.</p>
                    <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                    <p>
                        I <strong>{this.state.directDeposit.name}</strong> authorize New Age Health And Wellness to charge my checking/savings account indicated below 
                        for <strong>${this.state.directDeposit.amount}</strong> on the <strong>{this.state.directDeposit.day}</strong> of each <strong>{this.state.directDeposit.month}</strong> for (day or date)
                        payment of my <strong>{this.state.directDeposit.therapy}</strong>.
                    </p>
                    <div className='text-wrapper'>
                        <h3 className='space'>Account Type: <span className='span'>{this.state.directDeposit.accountType}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Name on Account: <span className='span'>{this.state.directDeposit.nameOnAccount}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Account Number: <span className='span'>{this.state.directDeposit.accountNumber}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Bank Routing: <span className='span'>{this.state.directDeposit.bankRouting}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Bank Name: <span className='span'>{this.state.directDeposit.bankName}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Bank City / State: <span className='span'>{this.state.directDeposit.bankCityState}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Signature: <span className='span'>{this.state.directDeposit.signature}</span></h3>
                    </div>
                    <div className='text-wrapper'>
                        <h3 className='space'>Date: <span className='span'>{this.state.directDeposit.date}</span></h3>
                    </div>
                    
                </div>
                <div className='input-wrapper-100'>
                    <CustomButton onClick={this.onClick}>Confirm</CustomButton>
                </div>
            </>
        )
    }
}

export default DirectDepositConfirmation;