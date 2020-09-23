import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

function App() {
  const classes = useStyles();
  const [person, setPerson] = useState({name: 'Aida', lastName:'Valuenzuela'}); 
  const [errors, setErrors] = useState({});

  const getPersonFormErrors = (p) => {
    const updatedErrors = {};
    Object.keys(p).forEach(key=> {
      console.log(p[key]);
      if(p[key].trim() === '')
        updatedErrors[key] = 'Required';
    });

    return updatedErrors;
  };


  const validate = useCallback(debounce((p) => setErrors(getPersonFormErrors(p)),250), [],);

  const handleChange = ({target}) => {
    setPerson((prev)=> ({...prev, [target.name]: target.value}));
  }

  useEffect(()=>{
    validate(person);
    return () => {
      validate.cancel();
    }
  },[person])

  console.log(errors);
  

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={!!errors['name']}
          id="standard-error"
          name="name"
          label="Name"
          value={person.name}
          onChange={handleChange}
        />
        <TextField
          error={!!errors['lastName']}
          id="standard-error-helper-text"
          name="lastName"
          label="Last Name"
          defaultValue={person.lastName}
          helperText={errors['lastName']}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default App;
