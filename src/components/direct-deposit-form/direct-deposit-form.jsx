import React from 'react';
import Select from 'react-dropdown-select';

import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';

import { FaUser, FaDollarSign, FaMapSigns } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';
import { TiLocation } from 'react-icons/ti';
import { MdEmail, MdLocalPhone } from 'react-icons/md';

import './direct-deposit-form.scss';

import firebase from '../../firebase/firebase.utils';

const optionsDay = [
    { label: "1st", value: "1st" },
    { label: "2nd", value: "2nd" },
    { label: "3th", value: "3th" },
];
const optionsMonth = [
    { label: "January", value: "January" }, { label: "February", value: "February" }, { label: "March", value: "March" }, { label: "April", value: "April" },
    { label: "May", value: "May" }, { label: "June", value: "June" }, { label: "July", value: "July" }, { label: "August", value: "August" },
    { label: "September", value: "September" }, { label: "October", value: "October" }, { label: "November", value: "November" }, { label: "December", value: "December" },
];
const optionsTherapy = [
    { label: "Hormone Replacement", value: "Hormone Replacement" }, { label: "Peptide Therapy", value: "Peptide Therapy" }, { label: "Vitamins", value: "Vitamins" },
    { label: "Cannabidiol Therapy", value: "Cannabidiol Therapy" }, { label: "Erectile Dysfunction", value: "Erectile Dysfunction" }, { label: "IV Therapy", value: "IV Therapy" },
    { label: "Testosterone Therapy", value: "Testosterone Therapy" },
];

class DirectDepositForm extends React.Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('direct-deposit');
        this.state = {
            name: '',
            amount: '',
            day: '',
            month: '',
            therapy: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            email: '',
            phone: '',
        };
    }


    handleChangeDay = (selectedDay) => {
        const day = '';
        this.setState({ [day]: selectedDay.value });
    }

    handleChangeMonth = (selectedMonth) => {
        const month = '';
        this.setState({ [month]: selectedMonth });
    }

    handleChangeTherapy = (selectedTherapy) => {
        const therapy = '';
        this.setState({ [therapy]: selectedTherapy });
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { name, amount, day, month, therapy, address, city, state, zip, email, phone } = this.state;

        this.ref.add({
            name, amount, day, month, therapy, address, city, state, zip, email, phone
          }).then((docRef) => {
            this.setState({
                name: '',
                amount: '',
                day: null,
                month: null,
                therapy: null,
                address: '',
                city: '',
                state: '',
                zip: '',
                email: '',
                phone: '',
            });
            this.props.history.push("/")
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { name, amount, day, month, therapy, address, city, state, zip, email, phone } = this.state;

        return(
            <>
                <h1>New Age Health And Wellness</h1>
                <h2>12785 West Forest Hill Blvd, Wellington, Florida 33414</h2>
                <h2>866-921-8779</h2>
                <h1>Recurring Payment Authorization Form</h1>
                <p>Schedule your payment to be automatically deducted from your bank account. Just complete and sign this form to get started!</p>
                <h3>Here’s How Recurring Payments Work:</h3>
                <p>You authorize regularly scheduled charges to your checking/savings account. You will be charged the amount indicated below each billing period. The charge will appear on your bank statement as an “ACH Debit.” You agree that no prior-notification will be provided unless the date or amount changes.</p>
                <h3 className='red'>Address changes must be reported right away, if not and shipment goes out the patient is responsible for all loss of medications and shipping expenses.</h3>
                <form method="POST" className='form' onSubmit={this.handleSubmit}>
                    <div className='input-wrapper-65'>
                        <FormInput 
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.handleChange}
                            label="Full Name *"
                            required
                            icon={<FaUser className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <FormInput 
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                            label="Amount *"
                            required
                            icon={<FaDollarSign className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="day"
                            options={optionsDay}
                            onChange={this.handleChangeDay}
                            value={day}
                            className='select'
                            placeholder='Day *'
                            required
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="month"
                            options={optionsMonth}
                            onChange={this.handleChangeMonth}
                            value={month}
                            className='select'
                            placeholder='Month *'
                            required
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <Select 
                            name="therapy"
                            options={optionsTherapy}
                            onChange={this.handleChangeTherapy}
                            value={therapy}
                            className='select'
                            placeholder='Select service... *'
                            required
                        />
                    </div>
                    <div className='input-wrapper-100'>
                        <FormInput 
                            type="text"
                            name="address"
                            value={address}
                            onChange={this.handleChange}
                            label="Street Address *"
                            required
                            icon={<FaMapSigns className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <FormInput 
                            type="text"
                            name="city"
                            value={city}
                            onChange={this.handleChange}
                            label="City *"
                            required
                            icon={<TiLocation className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <FormInput 
                            type="text"
                            name="state"
                            value={state}
                            onChange={this.handleChange}
                            label="State *"
                            required
                            icon={<TiLocation className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-30'>
                        <FormInput 
                            type="number"
                            name="zip"
                            value={zip}
                            onChange={this.handleChange}
                            label="Postal / Zip Code *"
                            required
                            icon={<GiEarthAmerica className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            label="Email *"
                            required
                            icon={<MdEmail className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-48'>
                        <FormInput 
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={this.handleChange}
                            label="Phone *"
                            required
                            icon={<MdLocalPhone className='icon' />}
                        />
                    </div>
                    <div className='input-wrapper-100'>
                        <CustomButton type="submit">Save</CustomButton>
                    </div>
                </form>
            </>
        )
    }
}

export default DirectDepositForm;