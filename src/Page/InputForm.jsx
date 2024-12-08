import React, { useState, useEffect } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  FormLabel,
  Typography,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';

const InputForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Fetch countries on component mount
  useEffect(() => {
    axios
      .get('https://form-task-be.onrender.com/api/countries')
      .then((res) => setCountries(res.data))
      .catch((err) => console.error('Error fetching countries:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'country') {
      setStates([]);
      setCities([]);
      axios
        .get(`https://form-task-be.onrender.com/api/states/${value}`)
        .then((res) => setStates(res.data))
        .catch((err) => console.error('Error fetching states:', err));
    } else if (name === 'state') {
      setCities([]);
      axios
        .get(`https://form-task-be.onrender.com/api/cities/${value}`)
        .then((res) => setCities(res.data))
        .catch((err) => console.error('Error fetching cities:', err));
    }
  };

  const validate = () => {
    let valid = true;
    const errors = {};

    // Validation logic
    if (!formData.firstName.match(/^[A-Za-z]+$/)) {
      errors.firstName = 'First Name must contain only alphabets';
      valid = false;
    }
    if (!formData.lastName.match(/^[A-Za-z]+$/)) {
      errors.lastName = 'Last Name must contain only alphabets';
      valid = false;
    }
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
      errors.email = 'Enter a valid email';
      valid = false;
    }
    if (!formData.gender) {
      errors.gender = 'Gender is required';
      valid = false;
    }
    if (!formData.country) {
      errors.country = 'Country is required';
      valid = false;
    }
    if (!formData.state) {
      errors.state = 'State is required';
      valid = false;
    }
    if (!formData.city) {
      errors.city = 'City is required';
      valid = false;
    }
    if (!formData.dob || calculateAge(formData.dob) < 14 || calculateAge(formData.dob) > 99) {
      errors.dob = 'Age must be between 14 and 99 years';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const calculateAge = (dob) => {
    const diff = new Date() - new Date(dob);
    return Math.floor(diff / 31557600000); // Years in milliseconds
  };

  const handleSubmit = () => {
    if (validate()) {
      // Simulate API submission
      axios
        .post('https://form-task-be.onrender.com/api/submit', formData)
        .then((res) => {
          console.log('Form submitted successfully:', res.data);
          alert('Form submitted successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            country: '',
            state: '',
            city: '',
            gender: '',
            dob: '',
          });
          setErrors({});
        })
        .catch((err) => console.error('Error submitting form:', err));
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "5%",
        boxShadow: "2px 4px 10px #3F51B5",
        width: "90%",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Input Form</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
            fullWidth
            displayEmpty
            error={!!errors.country}
          >
            <MenuItem value="" disabled>Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.country}>
            {errors.country || 'Please select your country'}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            fullWidth
            displayEmpty
            error={!!errors.state}
          >
            <MenuItem value="" disabled>Select State</MenuItem>
            {states.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.state}>
            {errors.state || 'Please select your state'}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            displayEmpty
            error={!!errors.city}
          >
            <MenuItem value="" disabled>Select City</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.city}>
            {errors.city || 'Please select your city'}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <FormLabel component="legend" style={{ fontWeight: 'bold', color: '#333' }}>
            Gender
          </FormLabel>
          <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
          </RadioGroup>
          <FormHelperText error>{errors.gender}</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            error={!!errors.dob}
            fullWidth
          />
          <FormHelperText error={!!errors.dob}>
            {errors.dob || 'Age must be between 14 and 99 years'}
          </FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSubmit} fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default InputForm;
