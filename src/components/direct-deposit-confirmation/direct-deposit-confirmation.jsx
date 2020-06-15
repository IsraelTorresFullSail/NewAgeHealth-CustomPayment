import React from 'react';
import CustomButton from '../custom-button/custom-button';
import { Redirect } from 'react-router-dom';

import { RiCheckboxLine, RiCheckboxBlankLine } from 'react-icons/ri'

import './direct-deposit-confirmation.scss';

import firebase from '../../firebase/firebase.utils';

class DirectDepositConfirmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directDeposit: {},
            key: '',
            message: false,
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
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://usebasin.com/f/a332bf5eec53";

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
        request.open("POST", proxyUrl + url);
        request.send(formData);
        this.setState({ message: true });
    }

    render() {
        const { message } = this.state;
        if (message === true) return <Redirect to="/thank-you" />;

        let termsConditionsSignature = '';
        if(this.state.directDeposit.termsConditionsSignature === true) {
            termsConditionsSignature = <RiCheckboxLine />;
        }
        else {
            termsConditionsSignature = <RiCheckboxBlankLine />
        }
        let termsConditionsAgreement = '';
        if(this.state.directDeposit.termsConditionsAgreement === true) {
            termsConditionsAgreement = <RiCheckboxLine />;
        }
        else {
            termsConditionsSignature = <RiCheckboxBlankLine />
        }

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
                    <div className="text-wrapper">
                        <p><span>{termsConditionsSignature}</span> I understand that checking this box constitutes a legal signature confirming that I acknowledge and agree to the above Terms of Acceptance.</p>
                    </div>
                    <div className="text-wrapper">
                        <p><span>{termsConditionsAgreement}</span> I understand that this authorization will remain in effect until I cancel it in writing, and I agree to notify New Age Health And Wellness in writing of any changes in my account information or termination of this authorization at least 60 days prior to the next billing date. If the above noted payment dates fall on a weekend or holiday, I understand that because these are electronic transactions, these funds may be withdrawn from my account as soon as the above noted periodic transaction dates. In the case of an ACH Transaction being rejected for Non Sufficient Funds (NSF) I understand that New Age Health And Wellness may at its discretion attempt to process the charge again in 3 business days, and agree to an additional 50.00 charge for each attempt returned NSF. I acknowledge that the origination of ACH transactions to my account must comply with the provisions of U.S. law. I certify that I am an authorized user of this bank account and will not dispute these scheduled transactions with my bank; so long as the transactions correspond to the terms indicated in this authorization form.</p>
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