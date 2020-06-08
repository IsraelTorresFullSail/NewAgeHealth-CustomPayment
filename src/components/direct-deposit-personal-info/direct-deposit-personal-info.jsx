import React from 'react';

import './direct-deposit-personal-info.scss';

import firebase from '../../firebase/firebase.utils';

class DirectDepositPersonalInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            directDeposit: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('direct-deposit').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              directDeposit: doc.data(),
              key: doc.id,
              isLoading: false
            });
          } else {
            console.log("No such document!");
          }
        });
    }

    render() {
        Object.values(this.state.directDeposit).forEach(function (key, index) {
            console.log(key, index);
        });
        //console.log(Object.keys(this.state.directDeposit))
        //console.log(this.state.directDeposit.day)
        return (
            <>
                <h1>New Age Health And Wellness</h1>
                <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                <h2>866-921-8779</h2>
                <h1>Recurring Payment Authorization Form</h1>
                <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                <h3>Here’s How Recurring Payments Work:</h3>
                <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an “ACH Debit.” You agree that no prior-notification will be provided unless the date or amount changes.</p>
                <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                <p>
                    I {this.state.directDeposit.name} authorize New Age Health And Wellness to charge my checking/savings account indicated below for
                    {this.state.directDeposit.amount} on the {this.state.directDeposit.day} of each {this.state.directDeposit.month} for (day or date)
                    payment of my {this.state.directDeposit.therapy}.
                </p>
            </>
        )
    }
}

export default DirectDepositPersonalInfo;